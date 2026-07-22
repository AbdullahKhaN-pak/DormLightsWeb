# 11 - Comprehensive Code Walkthrough

## End-to-End Execution Trace: "Customer Buys Warm White Kit"

1. **Browsing**: User visits `HomePage.jsx` or `CollectionPage.jsx`. Product items are fetched from backend `GET /api/products`.
2. **Product Detail & Selection**: User clicks `ProductCard.jsx`, navigating to `ProductDetailPage.jsx`. User selects "3 Meters / 2700K Warm Gold" variant.
3. **Cart Storage**: User clicks "Add to Cart". `useCart()` context updates `cartItems` state and syncs to browser `localStorage`.
4. **Coupon Application**: User opens `CartDrawer.jsx` and inputs `DORM10`. Frontend requests `POST /api/coupons/validate`. Backend returns 10% discount calculation.
5. **Checkout Submission**: User enters campus shipping address on `CheckoutPage.jsx` and submits payment.
6. **Backend Processing**: `POST /api/orders` receives payload, deducts product stock in `db.json`, adds customer order record, and generates order ID `ORD-1095`.
7. **Fulfillment**: Admin logs into `/admin`, navigates to `AdminOrders.jsx`, and marks status as `Shipped`.

---
*Delivered for DormLights PRD Section 8.*
