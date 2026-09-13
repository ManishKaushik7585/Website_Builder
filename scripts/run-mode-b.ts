import { AgentRuntime } from '../components/agent/AgentRuntime';

const briefs = [
  { id: 'logistics', brief: "Create a premium global logistics company website. The company operates across air, sea and land and handles complex international movement. The experience should communicate scale, movement, infrastructure, precision, reliability and quiet confidence. It should feel operationally sophisticated rather than like a generic corporate logistics website." },
  { id: 'luxury', brief: "Create a contemporary luxury fashion house website. The brand should feel editorial, restrained, tactile, exclusive and culturally sophisticated. Typography and photography should establish authority without becoming ornamental or excessive." },
  { id: 'architecture', brief: "Create an experimental architecture studio website. The studio should feel spatial, precise, intellectually sophisticated and visually unconventional. The website should communicate architectural thinking rather than behaving like a conventional project portfolio." },
  { id: 'ai', brief: "Create a website for an advanced AI research laboratory. It should feel futuristic, intelligent, experimental and technically credible without relying on stereotypical neon AI aesthetics." },
  { id: 'editorial', brief: "Create a digital cultural publication covering art, architecture, technology and society. It should feel editorial, dynamic, information-rich and visually expressive while remaining highly readable." },
  { id: 'studio', brief: "Create a website for an internationally recognised creative studio working across branding, digital experiences, film and art direction. The site should feel highly authored, unconventional, memorable and visually sophisticated rather than like a standard agency website." }
];

async function run() {
  const runtime = new AgentRuntime();
  for (const item of briefs) {
    console.log(`\n--- RUNNING BRIEF: ${item.id} ---`);
    try {
      const result = await runtime.executeGenerationFlow(item.brief);
      console.log('Creative Direction:', JSON.stringify(result.creativeDirection, null, 2));
      console.log('Generated Sections:', JSON.stringify(result.convergence.generation?.sections, null, 2));
    } catch (err: any) {
      console.error(`Error for ${item.id}:`, err.message);
    }
  }
}

run();
