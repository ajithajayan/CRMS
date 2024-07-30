import React from "react";
import OrderForm from "../../components/Forms/OrderForm";

function OrderCreation() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Order</h1>
      <OrderForm />
    </div>
  );
}

export default OrderCreation;
