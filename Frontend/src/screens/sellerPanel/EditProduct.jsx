import React, { useEffect, useState } from "react";
import Title from "../../components/sellerPanel/Title";
import { useGetAllCategoriesMutation } from "../../store/api/userApi";
import { useCreateProductMutation } from "../../store/api/productApi";


const inputClass =
    "peer w-full border-b-2 border-gray-300 px-4 pt-5 pb-2 text-sm focus:outline-none focus:border-purple-600";

  const labelClass = (value) =>
    `absolute left-2 transition-all duration-200 font-medium cursor-pointer
     ${
       value ? "top-1 text-xs text-purple-600" : "top-3 text-base text-gray-400"
     }
     peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600`;



const EditProduct = () => {
 // ---------- State ----------
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
   const [inputValue, setInputValue] = useState("");
   const [discountPer, setDiscountPer] = useState("");
   const [discountDate, setDiscountDate] = useState("");

  const statusOptions = ["Active", "Inactive", "Out of Stock"];

  // ---------- API ----------
  const [getAllCategories] = useGetAllCategoriesMutation();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();

  // ---------- Handlers ----------

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // ---------- Form Submit ----------
  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("color", color);
      formData.append("brand", brand);
      formData.append("weight", weight);
      formData.append("status", status);
      formData.append("description", description);

      const dimensions = {
        width,
        height,
        depth: length,
      };

      const discount = {
        percentage: discountPer,
        valid_until: discountDate
      };

      formData.append("discount", JSON.stringify(discount));
      formData.append("dimensions", JSON.stringify(dimensions));
      formData.append("tags", JSON.stringify(tags));

      images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await createProduct(formData).unwrap();
      console.log("Product created:", response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Title text1="Edit" text2="Product" />
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            className={inputClass} //"peer w-full border-b-2 border-gray-300 px-4 pt-5 pb-2 text-sm focus:outline-none focus:border-purple-600"
          />

          <label htmlFor="name" className={labelClass(name)}>
            Name
          </label>
        </div>

        {/* price Field */}
        <div className="relative">
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder=" "
            className={inputClass}
          />
          <label htmlFor="price" className={labelClass(price)}>
            Price
          </label>
        </div>

        {/* Quantity Field */}
        <div className="relative">
          <input
            type="text"
            id="quantity"
            placeholder=" "
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={inputClass}
          />
          <label htmlFor="quantity" className={labelClass(quantity)}>
            Quantity
          </label>
        </div>

        {/* Color Field */}
        <div className="relative mt-2">
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder=" " // Needed for `peer-placeholder-shown` to trigger, but space keeps it hidden
            className={inputClass}
          />
          <label htmlFor="color" className={labelClass(color)}>
            Color
          </label>
        </div>

        {/* brand Number Field */}
        <div className="relative mt-2">
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder=" "
            className={inputClass}
            required
          />
          <label htmlFor="brand" className={labelClass(brand)}>
            Company Name
          </label>
        </div>

          {/* weight Field */}
          <div className="relative mt-2">
            <input
              type="text"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder=" "
              className={inputClass}
              required
            />
            <label htmlFor="weight" className={labelClass(weight)}>
              Weight
            </label>
          </div>
          {/* SubCategory Field */}
          {/* <div className="relative mt-2">
            <input
              type="text"
              id="subCategory"
              name="subCategory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor="subCategory" className={labelClass(subCategory)}>
              SubCategory
            </label>
          </div> */}

          {/* tags Field */}
          <div className="relative mt-2">
            <input
              type="text"
              id="tags"
              name="tags"
              value={inputValue} // show tags as comma separated string
              onChange={handleInputChange}
               onKeyDown={handleKeyDown}
              placeholder={isFocused ? "e.g. #phone, #iphone, #smartphone" : ""}
              className={inputClass}
              required
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <label htmlFor="tags" className={labelClass(tags.length > 0)}>
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-200 text-purple-800 px-2 py-1 rounded flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-purple-800 hover:text-red-600 cursor-pointer"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

            {/* discount Field */}
            <div className="relative mt-2">
            <input
              type="text"
              id="discount"
              name="discount"
              value={discountPer}
              onChange={(e) => setDiscountPer(e.target.value)}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor="discount" className={labelClass(discountPer)}>
              Discount Percentage
            </label>
          </div>

            {/* discount Field */}
            <div className="relative mt-2">
            <input
              type="datetime-local"
              id="discountDate"
              name="discountDate"
              value={discountDate}
              onChange={(e) => setDiscountDate(e.target.value)}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor="discountDate" className={`absolute left-2 transition-all duration-200 font-medium cursor-pointer
              ${
                discountDate ? "top-1 text-xs text-purple-600" : "top-1 text-base text-gray-400"
              }
              peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600`}>
              Discount Last Date And Time
            </label>
          </div>

            
          {/* width Field */}
          <div className="relative mt-2">
            <input
              type="text"
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor="width" className={labelClass(width)}>
              Width
            </label>
          </div>

          {/* height Field */}
          <div className="relative mt-2">
            <input
              type="text"
              id="height"
              name="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor="height" className={labelClass(height)}>
              Height
            </label>
          </div>

          {/* length Field */}
          <div className="relative mt-2">
            <input
              type="text"
              id="length"
              name="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor="length" className={labelClass(length)}>
            Length
            </label>
          </div>

          {/* status Field */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-gray-500">Status</p>
            <div className="flex gap-4">
              {statusOptions.map((option) => (
                <div key={option} className="relative">
                  <input
                    type="radio"
                    id={option}
                    name="status"
                    value={option}
                    checked={status === option}
                    onChange={(e) => setStatus(e.target.value)}
                    className={"peer hidden"}
                  />
                  <label htmlFor={option} className={
                    `inline-block px-4 py-2 border rounded-md cursor-pointer transition-colors duration-200
                  ${option === status ? "bg-purple-600 text-white" : "bg-white text-gray-700 border-gray-300"}
                  hover:border-purple-600 hover:text-purple-600 `}>  
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* description Field */}
          <div className="relative mt-2">
            <textarea
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              required
              maxLength={200}
              className={inputClass}
            />
            <label htmlFor="description" className={labelClass(description)}>
            Description
            </label>
          </div>

              {/* images Field */}
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {images.map((file, i) => {
                const url = URL.createObjectURL(file);
                return (
                  <img
                    key={i}
                    src={url}
                    alt={file.name}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={()=> handleFormSubmit()}
              className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 cursor-pointer"
            >
              Add Product
            </button>
          </div>

      </div>
    </>
  );
};

export default EditProduct;
