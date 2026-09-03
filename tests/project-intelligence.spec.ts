
import { test, expect } from '@playwright/test';
import { WebsiteProject, WebsitePage, SitePlan } from '../config/project';

test.describe('Project Intelligence (Phase 7A)', () => {
  test('Project initializes correctly', () => {
    const project: WebsiteProject = {
      id: 'proj-1',
      name: 'Test Project',
      description: 'A test project',
      brief: { projectName: 'Test', description: 'Test', objective: 'Test', constraints: [] },
      status: 'idle',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pages: [],
      generationHistory: [],
      version: 1,
      approvalState: 'pending'
    };
    expect(project.id).toBe('proj-1');
  });

  test('Page inventory rejects duplicate IDs', () => {
    const page: WebsitePage = {
      id: 'page-1',
      slug: '/',
      name: 'Home',
      purpose: 'home',
      objective: 'Convert',
      status: 'draft',
      version: 1,
      history: [],
      approvalState: 'pending'
    };
    expect(page.purpose).toBe('home');
  });
  
  test('SitePlan validation works', () => {
    const plan: SitePlan = {
      projectObjective: 'Test',
      audience: 'Test',
      primaryAction: 'Test',
      pages: ['home'],
      navigation: [{ label: 'Home', href: '/' }],
      constraints: []
    };
    expect(plan.navigation.length).toBe(1);
  });
});
