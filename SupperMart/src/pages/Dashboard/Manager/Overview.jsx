import React, { useEffect, useState } from "react";
import UpperBar from "../../../common/UpperBar/UpperBar";
import AddStore from "./AddStore";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import AddProduct from "./AddProduct";

const Overview = () => {
  const [activeTab, setActiveTab] = useState("Store");

  // State to hold form data for all steps
  const [formData, setFormData] = useState({
    store: [],
    categories: [],
    subCategories: [],
    products: [],
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleFormChange = (section, updatedData) => {
    setFormData((prev) => ({
      ...prev,
      [section]: updatedData, // Replace the section with the updated data
    }));
  };
  const links = [
    { name: "Store", key: "Store" },
    { name: "Category", key: "Category" },
    { name: "Sub Category", key: "SubCategory" },
    { name: "Product", key: "Product" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Store":
        return (
          <AddStore
            formData={formData.store}
            onFormChange={(updatedData) =>
              handleFormChange("store", updatedData)
            }
            onNext={() => setActiveTab("Category")}
          />
        );
      case "Category":
        return (
          <AddCategory
            formData={formData.categories}
            onFormChange={(updatedData) =>
              handleFormChange("categories", updatedData)
            }
            onNext={() => setActiveTab("SubCategory")}
          />
        );
      case "SubCategory":
        return (
          <AddSubCategory
            formData={formData.subCategories}
            categories={formData.categories} // Pass categories to link
            onFormChange={(updatedData) =>
              handleFormChange("subCategories", updatedData)
            }
            onNext={() => setActiveTab("Product")}
          />
        );
      case "Product":
        return (
          <AddProduct
            formData={formData.products}
            subCategories={formData.subCategories} // Pass subcategories to link
            onFormChange={(updatedData) =>
              handleFormChange("products", updatedData)
            }
          />
        );
      default:
        return <AddStore />;
    }
  };

  return (
    <div>
      <UpperBar
        links={links}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key)} // Update active tab
      />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Overview;
