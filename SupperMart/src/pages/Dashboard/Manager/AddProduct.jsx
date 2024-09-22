import React, { useState } from "react";

const AddProduct = ({ formData, subCategories, onFormChange }) => {
  const [product, setProduct] = useState({
    productName: "",
    subCategory: "",
    image: null,
    offer: "",
    offerTime: "",
    availability: true,
    quantity: 0,
    price: 0,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [tempProducts, setTempProducts] = useState(formData || []);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setProduct({ ...product, image: null });
    }
  };

  const validateProduct = () => {
    const newErrors = {};

    if (!product.productName) {
      newErrors.productName = "Product name is required";
    }
    if (!product.subCategory) {
      newErrors.subCategory = "Subcategory is required";
    }
    if (product.offer < 0 || product.offer > 100 || !product.offer) {
      newErrors.offer = "Offer amount must be between 0 and 100";
    }
    if (product.quantity < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    }
    if (product.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateProduct();

    if (Object.keys(validationErrors).length === 0) {
      setTempProducts([...tempProducts, product]);
      setProduct({
        productName: "",
        subCategory: "",
        image: null,
        offer: "",
        offerTime: "",
        availability: true,
        quantity: 0,
        price: 0,
      });
      setImagePreview(null);
      setErrors({});
      onFormChange(tempProducts)
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDelete = (index) => {
    const updatedProducts = tempProducts.filter((_, i) => i !== index);
    setTempProducts(updatedProducts);
  };

  return (
    <div>
      <div className="rounded-sm border bg-white shadow-default dark:bg-graydark ">
        <div className="border-b py-4 px-6.5">
          <h3 className="font-medium text-black dark:text-white">
            Product Information
          </h3>
        </div>
        <form>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col">
              <label className="mb-2.5 block text-black dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
                placeholder="Enter product name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.productName && (
                <span className="text-red-500">{errors.productName}</span>
              )}
            </div>

            <div className="mb-4.5 flex flex-col">
              <label className="mb-2.5 block text-black dark:text-white">
                Select SubCategory
              </label>
              <select
                value={product.subCategory}
                onChange={(e) =>
                  setProduct({ ...product, subCategory: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select SubCategory</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory.subCategoryName}>
                    {subCategory.subCategoryName}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <span className="text-red-500">{errors.subCategory}</span>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Attach Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] bg-transparent outline-none"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product"
                  className="mt-2 h-40 w-auto rounded border"
                />
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Offer Amount
              </label>
              <input
                type="number"
                value={product.offer}
                onChange={(e) =>
                  setProduct({ ...product, offer: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.offer && (
                <span className="text-red-500">{errors.offer}</span>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Offer Time
              </label>
              <input
                type="number"
                value={product.offerTime}
                onChange={(e) =>
                  setProduct({ ...product, offerTime: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Availability
              </label>
              <select
                value={product.availability ? "Available" : "Not Available"}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    availability: e.target.value === "Available",
                  })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>

            <div className="mb-4.5 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <label className="mb-2.5 block text-black dark:text-white">
                  Quantity
                </label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.quantity && (
                  <span className="text-red-500">{errors.quantity}</span>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.price && (
                  <span className="text-red-500">{errors.price}</span>
                )}
              </div>
            </div>

            <table className="w-full table-auto mt-6">
              <thead>
                <tr className="bg-gray-2 text-left">
                  <th className="py-4 px-4 font-medium text-black">
                    Product Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black">
                    SubCategory
                  </th>
                  <th className="py-4 px-4 font-medium text-black">Image</th>
                  <th className="py-4 px-4 font-medium text-black">Offer</th>
                  <th className="py-4 px-4 font-medium text-black">
                    Offer Time
                  </th>
                  <th className="py-4 px-4 font-medium text-black">Quantity</th>
                  <th className="py-4 px-4 font-medium text-black">Price</th>
                  <th className="py-4 px-4 font-medium text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tempProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{product.productName}</td>
                    <td className="py-2 px-4">{product.subCategory}</td>
                    <td className="py-2 px-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="h-10 w-auto"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="py-2 px-4">{product.offer}</td>
                    <td className="py-2 px-4">{product.offerTime}</td>
                    <td className="py-2 px-4">{product.quantity}</td>
                    <td className="py-2 px-4">{product.price}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              onClick={handleSave}
              className="flex w-full justify-center mt-6 rounded bg-secondary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
