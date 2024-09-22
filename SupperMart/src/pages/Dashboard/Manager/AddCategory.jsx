import React, { useState } from "react";

const AddCategory = ({ onFormChange, onNext }) => {
  const [category, setCategory] = useState({
    categoryName: "",
    image: null,
    offer: "",
    offerTime: "",
    closingTime: "",
    openTime: "",
    supplierAvailable: "Not Available", // Add default supplier state
    supplier: "", // Supplier field
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [tempCategories, setTempCategories] = useState([]);
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCategory({ ...category, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setCategory({ ...category, image: null });
    }
  };

  const handleDelete = (index) => {
    const updatedCategories = tempCategories.filter((_, i) => i !== index);
    setTempCategories(updatedCategories);
  };

  const validateCategory = () => {
    const newErrors = {};
    const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/i;

    if (!category.categoryName) {
      newErrors.categoryName = "Category name is required";
    }
    if (category.offer < 0 || category.offer > 100 || !category.offer) {
      newErrors.offer = "Offer amount must be between 0 and 100";
    }
    if (!timeRegex.test(category.openTime)) {
      newErrors.openTime = "Open time must be formatted as hh:mmAM/PM";
    }
    if (!timeRegex.test(category.closingTime)) {
      newErrors.closingTime = "Closing time must be formatted as hh:mmAM/PM";
    }
    if (category.supplierAvailable === "Available" && !category.supplier) {
      newErrors.supplier = "Supplier is required when available";
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateCategory();

    if (Object.keys(validationErrors).length === 0) {
      setTempCategories([...tempCategories, category]);
      setCategory({
        categoryName: "",
        image: null,
        offer: "",
        offerTime: "",
        openTime: "",
        closingTime: "",
        supplierAvailable: "Not Available",
        supplier: "",
      });
      setImagePreview(null);
      setErrors({}); // Clear errors after successful save
    } else {
      setErrors(validationErrors); // Set validation errors
    }
  };

  const handleNext = () => {
    if (tempCategories.length > 0) {
      onFormChange(tempCategories);
      onNext();
    } else {
      alert("Please fill one category at least!");
    }
  };

  return (
    <div>
      <div className="rounded-sm border bg-white shadow-default dark:bg-graydark">
        <div className="border-b py-4 px-6.5">
          <h3 className="font-medium text-black dark:text-white">
            Category Information
          </h3>
        </div>
        <form>
          <div className="p-6.5">
            {/* Category Name Input */}
            <div className="mb-4.5 flex flex-col">
              <label className="mb-2.5 block text-black dark:text-white">
                Category Name
              </label>
              <input
                type="text"
                value={category.categoryName}
                onChange={(e) =>
                  setCategory({ ...category, categoryName: e.target.value })
                }
                placeholder="Enter category name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.categoryName && (
                <span className="text-red-500">{errors.categoryName}</span>
              )}
            </div>

            {/* Image Input */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Attach Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary "
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Category"
                  className="mt-2 h-40 w-auto rounded border"
                />
              )}
            </div>

            {/* Open Time and Closing Time Inputs */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Open Time
                </label>
                <input
                  type="text"
                  value={category.openTime}
                  onChange={(e) =>
                    setCategory({ ...category, openTime: e.target.value })
                  }
                  placeholder="08:00AM"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.openTime && (
                  <span className="text-red-500">{errors.openTime}</span>
                )}
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Closing Time
                </label>
                <input
                  type="text"
                  value={category.closingTime}
                  onChange={(e) =>
                    setCategory({ ...category, closingTime: e.target.value })
                  }
                  placeholder="10:00PM"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.closingTime && (
                  <span className="text-red-500">{errors.closingTime}</span>
                )}
              </div>
            </div>

            {/* Offer Amount and Offer Time Inputs */}
            <div className="w-full mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Offer Amount
                </label>
                <input
                  type="number"
                  value={category.offer}
                  placeholder="Offer Amount"
                  onChange={(e) =>
                    setCategory({ ...category, offer: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.offer && (
                  <span className="text-red-500">{errors.offer}</span>
                )}
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Offer Time
                </label>
                <input
                  placeholder="Offer Time"
                  type="number"
                  value={category.offerTime}
                  onChange={(e) =>
                    setCategory({ ...category, offerTime: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {/* Supplier Availability Section */}
            <div className="mb-4.5 flex flex-col">
              <label className="mb-2.5 block text-black dark:text-white">
                Supplier Availability
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="supplierAvailable"
                    value="Available"
                    checked={category.supplierAvailable === "Available"}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        supplierAvailable: e.target.value,
                      })
                    }
                    className="mr-2"
                  />
                  Available
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="supplierAvailable"
                    value="Not Available"
                    checked={category.supplierAvailable === "Not Available"}
                    onChange={(e) =>
                      setCategory({
                        ...category,
                        supplierAvailable: e.target.value,
                        supplier: "",
                      })
                    }
                    className="mr-2"
                  />
                  Not Available
                </label>
              </div>
              {category.supplierAvailable === "Available" && (
                <div className="mt-4">
                  <label className="block text-black dark:text-white">
                    Select Supplier
                  </label>
                  <select
                    value={category.supplier}
                    onChange={(e) =>
                      setCategory({ ...category, supplier: e.target.value })
                    }
                    className="dark:bg-graydark w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  dark:text-white focus:border-primary active:border-primary"
                  >
                    <option value="">Select Supplier</option>
                    <option value="Supplier 1">Supplier 1</option>
                    <option value="Supplier 2">Supplier 2</option>
                    {/* Add more suppliers as options */}
                  </select>
                  {errors.supplier && (
                    <span className="text-red-500">{errors.supplier}</span>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 mr-2 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              Save Category
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="mt-4 rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {/* Temporary Categories List */}
      {tempCategories.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-4 text-xl font-semibold dark:text-white">
            Saved Categories
          </h4>
          <table className="min-w-full table-auto bg-white">
            <thead>
              <tr className="bg-gray-200 dark:bg-graydark">
                <th className="px-4 py-2 dark:text-white">Name</th>
                <th className="px-4 py-2dark:text-white dark:text-white">
                  Offer
                </th>
                <th className="px-4 py-2 dark:text-white">Offer Time</th>
                <th className="px-4 py-2 dark:text-white">Open Time</th>

                <th className="px-4 py-2 dark:text-white">Close Time</th>
                <th className="px-4 py-2 dark:text-white">Supplier</th>
                <th className="px-4 py-2 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tempCategories.map((cat, index) => (
                <tr key={index} className="dark:bg-graydark dark:text-white">
                  <td className="border px-4 py-2">{cat.categoryName}</td>

                  <td className="border px-4 py-2">{cat.offer}%</td>
                  <td className="border px-4 py-2">{cat.offerTime}</td>
                  <td className="border px-4 py-2">{cat.openTime}</td>
                  <td className="border px-4 py-2">{cat.closingTime}</td>
                  <td className="border px-4 py-2">
                    {cat.supplierAvailable === "Available"
                      ? cat.supplier
                      : "Not Available"}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
