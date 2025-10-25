import React, { useEffect, useState } from "react";
import { formatAmount } from "../lib/formatAmount";
import { useGetOrderMutation } from "../store/api/userApi";
import Loading from "./Loading";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [getOrder, { isLoading }] = useGetOrderMutation();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getOrder().unwrap();
        console.log("get to order product : ", response);
        setOrders(response.orders);
        // If you want to log product details from the first order:
        // response.orders.forEach((order, index) => {
        //   console.log(
        //     `Order ${index + 1} - Status: ${order.status}, Total: ₹${
        //       order.total_amount
        //     }`
        //   );

        //   order.items.forEach((item, itemIndex) => {
        //     const product = item.productId;

        //     console.log(`  Item ${itemIndex + 1}:`);
        //     console.log(`    Name: ${product.name}`);
        //     console.log(`    Price: ₹${product.price}`);
        //     console.log(`    Quantity: ${item.quantity}`);
        //     console.log(`    Image: ${product.frontImage?.url}`);
        //     console.log(`    Product ID: ${product._id}`);
        //   });
        // });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return !isLoading ? (
    <>
   {orders.map((order, index) => (
  <div key={order._id} className="border border-gray-300 rounded-lg p-6 mb-6 shadow-sm bg-white">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Order #{index + 1}
      </h3>
      <span
        className={`text-sm px-3 py-1 rounded-full font-medium ${
          order.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : order.status === 'Delivered'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {order.status}
      </span>
    </div>

    <p className="text-gray-600 mb-4">
      <strong>Total:</strong> {formatAmount(order.total_amount)}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {order.items.map((item) => (
        <div
          key={item._id}
          className="border border-gray-200 rounded-md p-4 bg-gray-50 flex flex-col items-start"
        >
          <img
            src={item.productId.frontImage?.url}
            alt={item.productId.name}
            className="w-48 h-full object-cover rounded mb-3"
          />
          <p className="text-lg font-medium text-gray-800">{item.productId.name}</p>
          <p className="text-gray-600">Price: {formatAmount(item.productId.price)}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  </div>
))}
     </>
  ) : (
    <Loading />
  );
};

export default OrderCard;
