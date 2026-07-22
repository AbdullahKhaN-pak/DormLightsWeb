# 04 - Admin Panel Operations Guide

## Admin Authentication
- **URL**: `http://localhost:3000/account` or `http://localhost:3000/admin`
- **Default Credentials**: `admin@dormlights.com` / `admin123`

## Features & Capabilities Matrix

| Admin Section | Capabilities |
|---|---|
| **Dashboard (`/admin`)** | Total Sales Revenue, Total Orders count, Active SKUs count, Low-Stock Warnings (items <= 5 units), and Recent Customer Orders table. |
| **Products (`/admin/products`)** | Add new product modal, edit price/stock/specs, upload/link image URLs, and delete products. |
| **Categories (`/admin/categories`)** | Add custom categories (e.g. Desk Backlights, Monitor Bars) with custom slugs. |
| **Orders (`/admin/orders`)** | Search by order ID or student name, filter by status (Pending, Processing, Shipped, Delivered), and update fulfillment status. |
| **Customers (`/admin/customers`)** | Overview of customer purchase history, email address, and toggle account activation status. |
| **Coupons (`/admin/coupons`)** | Generate new promo codes (e.g. `HARVARD15`), set percentage discounts, minimum order thresholds, and monitor usage counts. |
| **Settings (`/admin/settings`)** | Configure store title, support email address, state tax rate %, free shipping threshold ($99.00), and WhatsApp support number. |

---
*Delivered for DormLights PRD Section 3.3.*
