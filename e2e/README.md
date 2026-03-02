---
title: E2E Tests
---

End-to-end tests for the CRDT branch. All scripts run against a live mnemo-server
instance and require the `crdt_test_01` database with auto-embedding enabled.

## Prerequisites

- mnemo-server running on `127.0.0.1:18081` (see CLAUDE.md for startup)
- Space tokens for Agent A and Agent B in `crdt_test_01` (hardcoded in each script)
- Python 3.8+ or bash (no extra dependencies — stdlib only)

## Scripts

| Script | What it tests |
|--------|--------------|
| `crdt-e2e-tests.sh` | Core CRDT server behavior: LWW fast path, dominating/dominated writes, concurrent tie-break, tombstone, write_id idempotency, bootstrap endpoint (8 tests) |
| `plugin-crdt-e2e.py` | Plugin Option C clock strategy: simulates `ServerBackend.store()` read-increment-write flow, verifies clock propagation end-to-end (6 tests) |
| `crdt-server-merge-e2e.py` | Server-side section merge: two agents write disjoint sections concurrently, server merges atomically via `X-Mnemo-Merged`, both agents read identical final content (13 tests) |
| `concurrent-real-doc-test.py` | End-to-end on the real `claw-memory-v2-proposal` document (ID: `4a421c79-1559-44fd-b019-6f686107d8e4`): converts plain-text to section-doc format, then two agents concurrently edit disjoint sections, server merges atomically (13 tests) |

## Running

```bash
# From the EC2 instance (scripts use 127.0.0.1):
bash e2e/crdt-e2e-tests.sh
python3 e2e/plugin-crdt-e2e.py
python3 e2e/crdt-server-merge-e2e.py
python3 e2e/concurrent-real-doc-test.py
```

## Notes

- Tokens and base URL are hardcoded to the staging `crdt_test_01` space.
- Each run creates new keys with a timestamp suffix — safe to run multiple times.
- `crdt-server-merge-e2e.py` is the primary regression test for the section merge feature.
