# 30 SELF CRITIQUE

This document specifies the requirements and logic for 30-self-critique in the Phase 8 Release Intelligence layer.

## Overview
Release Intelligence must act as the final deployment readiness authority. It evaluates the project against rigorous criteria to ensure production safety and structural completeness.

## Implementation Details
No arbitrary execution of shell, CLI, or DOM mutations is permitted. All intelligence is read-only and explicitly deterministic. Missing evidence resolves strictly to `unverified`.

## Factory Hydration
The Factory UI must hydrate this state purely from the `releaseReadiness` API contract without exposing secrets.
