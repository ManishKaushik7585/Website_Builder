# ERROR MODEL

This document establishes the error model rules for the Observability Intelligence layer (Phase 7F).

## Core Principles
1. Observability is a read-only boundary.
2. It must never expose secrets or raw provider API data.
3. Missing data must be represented honestly as 'unavailable' or 'stale'.
4. Factory UI consumes the hydrated observability state contract rather than interacting with internal intelligence systems.

## Application
These rules are enforced by `ObservabilityOrchestrator` and the `ObservabilityValidator`.
