import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          price: action.price,
          img: action.img,
          size: action.size,
        },
      ];
    default:
      console.log("Error in reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () =>   useContext(cartStateContext);

export const useDispatchCart = () => useContext(cartDispatchContext);

