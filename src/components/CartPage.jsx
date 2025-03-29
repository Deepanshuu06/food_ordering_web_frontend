import React from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <div className="w-full mx-auto">
        <div className="w-[80%] mx-auto">

      {cart?.item.map((item) => (
          <h1>{item.name}</h1>
        ))}
        </div>
    </div>
  );
}

export default CartPage;
