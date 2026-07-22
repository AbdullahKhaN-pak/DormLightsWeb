# 03 - Backend Architecture & API Guide

## Server Overview
The backend is an Express.js server running on port `3001` configured with CORS and body parsing middleware. It persists data to `server/data/db.json`.

## API Endpoints Reference

| Endpoint | Method | Purpose | Auth Required |
|---|---|---|---|
| `/api/products` | GET | Fetch products with category, search, and price filters | No |
| `/api/products/:id` | GET | Retrieve detailed information for a single product | No |
| `/api/products` | POST | Create a new lighting product SKU | Admin |
| `/api/products/:id` | PUT | Update existing product details, price, or stock | Admin |
| `/api/products/:id` | DELETE | Remove product SKU from store | Admin |
| `/api/categories` | GET / POST | List or create categories | Public / Admin |
| `/api/orders` | GET | Retrieve orders list | Admin / User |
| `/api/orders` | POST | Submit customer order and deduct stock | No |
| `/api/orders/:id/status` | PUT | Update order status (Processing / Shipped / Delivered) | Admin |
| `/api/coupons` | GET / POST | Manage promo discount codes | Admin |
| `/api/coupons/validate` | POST | Validate promo code against current cart subtotal | No |
| `/api/auth/login` | POST | User / Admin login authentication | No |
| `/api/settings` | GET / PUT | Read or update store configuration settings | Admin |

---
*Delivered for DormLights PRD Section 3.2.*
