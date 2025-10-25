import CartHeader from "../components/CartHeader";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useGetOrderMutation } from "../store/api/userApi";
import OrderCard from "../components/OrderCard";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [getOrder, { isLoading }] = useGetOrderMutation();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getOrder().unwrap();
        // console.log("get to order product : ", response);
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
    <div className="w-full min-h-screen">
      <CartHeader address={1} />
      <div className="w-full h-full flex flex-col sm:flex-row items-start justify-center gap-3 p-3">
        <div className=" w-full h-full flex flex-col items-center gap-2 sm:px-5 sm:border-r-2 sm:border-gray-200">
          <div className="space-y-3">
            <h1 className="text-lg font-medium text-gray-500 py-1 text-start w-full">
              Product Details
            </h1>
            {orders?.map((item) => (
              <OrderCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Order;
