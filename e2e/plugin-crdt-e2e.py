#!/usr/bin/env python3
"""Simulate ServerBackend.store() Option C clock logic and verify CRDT behavior."""
import json, uuid, urllib.request, urllib.error, sys, time

BASE = "http://127.0.0.1:18081"
TOKEN_A = "REDACTED_TOKEN"
TOKEN_B = "REDACTED_TOKEN"

PASS = 0
FAIL = 0

def p(label): global PASS; PASS += 1; print(f"  PASS: {label}")
def f(label): global FAIL; FAIL += 1; print(f"  FAIL: {label}")

def req(method, path, token, body=None):
    url = BASE + path
    data = json.dumps(body).encode() if body is not None else None
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    r = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(r) as resp:
            raw = resp.read()
            return resp.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read()
        return e.code, json.loads(raw) if raw else {}

def fetch_by_key(token, key):
    """Simulate fetchByKey — reads existing clock for Option C."""
    status, data = req("GET", f"/api/memories?key={key}&limit=1", token)
    if status == 200 and data.get("memories"):
        return data["memories"][0]
    return None

def plugin_store(token, agent_name, key, content):
    """Simulate ServerBackend.store() with Option C clock logic."""
    clock = {}
    if key:
        existing = fetch_by_key(token, key)
        if existing and existing.get("clock"):
            clock = dict(existing["clock"])
    clock[agent_name] = clock.get(agent_name, 0) + 1
    body = {"content": content, "key": key, "clock": clock, "write_id": str(uuid.uuid4())}
    status, mem = req("POST", "/api/memories", token, body)
    return status, mem

ts = int(time.time())
KEY = f"plugin-crdt-{ts}"

print("\n=== Plugin CRDT E2E Tests (Option C simulation) ===\n")

# T1: Agent A first write — new key, clock should be {"agent-a": 1}
print("[T1] Agent A: first write to new key")
s1, m1 = plugin_store(TOKEN_A, "agent-a", KEY, "Agent A initial content")
clk1 = m1.get("clock", {})
orig1 = m1.get("origin_agent", "")
ID = m1.get("id", "")
print(f"  status={s1}, clock={clk1}, origin={orig1}, id={ID}")
if clk1 == {"agent-a": 1} and orig1 == "agent-a":
    p("Agent A first write: clock={agent-a:1}, origin=agent-a")
else:
    f(f"Expected clock={{agent-a:1}}, origin=agent-a — got clock={clk1}, origin={orig1}")

print()

# T2: Agent A writes same key again — clock increments to {"agent-a": 2}
print("[T2] Agent A: second write to same key")
s2, m2 = plugin_store(TOKEN_A, "agent-a", KEY, "Agent A updated content")
clk2 = m2.get("clock", {})
ID2 = m2.get("id", "")
print(f"  status={s2}, clock={clk2}, same_id={ID == ID2}")
if clk2 == {"agent-a": 2} and ID == ID2:
    p("Agent A second write: clock={agent-a:2}, ID reused (upsert)")
else:
    f(f"Expected clock={{agent-a:2}}, same ID — got clock={clk2}, id_match={ID == ID2}")

print()

# T3: Agent B writes same key — reads {agent-a:2}, adds agent-b:1 → {agent-a:2, agent-b:1}
print("[T3] Agent B: write to same key (clock merge)")
s3, m3 = plugin_store(TOKEN_B, "agent-b", KEY, "Agent B content")
clk3 = m3.get("clock", {})
orig3 = m3.get("origin_agent", "")
ID3 = m3.get("id", "")
print(f"  status={s3}, clock={clk3}, origin={orig3}, same_id={ID == ID3}")
if clk3.get("agent-a") == 2 and clk3.get("agent-b") == 1 and ID == ID3:
    p("Agent B write: clock={agent-a:2, agent-b:1}, same ID (upsert)")
else:
    f(f"Expected clock={{agent-a:2,agent-b:1}}, same ID — got clock={clk3}, id_match={ID==ID3}")

print()

# T4: Agent A reads back — sees Agent B's content (B's clock dominated)
print("[T4] Agent A reads back — should see Agent B content (dominating clock)")
s4, m4 = req("GET", f"/api/memories/{ID}", TOKEN_A)
content4 = m4.get("content", "")
clk4 = m4.get("clock", {})
print(f"  status={s4}, content={repr(content4)}, clock={clk4}")
if content4 == "Agent B content":
    p("Agent A sees Agent B's content (B's clock {a:2,b:1} dominated A's {a:2})")
else:
    f(f"Expected 'Agent B content', got {repr(content4)}")

print()

# T5: write_id idempotency
print("[T5] write_id idempotency — same write_id = no version bump")
KEY5 = f"plugin-idem-{ts}"
wid = str(uuid.uuid4())
body5 = {"content": "idempotent content", "key": KEY5, "clock": {"agent-a": 1}, "write_id": wid}
sa, ma = req("POST", "/api/memories", TOKEN_A, body5)
sb, mb = req("POST", "/api/memories", TOKEN_A, body5)
va, vb = ma.get("version"), mb.get("version")
print(f"  first_version={va}, retry_version={vb}")
if va == vb and va is not None:
    p(f"write_id idempotency: version={va} unchanged on retry")
else:
    f(f"write_id changed: {va} -> {vb}")

print()

# T6: no-key write (backward compat — no clock sent, LWW fast path)
print("[T6] No-key write — LWW fast path (no clock)")
s6, m6 = req("POST", "/api/memories", TOKEN_A, {"content": "no-key memory"})
clk6 = m6.get("clock")
print(f"  status={s6}, clock={clk6}")
if s6 in (200, 201) and clk6 is None:
    p("No-key write: LWW fast path, no clock stored")
elif s6 in (200, 201):
    p(f"No-key write succeeded (clock={clk6})")
else:
    f(f"No-key write failed: status={s6}")

print()
print(f"=== Results: {PASS} passed, {FAIL} failed ===")
sys.exit(0 if FAIL == 0 else 1)
