"use client";

import { ReactNode, useReducer } from "react";
import { createContext } from "react";
export const GlobalContext = createContext<{
  cart: any[];
  dispatch: React.Dispatch<Action>;
}>({
  cart: [],
  dispatch: () => {},
});



type CartItem = {
  id: number;
  thumbnail: string;
  price: number;
  title: string;
  quantity: number;
  // Add other properties as needed
};

type Action = {
  type: string;
  id?: number;
  payload: CartItem;
};

const reducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      // check agar item already hai cart me
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        // agar already hai, toh quantity +1
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // otherwise naya item add karo (quantity 1 se start hogi)
      return [...state, { ...action.payload, quantity: 1 }];

    case "INCREMENT_LIST_ITEM":
      return state.map((item: CartItem) => {
        if (action.payload.id === item.id) {
          return {
            ...item,
            quantity: item.quantity >= 5 ? 5 : item.quantity + 1,
          };
        }
        return item;
      });
    case "DECREMENT_LIST_ITEM":
      return state.map((item: CartItem) => {
        if (action.payload.id === item.id) {
          return {
            ...item,
            quantity: item.quantity <= 1 ? 1 : item.quantity - 1,
          };
        }
        return item;
      });
    case "DELETE_LIST_ITEM":
      return state.filter((item: CartItem) => {
        return item.id !== action.payload.id;
      });
    default:
      return state;
  }
};

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, []);
  return (
    <GlobalContext.Provider value={{ cart, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
