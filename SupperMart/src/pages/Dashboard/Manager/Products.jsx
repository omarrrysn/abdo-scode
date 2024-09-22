import React, { useState } from "react";

const Products = () => {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    subCategory: "",
    image: null,
    availability: true,
    quantity: 0,
    price: 0,
  });

  const categories = ["Fruits", "Vegetables", "Beverages", "Snacks"];
  const subCategories = {
    Fruits: ["Citrus", "Berries", "Tropical"],
    Vegetables: ["Leafy Greens", "Root", "Cruciferous"],
    Beverages: ["Soda", "Juice", "Tea"],
    Snacks: ["Chips", "Cookies", "Nuts"],
  };

 const dummyProducts = [
   {
     productName: "Orange",
     category: "Fruits",
     subCategory: "Citrus",
     image: null,
     availability: true,
     quantity: 50,
     price: 0.99,
   },
   {
     productName: "Broccoli",
     category: "Vegetables",
     subCategory: "Cruciferous",
     image: null,
     availability: true,
     quantity: 30,
     price: 1.5,
   },
   {
     productName: "Green Tea",
     category: "Beverages",
     subCategory: "Tea",
     image: null,
     availability: true,
     quantity: 100,
     price: 2.0,
   },
   {
     productName: "Potato Chips",
     category: "Snacks",
     subCategory: "Chips",
     image: null,
     availability: true,
     quantity: 200,
     price: 1.25,
   },
   {
     productName: "Strawberries",
     category: "Fruits",
     subCategory: "Berries",
     image: null,
     availability: true,
     quantity: 40,
     price: 3.99,
   },
   {
     productName: "Carrot",
     category: "Vegetables",
     subCategory: "Root",
     image: null,
     availability: true,
     quantity: 100,
     price: 0.75,
   },
   {
     productName: "Apple Juice",
     category: "Beverages",
     subCategory: "Juice",
     image: null,
     availability: true,
     quantity: 60,
     price: 1.99,
   },
   {
     productName: "Chocolate Chip Cookies",
     category: "Snacks",
     subCategory: "Cookies",
     image: null,
     availability: true,
     quantity: 150,
     price: 2.5,
   },
   {
     productName: "Mango",
     category: "Fruits",
     subCategory: "Tropical",
     image: null,
     availability: true,
     quantity: 25,
     price: 1.99,
   },
   {
     productName: "Kale",
     category: "Vegetables",
     subCategory: "Leafy Greens",
     image: null,
     availability: true,
     quantity: 35,
     price: 1.75,
   },
   {
     productName: "Orange Juice",
     category: "Beverages",
     subCategory: "Juice",
     image: null,
     availability: true,
     quantity: 80,
     price: 2.5,
   },
   {
     productName: "Almonds",
     category: "Snacks",
     subCategory: "Nuts",
     image: null,
     availability: true,
     quantity: 100,
     price: 3.0,
   },
   {
     productName: "Lemon",
     category: "Fruits",
     subCategory: "Citrus",
     image: null,
     availability: true,
     quantity: 60,
     price: 0.5,
   },
   {
     productName: "Spinach",
     category: "Vegetables",
     subCategory: "Leafy Greens",
     image: null,
     availability: true,
     quantity: 40,
     price: 1.25,
   },
   {
     productName: "Herbal Tea",
     category: "Beverages",
     subCategory: "Tea",
     image: null,
     availability: true,
     quantity: 150,
     price: 2.25,
   },
   {
     productName: "Soda",
     category: "Beverages",
     subCategory: "Soda",
     image: null,
     availability: true,
     quantity: 300,
     price: 1.0,
   },
   {
     productName: "Mixed Nuts",
     category: "Snacks",
     subCategory: "Nuts",
     image: null,
     availability: true,
     quantity: 180,
     price: 4.5,
   },
   {
     productName: "Raspberry",
     category: "Fruits",
     subCategory: "Berries",
     image: null,
     availability: true,
     quantity: 70,
     price: 4.0,
   },
   {
     productName: "Cucumber",
     category: "Vegetables",
     subCategory: "Root",
     image: null,
     availability: true,
     quantity: 50,
     price: 1.0,
   },
   {
     productName: "Ginger Ale",
     category: "Beverages",
     subCategory: "Soda",
     image: null,
     availability: true,
     quantity: 100,
     price: 1.5,
   },
   {
     productName: "Oatmeal Cookies",
     category: "Snacks",
     subCategory: "Cookies",
     image: null,
     availability: true,
     quantity: 80,
     price: 3.25,
   },
   {
     productName: "Pineapple",
     category: "Fruits",
     subCategory: "Tropical",
     image: null,
     availability: true,
     quantity: 20,
     price: 2.5,
   },
   {
     productName: "Cauliflower",
     category: "Vegetables",
     subCategory: "Cruciferous",
     image: null,
     availability: true,
     quantity: 30,
     price: 1.8,
   },
   {
     productName: "Grapefruit",
     category: "Fruits",
     subCategory: "Citrus",
     image: null,
     availability: true,
     quantity: 45,
     price: 1.75,
   },
   {
     productName: "Black Tea",
     category: "Beverages",
     subCategory: "Tea",
     image: null,
     availability: true,
     quantity: 120,
     price: 2.0,
   },
   {
     productName: "Pretzels",
     category: "Snacks",
     subCategory: "Chips",
     image: null,
     availability: true,
     quantity: 100,
     price: 1.5,
   },
 ];


  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleCategoryChange = (e) => {
  if(e.target.value==="all"){
    setFilteredProducts(dummyProducts);
    setSubCategoryFilter("");
  }else{
      const selectedCategory = e.target.value;
      setCategoryFilter(selectedCategory);
      setSubCategoryFilter(""); // Reset subcategory on category change
      setFilteredProducts(
        dummyProducts.filter((p) => p.category === selectedCategory)
      );
  }
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSubCategoryFilter(selectedSubCategory);
    setFilteredProducts(
      dummyProducts.filter(
        (p) =>
          p.category === categoryFilter && p.subCategory === selectedSubCategory
      )
    );
  };

  const handleDelete = (index) => {
    const updatedProducts = filteredProducts.filter((_, i) => i !== index);
    setFilteredProducts(updatedProducts);
  };

  const handleEdit = (index) => {
    const selectedProduct = filteredProducts[index];
    setProduct(selectedProduct); // Populate the form with selected product data
    setIsEditing(true);
    setEditIndex(index); // Track which product is being edited
  };

  const handleFormSubmit = () => {
    const updatedProducts = [...filteredProducts];
    if (isEditing && editIndex !== null) {
      // Update existing product
      updatedProducts[editIndex] = product;
      setFilteredProducts(updatedProducts);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new product
      setFilteredProducts([...filteredProducts, product]);
    }

    // Reset form
    setProduct({
      productName: "",
      category: "",
      subCategory: "",
      image: null,
      availability: true,
      quantity: 0,
      price: 0,
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-lg font-bold mb-4">Product Management</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block">Filter by Category</label>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="border p-2 w-full"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {categoryFilter && (
          <div>
            <label className="block">Filter by SubCategory</label>
            <select
              value={subCategoryFilter}
              onChange={handleSubCategoryChange}
              className="border p-2 w-full"
            >
              <option value="">All SubCategories</option>
              {subCategories[categoryFilter].map((subCat, index) => (
                <option key={index} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Product Form */}
      <div className="border p-4 mb-6">
        <h3 className="font-medium mb-4">
          {isEditing ? "Edit Product" : "Add Product"}
        </h3>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block">Product Name</label>
              <input
                type="text"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
                className="border w-full p-2"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block">Category</label>
              <select
                value={product.category || categoryFilter}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="border w-full p-2"
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block">SubCategory</label>
              <select
                value={product.subCategory || subCategoryFilter}
                onChange={(e) =>
                  setProduct({ ...product, subCategory: e.target.value })
                }
                className="border w-full p-2"
              >
                <option value="">Select SubCategory</option>
                {product.category &&
                  subCategories[product.category].map((subCat, index) => (
                    <option key={index} value={subCat}>
                      {subCat}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block">Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
                className="border w-full p-2"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="border w-full p-2"
                placeholder="Enter price"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleFormSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isEditing ? "Save Changes" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Products Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">SubCategory</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td className="border p-2">{product.productName}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.subCategory}</td>
              <td className="border p-2">{product.quantity}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
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
    </div>
  );
};

export default Products;
