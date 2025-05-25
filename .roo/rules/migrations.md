---
description: 
globs: 
alwaysApply: false
---
# Manual Project Rule: Migration & Refactor Guide

## Migration Checklist
- [ ] Validate that `.proto` schema changes are mirrored in `ts-proto` output
- [ ] Ensure client-side models match backend expectations
- [ ] Add test coverage when changing training plan logic
- [ ] Update all affected screens or handlers after structure changes

## Refactor Principles
- Flatten deeply nested conditionals using early returns
- Modularize service logic (split handlers if they exceed 100 lines)
- Avoid prop drilling: use context or RORO props
- Prefer `readonly` data structures where mutation is not needed