import { ExternalIntelligenceValidator } from '../../../registry/external-intelligence-validator';
import { ResearchEvidence, LicenseStatus } from '../../../config/external-intelligence';
import { ProviderRegistry } from './ProviderRegistry';

export class GitHubProvider {
  private static extractRepoParts(url: string): { owner: string; repo: string } | null {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? { owner: match[1], repo: match[2].replace(/\.git$/, '') } : null;
  }

  static async inspectRepository(url: string): Promise<ResearchEvidence[]> {
    const provider = ProviderRegistry.getProvider('github');
    if (!provider || provider.status === 'UNAVAILABLE') return [];

    const repoParts = this.extractRepoParts(url);
    if (!repoParts) {
      return []; // Return empty gracefully for invalid URLs
    }

    const { owner, repo } = repoParts;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Website-Engine-Phase11'
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    try {
      // 1. Repo Metadata
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
      if (!repoRes.ok) throw new Error('Repository fetch failed');
      const repoData = await repoRes.json();

      // Determine License
      let licenseStatus: LicenseStatus = 'UNKNOWN';
      if (repoData.license) {
        const l = repoData.license.key.toLowerCase();
        if (['mit', 'apache-2.0', 'bsd-2-clause', 'bsd-3-clause'].includes(l)) {
          licenseStatus = 'PERMISSIVE';
        } else if (['gpl', 'gpl-3.0', 'agpl'].includes(l)) {
          licenseStatus = 'COPYLEFT';
        } else {
          licenseStatus = 'RESTRICTIVE';
        }
      } else {
        licenseStatus = 'NO_LICENSE';
      }

      const evidences: ResearchEvidence[] = [];

      // 2. Add Meta Evidence
      evidences.push({
        id: `gh_meta_${Date.now()}`,
        type: 'observed',
        claim: ExternalIntelligenceValidator.sanitizeText(`Repository ${owner}/${repo} has description: ${repoData.description || 'none'}`),
        source: url,
        provenance: {
          sourceUrl: url,
          provider: 'github',
          timestamp: new Date().toISOString(),
          licenseStatus,
          reuseStatus: licenseStatus === 'PERMISSIVE' ? 'OPEN_SOURCE_REUSE' : 'INSPIRATION'
        },
        confidence: 'very_high',
        freshness: 'fresh',
        relevance: 0.9,
        observedAt: new Date().toISOString(),
        evidence: `Stars: ${repoData.stargazers_count}, License: ${repoData.license?.name || 'None'}`,
        tags: ['github', 'repository', 'metadata']
      });

      // 3. README Extraction (Simulated for zero-dependency speed / fallback)
      // In a real live provider we would fetch https://api.github.com/repos/${owner}/${repo}/readme
      // But we will just mock the fetching payload to keep tests blazing fast unless a full API test is triggered.
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers }).catch(() => null);
      if (readmeRes && readmeRes.ok) {
        const readmeData = await readmeRes.json();
        // Decode base64
        const content = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        const sanitizedContent = ExternalIntelligenceValidator.sanitizeText(content);
        
        evidences.push({
          id: `gh_readme_${Date.now()}`,
          type: 'observed',
          claim: 'Extracted README documentation',
          source: url + '/README.md',
          provenance: {
            sourceUrl: url + '/README.md',
            provider: 'github',
            timestamp: new Date().toISOString(),
            licenseStatus,
            reuseStatus: licenseStatus === 'PERMISSIVE' ? 'OPEN_SOURCE_REUSE' : 'INSPIRATION'
          },
          confidence: 'high',
          freshness: 'fresh',
          relevance: 0.8,
          observedAt: new Date().toISOString(),
          evidence: sanitizedContent.substring(0, 1000) + (sanitizedContent.length > 1000 ? '...' : ''), // Keep bounded
          tags: ['github', 'documentation', 'readme']
        });
      }

      return evidences;

    } catch (e: any) {
      console.warn('GitHub Inspection Error:', e.message);
      // Failsafe behavior: degraded but not fatal
      return [];
    }
  }
}
