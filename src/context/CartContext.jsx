import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('dormlights_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: "prod-1",
        name: "Pro Profile Strip",
        price: 89.00,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtuTOpkOFihU9tCyuDaflF3mGNYghLjp6i_DyDasS8r0Ylqmw8HEqbVavIe_hNXrr300KY1LrKdyfV4dX59wQiEn-gs5gFg8uuA6xyViSZ4Zzl5hHG1KR6vOPZtACUoYW7577Vlb22n6Etp4h-EyY03Ivp0lqgPq7z3rJLWIW14d8fvTTAbB2747QnVD-mqThq_927wbWgUbT-b-GMVn0UrzSJHUck_SPphEbqYOcj6T381Va5_mvQpnMIi6-kjK11nUxyW66C7HIK",
        variant: "3 Meters / 2700K Warm Gold"
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('dormlights_wishlist');
    return saved ? JSON.parse(saved) : ["prod-1", "prod-3"];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('dormlights_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('dormlights_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1, variant = 'Default') => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.variant === variant);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images ? product.images[0] : '',
          variant: variant || (product.specs ? product.specs[0] : 'Standard')
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, variant) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.variant === variant)));
  };

  const updateQuantity = (id, variant, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id && item.variant === variant) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * (appliedCoupon.discountPercent / 100)) : 0;
  const shipping = subtotal > 99 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        appliedCoupon,
        setAppliedCoupon,
        subtotal,
        discount,
        shipping,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
