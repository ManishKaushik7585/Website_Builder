import { MCPCapability } from '../../config/external-intelligence';

export class MCPCapabilityIndex {
  private capabilities: Map<string, MCPCapability> = new Map();

  addCapability(capability: MCPCapability) {
    // Discovery != Installation. Default state is DISCOVERED unless explicitly overridden.
    if (!this.capabilities.has(capability.server)) {
      this.capabilities.set(capability.server, { ...capability, state: capability.state || 'DISCOVERED' });
    }
  }

  getCapabilities(): MCPCapability[] {
    return Array.from(this.capabilities.values());
  }

  findBestMCP(purpose: string): MCPCapability | null {
    const list = this.getCapabilities();
    let bestMatch: MCPCapability | null = null;
    
    for (const cap of list) {
      // Very basic keyword matching for semantic lookup
      if (cap.purpose.toLowerCase().includes(purpose.toLowerCase()) || 
          cap.capability.toLowerCase().includes(purpose.toLowerCase())) {
        if (!bestMatch || cap.trustLevel === 'high' && bestMatch.trustLevel !== 'high') {
          bestMatch = cap;
        }
      }
    }
    return bestMatch;
  }
}
