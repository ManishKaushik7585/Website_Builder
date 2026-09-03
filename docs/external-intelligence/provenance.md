# Phase 10 Documentation: provenance

This document formally specifies the behavioral and architectural constraints of the provenance mechanism in Phase 10 External Intelligence.

## Rule 1: No Direct Mutation
External intelligence is an evidence provider, not a mutating agent.

## Rule 2: Validation
All external inputs must be validated via `external-intelligence-validator`.

## Rule 3: Memory & Budget
Operations must respect the `ResearchBudget` and store evidence in `ResearchMemory`.
