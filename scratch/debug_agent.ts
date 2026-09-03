import { AgentRuntime } from '../components/agent/AgentRuntime';

async function debug() {
  try {
    const runtime = new AgentRuntime();
    console.log('Executing flow...');
    const result = await runtime.executeGenerationFlow('A futuristic saas for space travel');
  
    console.log('\n==================================================');
    if ((result as any).siteAcceptance) {
    console.log('\n--- MULTI-PAGE SITE ACCEPTANCE ---');
    console.log(`Status: ${(result as any).siteAcceptance.status}`);
    console.log(`Project Score: ${(result as any).siteAcceptance.projectScore}/100`);
    console.log(`Accepted Pages: ${(result as any).siteAcceptance.acceptedPages} / ${(result as any).siteAcceptance.totalPages}`);
    if ((result as any).siteAcceptance.crossPageViolations.length > 0) {
      console.log('Cross-Page Violations:');
      (result as any).siteAcceptance.crossPageViolations.forEach((v: any) => {
        console.log(`  - [${v.severity}] ${v.message}`);
      });
    }
  }
    console.log('PHASE 8 & 7I MULTI-PAGE COMPLETION');
    console.log('Project Status: ', (result as any).siteAcceptance.status);
    console.log('Accepted Pages: ', (result as any).siteAcceptance.acceptedPages);
    console.log('Cross Page Violations: ', (result as any).siteAcceptance.crossPageViolations.length);
    console.log('Release Readiness: ', (result as any).releaseReadiness.status);
    console.log('Page Home Status:', (result as any).multiPageState.siteAcceptance.pageResults['home'].status);
    console.log('Page About Status:', (result as any).multiPageState.siteAcceptance.pageResults['about'].status);
  } catch (error: any) {
    console.error('Error in executeGenerationFlow:', error.message);
  }
}

debug();
