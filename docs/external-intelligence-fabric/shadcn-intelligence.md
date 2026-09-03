# Phase 11 Documentation: shadcn-intelligence

This document formally specifies the behavioral and architectural constraints of the shadcn-intelligence mechanism in Phase 11 External Intelligence Fabric.

## Rule 1: No Direct Mutation
External intelligence is an evidence provider, not a mutating agent.

## Rule 2: Free-First Policy
The system must default to free and public APIs. Optional keys like TAVILY_API_KEY may enhance, but never gate functionality.

## Rule 3: Memory & Budget
Operations must respect the `ResearchBudget` and store abstract patterns in `DesignPatternMemory`.
