# 10 - Payments & Checkout Integration Guide

## Checkout Order Flow

```
[ Cart Drawer ] ---> [ Checkout Form ] ---> [ Payment Gateway Simulator ] ---> [ API POST /api/orders ] ---> [ Order Receipt ]
```

## Payment Gateways & PCI-DSS Compliance
1. **Credit / Debit Cards**:
   - Supports Visa, Mastercard, and American Express simulation.
   - PCI-DSS Compliance: Sensitive card numbers and CVCs are tokenized on the client side and never persisted to database disk (`db.json` stores payment method type and masked card digits e.g. `Visa ending 4242`).
2. **Apple Pay / Express Checkout**:
   - One-click express payment authorization simulator.

---
*Delivered for DormLights PRD Section 7.*
