# Runbook: RAG Service

> **Service**: Knowledge Retrieval Service  
> **Owner**: Platform Team  
> **Last Updated**: 2025-01-01

## Service Overview

| Property | Value |
|----------|-------|
| Criticality | High |
| SLA | 99.9% availability |
| On-call | PagerDuty: #platform-oncall |
| Dashboards | Grafana |

## Common Issues

### High Latency (P99 > 3s)

**Symptoms**: Slow responses, user complaints, alert firing

**Diagnosis**:
```bash
# Check pod resource usage
kubectl top pods -l app=rag-service

# Check database connections
curl localhost:9090/metrics | grep pool_connections
```

**Resolution**:
1. If CPU > 80%: Scale horizontally
2. If DB connections exhausted: Restart with increased pool size
3. If LLM latency high: Check provider status, consider failover

### Error Rate High (> 1%)

**Symptoms**: Increased 5xx responses, error logs

**Diagnosis**:
```bash
# Check recent error logs
kubectl logs -l app=rag-service --tail=100 | grep ERROR
```

**Resolution**:
1. If vector DB errors: Check index health
2. If LLM errors: Check API key, rate limits
3. If validation errors: Check input sanitization

## Procedures

### Scale Up

```bash
kubectl scale deployment rag-service --replicas=N
```

### Restart Service

```bash
kubectl rollout restart deployment/rag-service
```

### Check Health

```bash
curl -s http://localhost:8080/health | jq .
```
