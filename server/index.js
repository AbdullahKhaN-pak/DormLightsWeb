import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'data', 'db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper function to read database
function readDB() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json', err);
    return { products: [], categories: [], orders: [], customers: [], coupons: [], settings: {} };
  }
}

// Helper function to write database
function writeDB(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing db.json', err);
    return false;
  }
}

// --- PRODUCTS ---
app.get('/api/products', (req, res) => {
  const db = readDB();
  let { category, search, minPrice, maxPrice, minRating } = req.query;
  let result = db.products || [];

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      (p.specs && p.specs.some(s => s.toLowerCase().includes(query)))
    );
  }

  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (minRating) {
    result = result.filter(p => p.rating >= parseFloat(minRating));
  }

  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const newProduct = {
    id: `prod-${Date.now()}`,
    name: req.body.name || 'New Lighting Product',
    slug: (req.body.name || 'new-product').toLowerCase().replace(/\s+/g, '-'),
    category: req.body.category || 'Profile Strips',
    price: parseFloat(req.body.price) || 49.00,
    originalPrice: parseFloat(req.body.originalPrice) || 59.00,
    rating: 5.0,
    reviewsCount: 1,
    stock: parseInt(req.body.stock) || 20,
    badge: req.body.badge || 'NEW',
    description: req.body.description || 'Premium warm gold lighting product.',
    features: req.body.features || ['Premium lighting diffuser', 'App compatible'],
    specs: req.body.specs || ['WARM GOLD', 'DIMMABLE'],
    images: req.body.images && req.body.images.length ? req.body.images : ['https://lh3.googleusercontent.com/aida-public/AB6AXuAtuTOpkOFihU9tCyuDaflF3mGNYghLjp6i_DyDasS8r0Ylqmw8HEqbVavIe_hNXrr300KY1LrKdyfV4dX59wQiEn-gs5gFg8uuA6xyViSZ4Zzl5hHG1KR6vOPZtACUoYW7577Vlb22n6Etp4h-EyY03Ivp0lqgPq7z3rJLWIW14d8fvTTAbB2747QnVD-mqThq_927wbWgUbT-b-GMVn0UrzSJHUck_SPphEbqYOcj6T381Va5_mvQpnMIi6-kjK11nUxyW66C7HIK'],
    inStock: true,
    createdAt: new Date().toISOString()
  };

  db.products.unshift(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const db = readDB();
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });

  db.products[idx] = { ...db.products[idx], ...req.body };
  writeDB(db);
  res.json(db.products[idx]);
});

app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  const initialLen = db.products.length;
  db.products = db.products.filter(p => p.id !== req.params.id);
  if (db.products.length === initialLen) return res.status(404).json({ error: 'Product not found' });

  writeDB(db);
  res.json({ success: true, message: 'Product deleted' });
});

// --- CATEGORIES ---
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories || []);
});

app.post('/api/categories', (req, res) => {
  const db = readDB();
  const newCat = {
    id: `cat-${Date.now()}`,
    name: req.body.name,
    slug: req.body.name.toLowerCase().replace(/\s+/g, '-'),
    description: req.body.description || '',
    count: 0
  };
  db.categories.push(newCat);
  writeDB(db);
  res.status(201).json(newCat);
});

// --- ORDERS ---
app.get('/api/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    id: orderId,
    customerName: req.body.customerName || 'Dorm Customer',
    customerEmail: req.body.customerEmail || 'customer@university.edu',
    items: req.body.items || [],
    total: parseFloat(req.body.total) || 0.0,
    couponCode: req.body.couponCode || null,
    status: 'Processing',
    shippingAddress: req.body.shippingAddress || '100 University Way',
    paymentMethod: req.body.paymentMethod || 'Credit Card',
    createdAt: new Date().toISOString()
  };

  // Deduct product stock
  if (req.body.items && req.body.items.length) {
    req.body.items.forEach(item => {
      const p = db.products.find(prod => prod.id === item.id);
      if (p) {
        p.stock = Math.max(0, p.stock - (item.quantity || 1));
      }
    });
  }

  // Update or add customer record
  let customer = db.customers.find(c => c.email.toLowerCase() === newOrder.customerEmail.toLowerCase());
  if (customer) {
    customer.ordersCount = (customer.ordersCount || 0) + 1;
    customer.totalSpent = (customer.totalSpent || 0) + newOrder.total;
  } else {
    db.customers.unshift({
      id: `cust-${Date.now()}`,
      name: newOrder.customerName,
      email: newOrder.customerEmail,
      ordersCount: 1,
      totalSpent: newOrder.total,
      status: 'Active'
    });
  }

  db.orders.unshift(newOrder);
  writeDB(db);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = req.body.status || order.status;
  writeDB(db);
  res.json(order);
});

// --- CUSTOMERS ---
app.get('/api/customers', (req, res) => {
  const db = readDB();
  res.json(db.customers || []);
});

app.put('/api/customers/:id/status', (req, res) => {
  const db = readDB();
  const customer = db.customers.find(c => c.id === req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  customer.status = req.body.status || customer.status;
  writeDB(db);
  res.json(customer);
});

// --- COUPONS ---
app.get('/api/coupons', (req, res) => {
  const db = readDB();
  res.json(db.coupons || []);
});

app.post('/api/coupons', (req, res) => {
  const db = readDB();
  const newCoupon = {
    id: `coup-${Date.now()}`,
    code: (req.body.code || 'PROMO').toUpperCase(),
    discountPercent: parseInt(req.body.discountPercent) || 10,
    minSpend: parseFloat(req.body.minSpend) || 0,
    status: 'Active',
    usageCount: 0
  };
  db.coupons.unshift(newCoupon);
  writeDB(db);
  res.status(201).json(newCoupon);
});

app.post('/api/coupons/validate', (req, res) => {
  const db = readDB();
  const { code, cartTotal } = req.body;
  const coupon = db.coupons.find(c => c.code.toUpperCase() === (code || '').trim().toUpperCase() && c.status === 'Active');

  if (!coupon) {
    return res.status(404).json({ valid: false, message: 'Invalid or expired coupon code' });
  }

  if (cartTotal < coupon.minSpend) {
    return res.status(400).json({ valid: false, message: `Minimum order spend of $${coupon.minSpend} required for this coupon.` });
  }

  const discountAmount = (cartTotal * (coupon.discountPercent / 100)).toFixed(2);
  res.json({
    valid: true,
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount: parseFloat(discountAmount),
    message: `${coupon.discountPercent}% discount applied!`
  });
});

// --- SETTINGS ---
app.get('/api/settings', (req, res) => {
  const db = readDB();
  res.json(db.settings || {});
});

app.put('/api/settings', (req, res) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json(db.settings);
});

// --- AUTHENTICATION ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@dormlights.com' && password === 'admin123') {
    return res.json({
      user: {
        id: 'admin-1',
        name: 'Dorm Lights Admin',
        email: 'admin@dormlights.com',
        role: 'admin'
      },
      token: 'jwt-admin-token-dormlights-2026'
    });
  } else if (email && password) {
    return res.json({
      user: {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'customer'
      },
      token: 'jwt-customer-token-dormlights-2026'
    });
  }

  res.status(401).json({ error: 'Invalid email or password' });
});

app.listen(PORT, () => {
  console.log(`⚡ DormLights API Server running on port ${PORT}`);
});
