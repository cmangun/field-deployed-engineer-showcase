# ADR-001: Vector Database Selection

## Status

Accepted

## Context

We need to select a vector database for semantic search in our RAG system. Requirements:
- Handle 10M+ vectors
- Sub-second query latency
- HIPAA-compliant hosting options
- Integration with existing Azure infrastructure

## Decision

We will use **Azure Cognitive Search** with vector search capabilities.

## Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| Pinecone | Fast, managed, purpose-built | No HIPAA BAA, vendor lock-in |
| Qdrant | Open-source, fast | Self-managed, operational overhead |
| Azure Cognitive Search | HIPAA compliant, Azure-native | Less specialized, higher latency |
| pgvector | Simple, PostgreSQL-native | Scale limitations |

## Consequences

### Positive
- Native Azure integration simplifies networking
- HIPAA compliance via existing BAA
- Hybrid search (vector + keyword) in one system

### Negative
- Higher latency than purpose-built solutions
- Less community tooling
- Pricing scales with storage + queries

### Mitigations
- Implement caching layer for common queries
- Monitor latency and plan migration path if needed
