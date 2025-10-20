import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import HomePageCard from "../components/HomePageCard";
import HomePageCarouselCard from "../components/HomePageCarouselCard";
import ManualCarousel from "../components/Carousel";
import CategorySideBar from "../components/CategorySideBar";
import { useGetAllProductMutation } from "../store/api/productApi";
import Loading from "../components/Loading";
import {useGetCategoriesMutation } from "../store/api/userApi";
import { useSelector } from "react-redux";


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
  const [getCategories] = useGetCategoriesMutation();
  const [categories, setCategories] = useState([]);

   const uniqueProducts = useMemo(() => getUniqueCategoryProducts(products), [products]);

   const selectedCategories = useSelector(
       (state) => state.filters.selectedCategories
     );
     const selectedColors = useSelector((state) => state.filters.selectedColors);
     const selectedFabrics = useSelector((state) => state.filters.selectedFabrics);
     const checkedRatings = useSelector((state) => state.filters.checkedRatings);
     const selectedCombos = useSelector((state) => state.filters.selectedCombos);
     const selectedGenders = useSelector((state) => state.filters.selectedGenders);
     const selectedPrice = useSelector((state) => state.filters.selectedPrice);
     const selectedDiscounts = useSelector(
       (state) => state.filters.selectedDiscounts
     );
     const selectedSize = useSelector((state) => state.filters.selectedSize);
   
  
  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
    try {
      const res = await getCategories().unwrap();
      // console.log('response of categories Data :',res);
      setCategories(res.categories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    };

    getAllData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data.products);
      setProducts(data.products);
    }
  }, [data]);

  // const filteredProducts =
  // selectedCategories.length === 0
  //   ? products
  //   : products.filter(product =>
  //       selectedCategories.includes(product.categoryId._id)
  // );


  const filteredProducts = products.filter((product) => {
  // Filter by category
  if (
    selectedCategories.length > 0 &&
    !selectedCategories.includes(product.categoryId._id)
  ) {
    return false;
  }

  // Filter by color
  if (
    selectedColors.length > 0 &&
    !selectedColors
    .map((c) => c.toLowerCase().trim())
    .includes(product.color.toLowerCase().trim())
  ) {
    return false;
  }

  // Filter by fabric
  if (
    selectedFabrics.length > 0 &&
    !selectedFabrics.map((c) => c.toLowerCase().trim()).includes(product.material.toLowerCase().trim())
  ) {
    return false;
  }

  // Filter by rating
  if (
    checkedRatings.length > 0 &&
    !checkedRatings.includes(Math.floor(product.rating)) // assuming rating is a float
  ) {
    return false;
  }

  // Filter by combo
  // if (
  //   selectedCombos.length > 0 &&
  //   !selectedCombos.includes(product.comboType)
  // ) {
  //   return false;
  // }

  // Filter by gender
  // if (
  //   selectedGenders.length > 0 &&
  //   !selectedGenders.includes(product.gender)
  // ) {
  //   return false;
  // }

  // Filter by price
  if (selectedPrice.length > 0) {
    const match = selectedPrice.some((priceRange) => {
      if (priceRange === "under100") return product.price < 100;
      if (priceRange === "100to500") return product.price >= 100 && product.price <= 500;
      if (priceRange === "above500") return product.price > 500;
      return false;
    });
    if (!match) return false;
  }

  // Filter by discounts
  if (
    selectedDiscounts.length > 0 &&
    !selectedDiscounts.includes(product.discount?.percentage)
  ) {
    return false;
  }

  // Filter by size
  if (
    selectedSize.length > 0 &&
    // !selectedSize.some((size) => product.availableSizes.includes(size))
    !selectedSize.map((c) => c.toLowerCase().trim()).includes(product.size.toLowerCase().trim())
  ) {
    return false;
  }

  return true;
});



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
      <CategorySideBar categories={categories} />
       </div>
      <div className="w-[77%] h-full grid grid-cols-4 p-5 gap-3">
        {filteredProducts.map((product) => (
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
