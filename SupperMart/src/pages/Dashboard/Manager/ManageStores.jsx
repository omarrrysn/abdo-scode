import React, { useState } from "react";
const dummyData = {
  storeTypes: ["Quick Mart", "Restaurant", "Supermarket", "Cafe"],
  categories: {
    "Quick Mart": ["Fruits & Veggies", "Meat", "Dairy", "Bakery", "Other"],
    Restaurant: ["Restaurant Info", "Beverages", "Appetizers"],
    Supermarket: ["Household Items", "Clothing", "Electronics", "Groceries"],
    Cafe: ["Coffee & Tea", "Pastries", "Snacks", "Beverages"],
  },
  subCategories: {
    "Fruits & Veggies": ["Fruits", "Vegetables", "Organic"],
    Meat: ["Fish", "Beef", "Poultry", "Lamb"],
    Dairy: ["Milk", "Cheese", "Butter", "Yogurt"],
    Bakery: ["Bread", "Cakes", "Pastries", "Cookies"],
    Other: ["Canned Goods", "Frozen Foods"],
    "Restaurant Info": ["Fish", "Meat", "Salad", "Vegan", "Grill"],
    Beverages: ["Soda", "Juice", "Water", "Wine"],
    Appetizers: ["Fries", "Soup", "Wings", "Dips"],
    "Household Items": ["Detergents", "Cleaners", "Tissues", "Soap"],
    Clothing: ["Men's Wear", "Women's Wear", "Kids' Wear"],
    Electronics: ["TVs", "Mobile Phones", "Laptops", "Tablets"],
    Groceries: ["Cereal", "Snacks", "Condiments", "Pasta"],
    "Coffee & Tea": ["Espresso", "Latte", "Green Tea", "Black Tea"],
    Pastries: ["Croissants", "Muffins", "Donuts", "Bagels"],
    Snacks: ["Chips", "Cookies", "Candy", "Granola Bars"],
  },
  products: {
    Fruits: [
      "Apple",
      "Banana",
      "Grapes",
      "Orange",
      "Pineapple",
      "Strawberry",
      "Blueberry",
    ],
    Vegetables: [
      "Carrot",
      "Potato",
      "Onion",
      "Tomato",
      "Spinach",
      "Cucumber",
      "Pepper",
    ],
    Organic: ["Organic Apple", "Organic Carrot", "Organic Lettuce"],
    Fish: ["Salmon", "Tuna", "Cod", "Mackerel", "Sardines", "Tilapia"],
    Beef: ["Steak", "Ground Beef", "Ribs", "Brisket"],
    Poultry: ["Chicken Breast", "Chicken Thigh", "Turkey", "Duck"],
    Lamb: ["Lamb Chops", "Ground Lamb", "Lamb Leg"],
    Milk: ["Whole Milk", "Skim Milk", "Almond Milk", "Soy Milk"],
    Cheese: ["Cheddar", "Mozzarella", "Parmesan", "Swiss", "Gouda"],
    Butter: ["Salted Butter", "Unsalted Butter", "Vegan Butter"],
    Yogurt: ["Greek Yogurt", "Plain Yogurt", "Flavored Yogurt"],
    Bread: ["Sourdough", "Baguette", "Rye", "Whole Wheat"],
    Cakes: ["Chocolate Cake", "Cheesecake", "Red Velvet Cake"],
    Pastries: ["Croissants", "Danish", "Eclairs", "Tarts"],
    Cookies: ["Chocolate Chip Cookies", "Oatmeal Cookies", "Macarons"],
    "Canned Goods": ["Canned Beans", "Canned Tomatoes", "Canned Peas"],
    "Frozen Foods": ["Frozen Pizza", "Frozen Vegetables", "Ice Cream"],
    Salad: ["Greek Salad", "Caesar Salad", "Garden Salad"],
    Vegan: ["Vegan Burger", "Vegan Nuggets", "Tofu Stir Fry"],
    Grill: ["Grilled Chicken", "Grilled Fish", "Grilled Vegetables"],
    Soda: ["Coca-Cola", "Pepsi", "Sprite", "Fanta"],
    Juice: ["Orange Juice", "Apple Juice", "Grape Juice", "Cranberry Juice"],
    Water: ["Still Water", "Sparkling Water", "Mineral Water"],
    Wine: ["Red Wine", "White Wine", "Rose Wine", "Champagne"],
    Fries: ["French Fries", "Sweet Potato Fries", "Curly Fries"],
    Soup: ["Tomato Soup", "Chicken Soup", "Mushroom Soup"],
    Wings: ["Buffalo Wings", "BBQ Wings", "Honey Garlic Wings"],
    Dips: ["Guacamole", "Hummus", "Salsa", "Cheese Dip"],
    Detergents: ["Laundry Detergent", "Dishwashing Liquid"],
    Cleaners: ["Multi-Surface Cleaner", "Window Cleaner"],
    Tissues: ["Facial Tissues", "Paper Towels"],
    Soap: ["Bar Soap", "Liquid Soap", "Hand Sanitizer"],
    "Men's Wear": ["T-Shirts", "Jeans", "Suits", "Jackets"],
    "Women's Wear": ["Dresses", "Blouses", "Skirts", "Jackets"],
    "Kids' Wear": ["Shirts", "Pants", "Shorts", "Dresses"],
    TVs: ["LED TV", "OLED TV", "4K TV"],
    "Mobile Phones": ["iPhone", "Samsung Galaxy", "Google Pixel"],
    Laptops: ["MacBook", "Dell XPS", "HP Spectre", "Lenovo ThinkPad"],
    Tablets: ["iPad", "Samsung Tab", "Microsoft Surface"],
    Cereal: ["Cornflakes", "Oats", "Granola", "Muesli"],
    Snacks: ["Chips", "Pretzels", "Popcorn", "Nuts"],
    Condiments: ["Ketchup", "Mustard", "Mayonnaise", "Hot Sauce"],
    Pasta: ["Spaghetti", "Penne", "Fusilli", "Linguine"],
    Espresso: ["Espresso Shot", "Double Espresso"],
    Latte: ["Vanilla Latte", "Caramel Latte"],
    "Green Tea": ["Sencha", "Matcha"],
    "Black Tea": ["Earl Grey", "English Breakfast"],
    Croissants: ["Plain Croissant", "Chocolate Croissant"],
    Muffins: ["Blueberry Muffin", "Chocolate Muffin"],
    Donuts: ["Glazed Donut", "Chocolate Donut"],
    Bagels: ["Plain Bagel", "Sesame Bagel"],
    Chips: ["Potato Chips", "Tortilla Chips", "Pita Chips"],
    Cookies: ["Sugar Cookies", "Oatmeal Raisin Cookies"],
    Candy: ["Gummy Bears", "Chocolate Bars", "Lollipops"],
    "Granola Bars": ["Peanut Butter Granola Bar", "Chocolate Chip Granola Bar"],
  },
};

const ManageStores = () => {
  const [storeType, setStoreType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleStoreTypeChange = (e) => {
    setStoreType(e.target.value);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedProducts([]);
  };

  const handleCategoryChange = (category) => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      // If category is deselected, remove its subcategories and products
      const filteredSubCategories = selectedSubCategories.filter(
        (subCategory) =>
          !dummyData.subCategories[category].includes(subCategory)
      );
      const filteredProducts = selectedProducts.filter(
        (product) =>
          !selectedSubCategories
            .filter((subCategory) =>
              dummyData.subCategories[category].includes(subCategory)
            )
            .some((subCategory) =>
              dummyData.products[subCategory]?.includes(product)
            )
      );
      setSelectedSubCategories(filteredSubCategories);
      setSelectedProducts(filteredProducts);
    }
    setSelectedCategories(
      isSelected
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories, category]
    );
  };

  const handleSubCategoryChange = (subCategory) => {
    const isSelected = selectedSubCategories.includes(subCategory);
    if (isSelected) {
      // If subcategory is deselected, remove its products
      const filteredProducts = selectedProducts.filter(
        (product) => !dummyData.products[subCategory]?.includes(product)
      );
      setSelectedProducts(filteredProducts);
    }
    setSelectedSubCategories(
      isSelected
        ? selectedSubCategories.filter((subCat) => subCat !== subCategory)
        : [...selectedSubCategories, subCategory]
    );
  };

  const handleProductChange = (product) => {
    const isSelected = selectedProducts.includes(product);
    setSelectedProducts(
      isSelected
        ? selectedProducts.filter((prod) => prod !== product)
        : [...selectedProducts, product]
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage Stores</h2>

      {/* Store Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Store Type</h3>
        <select
          value={storeType}
          onChange={handleStoreTypeChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Store Type</option>
          {dummyData.storeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Selection */}
      {storeType && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Categories</h3>
          <div className="flex flex-wrap gap-4">
            {dummyData.categories[storeType].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4"
                />
                <label htmlFor={category} className="text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories Selection */}
      {selectedCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Subcategories</h3>
          <div className="flex flex-wrap gap-4">
            {selectedCategories.flatMap((category) =>
              dummyData.subCategories[category].map((subCategory) => (
                <div key={subCategory} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={subCategory}
                    checked={selectedSubCategories.includes(subCategory)}
                    onChange={() => handleSubCategoryChange(subCategory)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={subCategory} className="text-gray-700">
                    {subCategory}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Products Selection */}
      {selectedSubCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Products</h3>
          <div className="flex flex-wrap gap-4">
            {selectedSubCategories.flatMap((subCategory) =>
              dummyData.products[subCategory].map((product) => (
                <div key={product} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={product}
                    checked={selectedProducts.includes(product)}
                    onChange={() => handleProductChange(product)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={product} className="text-gray-700">
                    {product}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Display Selected Products */}
      {selectedProducts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Selected Products</h3>
          <div>
            {selectedCategories.map((category) => (
              <div key={category}>
                <h4 className="font-semibold text-lg mt-4">{category}</h4>
                {selectedSubCategories
                  .filter((subCategory) =>
                    dummyData.subCategories[category].includes(subCategory)
                  )
                  .map((subCategory) => (
                    <div key={subCategory}>
                      <h5 className="font-medium mt-2">{subCategory}</h5>
                      <ul className="list-disc ml-6">
                        {selectedProducts
                          .filter((product) =>
                            dummyData.products[subCategory]?.includes(product)
                          )
                          .map((product) => (
                            <li key={product} className="text-gray-700">
                              {product}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStores;
