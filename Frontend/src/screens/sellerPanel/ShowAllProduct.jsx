import React, { useEffect, useState } from 'react'
import { useGetProductBySellerIdQuery } from '../../store/api/productApi';
import { dateFormat } from '../../lib/dateFormat';
import Title from '../../components/sellerPanel/Title';
import { useSelector } from 'react-redux';


const ShowAllProduct = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log("user :", user);

  const {data, isLoading} = useGetProductBySellerIdQuery('68e2a5264f4c2c3d92fbdca3');

  useEffect(() => {
    if(data) {
      console.log('data is fetched : ', data);
      setProducts(data.products);
    }
  }, [data]);

  return !isLoading && (
    <>
      <Title text1="Products" text2="List" />
      <div className="max-w-7xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead className="bg-primary/20 text-left text-white">
          <tr>
            <th className="p-2 font-medium pl-5">Name</th>
            <th className="p-2 font-medium">Quantity</th>
            <th className="p-2 font-medium">Listing Date</th>
            <th className="p-2 font-medium">Rating</th>
            <th className="p-2 font-medium">Reviews count</th>
            <th className="p-2 font-medium">Amount</th>
            <th className="p-2 font-medium">Color</th>
            <th className="p-2 font-medium">Weight</th>
            <th className="p-2 font-medium">Status</th>
            <th className="p-2 font-medium">Discount</th>
          </tr>
          </thead>
          <tbody className="text-sm font-light">
            {products.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 font-medium"
              >
                <td className="p-2 min-w-45 pl-5">{item.name}</td>
                <td className="p-2 ">{item.quantity}</td>
                <td className="p-2">{dateFormat(item.createdAt)}</td>
                <td className="p-2">{item.rating}</td>
                <td className="p-2">{item.reviews_count}</td>
                <td className="p-2">
                  {Number(
                    String(item?.price)?.replace(/[^0-9.-]+/g, "")
                  ).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  })}
                </td>
                  <td className="p-2">{item.color}</td>
                  <td className="p-2">{item.weight}g</td>
                  <td className="p-2 text-green-700">{item.status}</td>
                  <td className="p-2 text-green-700">{item.discount?.percentage}% off</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ShowAllProduct