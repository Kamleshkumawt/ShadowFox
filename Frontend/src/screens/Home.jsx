import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import HomePageCard from "../components/HomePageCard";
import HomePageCarouselCard from "../components/HomePageCarouselCard";
import ManualCarousel from "../components/Carousel";
import CategorySideBar from "../components/CategorySideBar";
import { useGetAllProductMutation } from "../store/api/productApi";
import Loading from "../components/Loading";


const getUniqueCategoryProducts = (products, limit = 4) => {
  const result = [];
  const seenCategoryNames = new Set();

  for (const product of products) {
    const categoryName = product.categoryId?.name;

    if (!categoryName) continue; // skip if category name is missing

    if (!seenCategoryNames.has(categoryName)) {
      result.push(product);
      seenCategoryNames.add(categoryName);
    }

    if (result.length === limit) break;
  }

  return result;
};


const Home = () => {
  const [products, setProducts] = useState([]);
  const [getAllProduct, { data , isLoading}] = useGetAllProductMutation();

   const uniqueProducts = useMemo(() => getUniqueCategoryProducts(products), [products]);
  
  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data.products);
      setProducts(data.products);
    }
  }, [data]);

  return !isLoading ? (
    <div className="w-full min-h-screen px-4 gap-2 bg-gray-50 pt-30">
      
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/3600/3600/image/a85bf06bede8464f.jpg?q=80"
          alt="image"
        />
      </div>
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/2000/2000/image/ce7d2d27900bfa3a.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="flex items-center justify-center w-full">
      <div className="w-[85%] px-2 bg-white">
        <h1 className="text-2xl font-semibold">Best deals on smartphones</h1>
        <ManualCarousel data={products}/>
      </div>
      <div className="w-48 h-full ">
        <img src="https://rukminim1.flixcart.com/fk-p-flap/1060/1620/image/0cc12d558f0730bb.jpeg?q=60" alt="img" className="object-contain" />
      </div>
      </div>

      {/*image*/}
      <div className="w-full h-full flex flex-wrap gap-2">
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/17ec19e239278232.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/17ec19e239278232.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/17ec19e239278232.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/17ec19e239278232.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/17ec19e239278232.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/17ec19e239278232.jpg?q=50"
          alt="image"
        />
      </div>
      </div>
     
      <div className="w-full px-2 bg-white">
        <h1 className="text-2xl font-semibold">Top Deals Product</h1>
        <ManualCarousel data={products}/>
      </div>

      <div className="w-full h-full flex items-center justify-center ">
        <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/660/image/cb7abaa53e8b0fdb.jpg?q=60"className="w-92" alt="image" />
        <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/660/image/cb7abaa53e8b0fdb.jpg?q=60"className="w-92" alt="image" />
        <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/660/image/cb7abaa53e8b0fdb.jpg?q=60"className="w-92" alt="image" />
        <img src="https://rukminim1.flixcart.com/fk-p-flap/1600/660/image/cb7abaa53e8b0fdb.jpg?q=60"className="w-92" alt="image" />
      </div>

      <div className="w-full h-full flex items-center justify-center gap-3 ">
        <div className="w-[32%] flex flex-col items-center justify-center gap-3 bg-white p-2">
        <div className="flex items-center justify-between w-full"><h1 className="text-2xl font-semibold">Make Your style</h1> <span className="bg-blue-600 text-white px-2 p-1 rounded-full">{">"}</span></div>
          <div className="w-full flex flex-wrap items-center justify-center px-3 gap-2">
            {uniqueProducts.map((product) => (
          <HomePageCard key={product._id} data={product} />
        ))}
          </div>
      </div>

      <div className="w-[32%] flex flex-col items-center justify-center gap-3 bg-white p-2">
        <div className="flex items-center justify-between w-full"><h1 className="text-2xl font-semibold">Make Your style</h1> <span className="bg-blue-600 text-white px-2 p-1 rounded-full">{">"}</span></div>
          <div className="w-full flex flex-wrap items-center justify-center px-3 gap-2">
            {uniqueProducts.map((product) => (
          <HomePageCard key={product._id} data={product} />
        ))}
          </div>
      </div>
      <div className="w-[32%] h-[38rem]">
        <img src="https://rukminim1.flixcart.com/www/1060/1460/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60" className="object-cover w-full h-full l" alt="image" />
      </div>
      </div>

      <div className="w-full h-full flex flex-wrap gap-2">
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/edc8ecb1b252e88a.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/edc8ecb1b252e88a.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/edc8ecb1b252e88a.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/edc8ecb1b252e88a.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/edc8ecb1b252e88a.jpg?q=50"
          alt="image"
        />
      </div>
      <div className="w-[30rem] h-full">
        <img
        className="object-cover w-full h-full"
          src="https://rukminim2.flixcart.com/fk-p-flap/960/960/image/edc8ecb1b252e88a.jpg?q=50"
          alt="image"
        />
      </div>
      </div>


     

      

    
      <div className="w-full px-2 bg-white">
        <h1 className="text-2xl font-semibold">Top Deals Product</h1>
  <ManualCarousel data={products} />
</div>

    <h1 className="text-3xl my-5 px-5">Products For You</h1>
    <div className="w-full h-full flex items-start justify-center px-5">
       <div className="w-[23%] h-full flex flex-col items-start justify-start  ">
      <CategorySideBar/>
       </div>
      <div className="w-[77%] h-full grid grid-cols-4 p-5 gap-3">
        {products.map((product) => (
          <Card key={product._id} data={product} />
        ))}
        </div>
    </div>
      {/* <div className="grid grid-cols-4">
        <Card />
        <Card />
        <Card />
      </div> */}
    </div>
  ) : <Loading/>
};

export default Home;
