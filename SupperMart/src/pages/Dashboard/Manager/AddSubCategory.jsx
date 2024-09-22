import React, { useState } from "react";

const AddSubCategory = ({ formData, categories, onFormChange, onNext }) => {
  const [subCategory, setSubCategory] = useState({
    subCategoryName: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [tempSubCategories, setTempSubCategories] = useState(formData || []);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSubCategory({ ...subCategory, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setSubCategory({ ...subCategory, image: null });
    }
  };

  const validateSubCategory = () => {
    const newErrors = {};

    if (!subCategory.subCategoryName) {
      newErrors.subCategoryName = "SubCategory name is required";
    }
    if (!subCategory.category) {
      newErrors.category = "Category is required";
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateSubCategory();

    if (Object.keys(validationErrors).length === 0) {
      setTempSubCategories([...tempSubCategories, subCategory]);
      setSubCategory({
        subCategoryName: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDelete = (index) => {
    const updatedSubCategories = tempSubCategories.filter(
      (_, i) => i !== index
    );
    setTempSubCategories(updatedSubCategories);
  };

  const handleNext = () => {
    onFormChange(tempSubCategories);
    onNext();
  };

  return (
    <div>
      <div className="rounded-sm border bg-white shadow-default dark:bg-graydark">
        <div className="border-b py-4 px-6.5">
          <h3 className="font-medium text-black dark:text-white">
            SubCategory Information
          </h3>
        </div>
        <form>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col">
              <label className="mb-2.5 block text-black dark:text-white">
                SubCategory Name
              </label>
              <input
                type="text"
                value={subCategory.subCategoryName}
                onChange={(e) =>
                  setSubCategory({
                    ...subCategory,
                    subCategoryName: e.target.value,
                  })
                }
                placeholder="Enter subcategory name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.subCategoryName && (
                <span className="text-red-500">{errors.subCategoryName}</span>
              )}
            </div>

            <div className="mb-4.5 flex flex-col">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Category
              </label>
              <select
                value={subCategory.category}
                onChange={(e) =>
                  setSubCategory({ ...subCategory, category: e.target.value })
                }
                className="dark:bg-graydark w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  dark:text-white focus:border-primary active:border-primary"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">{errors.category}</span>
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
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary "
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="SubCategory"
                  className="mt-2 h-40 w-auto rounded border"
                />
              )}
            </div>

            <table className="w-full table-auto mt-6 dark:bg-graydark dark:text-white">
              <thead>
                <tr className="bg-gray-2 dark:bg-graydark  text-left">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    SubCategory Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Image
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tempSubCategories.map((subCategory, index) => (
                  <tr key={index}>
                    <td className="border-b py-5 px-4">
                      {subCategory.subCategoryName}
                    </td>
                    <td className="border-b py-5 px-4">
                      {subCategory.category}
                    </td>
                    <td className="border-b py-5 px-4">
                      {subCategory.image && (
                        <img
                          src={subCategory.image}
                          alt="SubCategory"
                          className="h-10 w-auto rounded border"
                        />
                      )}
                    </td>
                    <td className="border-b py-5 px-4">
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
              className="mt-6 inline-flex items-center justify-center rounded bg-primary py-2 px-6 font-medium text-white"
            >
              Save SubCategory
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="ml-4 mt-6 inline-flex items-center justify-center rounded bg-secondary py-2 px-6 font-medium text-white"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
