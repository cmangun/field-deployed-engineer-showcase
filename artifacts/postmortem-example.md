# Postmortem: Service Degradation Incident

> **Date**: 2024-XX-XX  
> **Duration**: 45 minutes  
> **Severity**: P2  
> **Author**: [Name]

## Summary

The RAG service experienced degraded performance due to a database connection pool exhaustion, affecting approximately 200 users during peak hours.

## Timeline (All times UTC)

| Time | Event |
|------|-------|
| 14:00 | Deploy new version with updated embedding model |
| 14:15 | First latency alerts fire |
| 14:20 | On-call engineer acknowledges |
| 14:25 | Root cause identified: connection pool exhaustion |
| 14:30 | Mitigation: increased pool size, rolling restart |
| 14:45 | Service recovered, alerts resolved |

## Root Cause

The new embedding model required more database connections per request (3 vs 1). The connection pool was sized for the previous model's behavior, causing exhaustion under load.

## Impact

- 200 users experienced 5-10s response times (vs normal 1-2s)
- No data loss
- No compliance implications

## What Went Well

- Alerts fired within 15 minutes of degradation
- On-call response was fast
- Rollback procedure was clear and tested

## What Went Wrong

- Load testing didn't cover the new embedding model's connection behavior
- Connection pool monitoring didn't have predictive alerting

## Action Items

| Action | Owner | Due Date |
|--------|-------|----------|
| Add connection pool exhaustion alert | Platform | Week 1 |
| Update load testing to cover new patterns | Platform | Week 2 |
| Document embedding model resource requirements | ML Team | Week 1 |

## Lessons Learned

1. Model changes can have infrastructure implications
2. Need better pre-deploy load testing
3. Connection pool sizing should be capacity-planned
