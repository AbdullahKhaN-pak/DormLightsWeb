# 09 - Security Architecture Overview

## Security & OWASP Coverage

1. **Authentication & Access Control**:
   - Role-based authorization (`admin` vs `customer`).
   - Admin routes (`/admin/*`) are protected in React Router and require active admin context.
2. **API Input Sanitization**:
   - Express backend parses JSON safely and prevents script injection.
   - Price, quantity, and stock inputs are explicitly parsed as numeric types (`parseFloat`, `parseInt`) before storage.
3. **Database Security**:
   - File access is restricted to internal server routines (`readDB` and `writeDB`). No direct raw query exposure.
4. **Rate Limiting & CORS**:
   - Express CORS middleware configured to restrict unauthorized origin cross-site request forgery.

---
*Delivered for DormLights PRD Section 5.2.*
