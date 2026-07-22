# 06 - Database Schema & Relationships

## Entity-Relationship (ER) Schema

```
+-------------------+       1:N       +-------------------+
|     CUSTOMERS     | ---------------->|      ORDERS       |
+-------------------+                 +-------------------+
| id (PK)           |                 | id (PK)           |
| name              |                 | customerName      |
| email             |                 | customerEmail (FK)|
| ordersCount       |                 | items (JSON array)|
| totalSpent        |                 | total             |
| status            |                 | status            |
+-------------------+                 | shippingAddress   |
                                      +-------------------+

+-------------------+       1:N       +-------------------+
|    CATEGORIES     | ---------------->|     PRODUCTS      |
+-------------------+                 +-------------------+
| id (PK)           |                 | id (PK)           |
| name              |                 | name              |
| slug              |                 | category (FK)     |
| description       |                 | price             |
+-------------------+                 | stock             |
                                      | specs (JSON array)|
                                      +-------------------+
```

## JSON Database File Structure
The database resides at `server/data/db.json` and contains root keys for:
- `products`: Array of product objects.
- `categories`: Array of category classification objects.
- `orders`: Array of customer orders with embedded item snapshots.
- `customers`: Array of customer accounts.
- `coupons`: Array of active promo codes.
- `settings`: Global configuration object.

---
*Delivered for DormLights PRD Section 4.*
