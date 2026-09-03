const { AgentRuntime } = require('./components/agent/AgentRuntime');

async function debug() {
  try {
    const runtime = new AgentRuntime();
    console.log('Executing flow...');
    const result = await runtime.executeGenerationFlow('Test brief');
    console.log('Success:', !!result.multiPageState);
  } catch (error) {
    console.error('Error in executeGenerationFlow:', error.message);
  }
}

debug();
