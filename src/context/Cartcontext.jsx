import React, { createContext, useState } from "react";

// Create the context
export const Cartcontext = createContext();

export function CartProvider({ children }) {
  const [cartitems, setCartitems] = useState([]);

  console.log(cartitems);
  // Add item to cart or increase quantity if exists
  const addcart = (product) => {
    setCartitems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalAmount: (item.quantity + 1) * (item.price + item.tax),
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
            totalAmount: product.price + product.tax,
          },
        ];

      }
    });
    alert("Cart item added");
  };

  // Increase quantity of an item
  const increse = (id) => {
    setCartitems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalAmount: (item.quantity + 1) * (item.price + item.tax),
            }
          : item
      )
    );
  };

  // Decrease quantity or remove item if quantity becomes 0
  const decrese = (id) => {
    setCartitems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalAmount: (item.quantity - 1) * (item.price + item.tax),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely
  const removeitem = (id) => {
    setCartitems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear whole cart
  const clearcart = () => {
    setCartitems([]);
  };

  return (
    <Cartcontext.Provider
      value={{
        cartitems,
        addcart,
        increse,
        decrese,
        removeitem,
        clearcart,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
