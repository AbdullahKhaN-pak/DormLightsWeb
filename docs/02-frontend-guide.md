# 02 - Frontend Guide & Component Inventory

## Folder Structure

```
src/
├── assets/          # Images, logos, and vector assets
├── components/      # Reusable UI components
│   ├── Navbar.jsx           # Global fixed header with live search & cart trigger
│   ├── Footer.jsx           # Dark footer with student guarantees & newsletter
│   ├── CartDrawer.jsx       # Sliding drawer cart with coupon validation
│   ├── LightSimulator.jsx   # Interactive 2700K Warm Gold & RGB lighting widget
│   ├── ProductCard.jsx      # Glassmorphic product card with specs badges
│   └── WhatsAppChat.jsx     # Floating WhatsApp click-to-chat button
├── context/         # React Context State Providers
│   ├── CartContext.jsx      # Shopping cart, wishlist, and pricing logic
│   └── AuthContext.jsx      # User & Admin authentication token state
├── pages/           # Application views
│   ├── HomePage.jsx         # Hero banner, bento category grid, bestsellers
│   ├── CollectionPage.jsx   # Filterable product catalog
│   ├── ProductDetailPage.jsx# Product images, variant length/color selectors
│   ├── StoryPage.jsx        # Brand philosophy & student lifestyle story
│   ├── CheckoutPage.jsx     # Shipping address & mock payment processor
│   ├── UserAccountPage.jsx  # Student order tracking & wishlist portal
│   └── admin/               # Store Owner Admin Panel pages
│       ├── AdminLayout.jsx
│       ├── AdminDashboard.jsx
│       ├── AdminProducts.jsx
│       ├── AdminCategories.jsx
│       ├── AdminOrders.jsx
│       ├── AdminCustomers.jsx
│       ├── AdminCoupons.jsx
│       └── AdminSettings.jsx
├── styles/          # Tailwind configuration & glassmorphism CSS tokens
├── App.jsx          # Route declarations
└── main.jsx         # React DOM root entry point
```

## Styling Tokens (Stitch MCP Design System)
- **Primary Color**: `#ffd584` / Warm Gold `#f4b400`
- **Background**: Deep Black `#131313`
- **Surfaces**: `#1c1b1b` with `backdrop-filter: blur(20px)` and 1px specular inner stroke.
- **Typography**: Inter (Body & Display) and Geist (Labels & Prices).

---
*Delivered for DormLights PRD Section 3.1.*
