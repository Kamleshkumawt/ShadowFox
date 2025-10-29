import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useGetProductByCategoryQuery } from "../store/api/productApi";
import { useSearchParams } from "react-router-dom";
import { useGetAllCategoriesBySlugQuery } from "../store/api/userApi";

const ratingOptions = [
  { label: "2.0 and above", value: "2.0" },
  { label: "3.0 and above", value: "3.0" },
  { label: "3.5 and above", value: "3.5" },
  { label: "4.0 and above", value: "4.0" },
  { label: "M-Trusted", value: "m_trusted" },
];

const fabricOptions = [
  "Acrylic", "Chambray", "Chiffon", "Cotton", "Cotton Blend",
  "Cotton Linen", "Cotton Silk", "Crepe", "Hosiery", "Khadi Cotton",
  "Linen", "Lycra", "Mulmul", "Net", "Nylon", "Nylon Elastane",
  "Nylon Spandex", "Poly Cotton", "Polyester", "Rayon", "Satin",
  "Silk", "Silk Blend", "Spandex", "Viscose", "Viscose Spandex"
];

const colorOptions = [
  "Beige",
  "Black",
  "Brown",
  "Grey",
  "Maroon",
  "Multicolor",
  "Nude",
  "Olive",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Silver",
  "Skin",  // "Skin" appears twice in your list — keep only one
  "White",
];

const comboOptions = [
  "Combos",
"Pack of 1",
"Pack of 2",
"Pack of 3",
"Pack of 4",
"Pack of 5",
"Pack of 6",
"Single"
];

const discountOptions = [
  "10% And Above",
  "20% And Above",
  "30% And Above",
  "40% And Above",
  "50% And Above",
  "All Discounted",
  "Deals"
];



const SearchCategoryRoutes = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [checked, setChecked] = useState(false);
  const [checkedSize, setCheckedSize] = useState(false);
  const [checkedStyling, setCheckedStyling] = useState(false);
  const [gender, setGender] = useState(false);
  const [price, setPrice] = useState(false);
  const [checkedRatings, setCheckedRatings] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedCombos, setSelectedCombos] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  // const { categoryName } = useParams();

  const [showAllFabrics, setShowAllFabrics] = useState(false);

  const visibleFabrics = showAllFabrics ? fabricOptions : fabricOptions.slice(0, 12);
  const [products, setProducts] = useState([]);
  // const [getAllProduct, { data }] = useGetAllProductMutation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");


  const { data:categoryId, Loading } = useGetAllCategoriesBySlugQuery(query, {
      skip: !query || query.length === 0, // skip if no query
  });


    const { data, isLoading } = useGetProductByCategoryQuery(categoryId?.category?._id);

    useEffect(() => {
     if (categoryId) {
        // console.log('categoryId from category API : ',categoryId);
     }
    }, [categoryId]);
  
    useEffect(() => {
      if (data) {
        // console.log('products : ',data);
        // console.log('category data API se  : ',categories);
        setProducts(data.products);
      }
    }, [data]);
    
    // useEffect(() => {
    //   if (data2) {
    //     console.log('category data API se  : ',data);
    //   }
    // }, [data2]);
  



const handleRatingChange = (value) => {
  setCheckedRatings((prev) =>
    prev.includes(value)
      ? prev.filter((v) => v !== value)
      : [...prev, value]
  );
};

const toggleColor = (color) => {
  setSelectedColors((prev) =>
    prev.includes(color)
      ? prev.filter((c) => c !== color)
      : [...prev, color]
  );
};

const toggleFabric = (fabric) => {
  setSelectedFabrics((prev) =>
    prev.includes(fabric)
      ? prev.filter((f) => f !== fabric)
      : [...prev, fabric]
  );
};

const toggleCombo = (combo) => {
  setSelectedCombos((prev) =>
    prev.includes(combo)
      ? prev.filter((c) => c !== combo)
      : [...prev, combo]
  );
};

const toggleDiscount = (discount) => {
  setSelectedDiscounts((prev) =>
    prev.includes(discount)
      ? prev.filter((d) => d !== discount)
      : [...prev, discount]
  );
};

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };
  return !isLoading && (
    <div className="w-full h-full flex flex-col items-center justify-center px-10 sm:px-20 pt-20">
      <div className="w-full h-full flex flex-col items-start justify-start gap-2">
        <h1 className="text-[24px] font-semibold mt-5">{query}</h1>
      </div>
      <div className="w-full h-full flex items-start justify-center">
        <div className="w-[23%] hidden sm:flex h-full  flex-col items-start justify-start py-5 gap-3">
          <div className="border border-gray-200 rounded-sm p-2 w-full flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-medium"> Sort by :</span>{" "}
              Relevance
            </div>
            <svg
              viewBox="0 0 7 12"
              width="12"
              height="12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              // ml="9.5"
              className="rotate-90"
            >
              <path
                d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                fill="#666"
              ></path>
            </svg>
          </div>

          <div className="border border-gray-200 rounded-sm p-2 w-full flex flex-col gap-4 px-3">
            <div className="flex flex-col items-start gap-1">
              <h1 className="font-semibold text-black">FILTERS</h1>
              <p className="text-gray-600 text-xs font-medium">
                1000+ Products
              </p>
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            {/* Category */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-[18px] font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("category")}
              >
                <span className="flex gap-2 items-center">Category</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "category" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "category" && (
                <div
                  className="ml-6 flex gap-2 group hover:cursor-pointer"
                  onClick={handleClick}
                >
                  <input
                    type="checkbox"
                    className="transition w-4 cursor-pointer accent-pink-400 "
                    checked={checked}
                    onChange={() => {}} // Required to suppress React warning
                  />
                  <span className="text-gray-500">{"Palazzos"}</span>
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            
            {/* Gender */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-lg font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("gender")}
              >
                <span className="flex gap-2 items-center">Gender</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "gender" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "gender" && (
                <div
                  onClick={() => setGender(!gender)}
                  className={`border rounded-full px-3 py-1 w-20 text-center text-gray-400 cursor-pointer ${
                    gender
                      ? "bg-pink-400/20 text-pink-500 font-medium border-pink-400"
                      : ""
                  }`}
                >
                  Women
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            
            {/*color */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-lg font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("color")}
              >
                <span className="flex gap-2 items-center">Color</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "color" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "color" && (
                <div className="ml-6 flex flex-wrap gap-3">
                  {colorOptions.map((color) => {
                    const isSelected = selectedColors.includes(color);
                    return (
                      <div
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`border rounded-full px-3 py-1 text-center cursor-pointer capitalize
                          ${isSelected
                            ? "bg-pink-400/20 text-pink-500 font-medium border-pink-400"
                            : "text-gray-400 border-gray-300"}
                        `}
                      >
                        {color}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            
            {/*fabric */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-[18px] font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("fabric")}
              >
                <span className="flex gap-2 items-center">Fabric</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "fabric" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "fabric" && (
                <div className="ml-6 flex flex-col gap-2">
                  {visibleFabrics.map((fabric) => (
                    <div
                      key={fabric}
                      className="flex gap-2 group hover:cursor-pointer"
                      onClick={() => toggleFabric(fabric)}
                    >
                      <input
                        type="checkbox"
                        className="transition w-4 cursor-pointer accent-pink-400"
                        checked={selectedFabrics.includes(fabric)}
                        onChange={() => {}}
                      />
                      <span className="text-gray-500">{fabric}</span>
                    </div>
                  ))}

                  {/* Show More / Show Less Toggle */}
                  {fabricOptions.length > 12 && (
                    <button
                      onClick={() => setShowAllFabrics((prev) => !prev)}
                      className="text-pink-500 text-sm font-medium mt-2 self-start cursor-pointer"
                    >
                      {showAllFabrics ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            
            {/* size */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-[18px] font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("size")}
              >
                <span className="flex gap-2 items-center">Size</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "size" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "size" && (
                <div
                  className="ml-6 flex gap-2 group hover:cursor-pointer"
                  onClick={() => setCheckedSize(!checkedSize)}
                >
                  <input
                    type="checkbox"
                    className="transition w-4 cursor-pointer accent-pink-400 "
                    checked={checkedSize}
                    onChange={() => {}} // Required to suppress React warning
                  />
                  <span className="text-gray-500">{"10XL"}</span>
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            
            {/* Price */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-lg font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("price")}
              >
                <span className="flex gap-2 items-center">Price</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "price" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "price" && (
                <div
                  onClick={() => setPrice(!price)}
                  className={`border rounded-full px-3 py-1 text-center text-gray-400 cursor-pointer ${
                    price
                      ? "bg-pink-400/20 text-pink-500 font-medium border-pink-400"
                      : ""
                  }`}
                >
                  Under 100
                </div>
              )}
            </div>

            <span className=" block w-full border border-gray-200 "></span>
            {/* rating */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-[18px] font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("rating")}
              >
                <span className="flex gap-2 items-center">Rating</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "rating" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "rating" && (
                <div className="ml-6 flex flex-col gap-2">
                  {ratingOptions.map(({ label, value }) => (
                    <div
                      key={value}
                      className="flex gap-2 group hover:cursor-pointer"
                      onClick={() => handleRatingChange(value)}
                    >
                      <input
                        type="checkbox"
                        className="transition w-4 cursor-pointer accent-pink-400"
                        checked={checkedRatings.includes(value)}
                        onChange={() => {}} // still needed for React's controlled warning
                      />
                      <span className="text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            {/* Combo */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-[18px] font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("combo")}
              >
                <span className="flex gap-2 items-center">Combo</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "combo" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "combo" && (
  <div className="ml-6 flex flex-col gap-2">
    {comboOptions.map((combo) => (
      <div
        key={combo}
        className="flex gap-2 group hover:cursor-pointer"
        onClick={() => toggleCombo(combo)}
      >
        <input
          type="checkbox"
          className="transition w-4 cursor-pointer accent-pink-400"
          checked={selectedCombos.includes(combo)}
          onChange={() => {}} // Prevents React warning
        />
        <span className="text-gray-500">{combo}</span>
      </div>
    ))}
  </div>
)}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            {/* discount */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-lg font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("discount")}
              >
                <span className="flex gap-2 items-center">Discount</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "discount" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "discount" && (
                <div className="ml-6 flex flex-wrap gap-5">
                  {discountOptions.map((option) => {
                    const isSelected = selectedDiscounts.includes(option);
                    return (
                      <div
                        key={option}
                        onClick={() => toggleDiscount(option)}
                        className={`border rounded-full px-3 py-1 text-center cursor-pointer 
                          ${isSelected
                            ? "bg-pink-400/20 text-pink-500 font-medium border-pink-400"
                            : "text-gray-400 border-gray-300"}
                        `}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <span className=" block w-full border border-gray-200 "></span>
            {/* surface styling */}
            <div className="flex flex-col gap-3 ">
              <div
                className="text-[18px] font-semibold flex items-center justify-between cursor-pointer group  "
                onClick={() => toggleMenu("surface styling")}
              >
                <span className="flex gap-2 items-center">Surface Styling</span>
                <svg
                  viewBox="0 0 7 12"
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // ml="9.5"
                  className={`transition-transform duration-300 ${
                    openMenu === "surface styling" ? "rotate-270" : "rotate-90"
                  }`}
                >
                  <path
                    d="M.31.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L1.81.305a1.06 1.06 0 0 0-1.5.01Z"
                    fill="#666"
                  ></path>
                </svg>
              </div>
              {openMenu === "surface styling" && (
                <div
                  className="ml-6 flex gap-2 group hover:cursor-pointer"
                  onClick={() => setCheckedStyling(!checkedStyling)}
                >
                  <input
                    type="checkbox"
                    className="transition w-4 cursor-pointer accent-pink-400 "
                    checked={checkedStyling}
                    onChange={() => {}} // Required to suppress React warning
                  />
                  <span className="text-gray-500">{"Bow"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[77%] h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 p-1 sm:p-5 gap-3">
         {products.map((product) => (
          <Card key={product._id} data={product} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCategoryRoutes;
