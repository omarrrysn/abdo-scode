import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

// Enum for order statuses
const OrderStatus = {
  RECEIVED: "received",
  GATHERING: "gathering",
  ON_WAY: "on way",
  DONE: "done",
  CANCELED:"canceled"
};

// Mapping of status to Tailwind CSS classes
const statusStyles = {
  [OrderStatus.RECEIVED]: "bg-blue-500",
  [OrderStatus.GATHERING]: "bg-yellow-500",
  [OrderStatus.ON_WAY]: "bg-orange-500",
  [OrderStatus.DONE]: "bg-green-500",
  [OrderStatus.CANCELED]:"bg-slate-500"
};
const cardStatusStyles = {
  [OrderStatus.RECEIVED]: "bg-blue-500/10",
  [OrderStatus.GATHERING]: "bg-yellow-500/10",
  [OrderStatus.ON_WAY]: "bg-orange-500/10",
  [OrderStatus.DONE]: "bg-green-500/10",
  [OrderStatus.CANCELED]:"bg-slate-500/10 "
};

const getCardStatusStyle = (status) =>
  cardStatusStyles[status] || "bg-gray-500";
const getStatusStyle = (status) => statusStyles[status] || "bg-gray-500";

// Example orders data with timestamps, statuses, and item images
const ordersData = [
  {
    id: 1,
    time: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    status: OrderStatus.RECEIVED,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City, Country",
    },
    items: [
      { name: "Burger", price: 8, quantity: 2, image: "path_to_burger_image" },
      { name: "Fries", price: 3, quantity: 1, image: "path_to_fries_image" },
      { name: "Soda", price: 2, quantity: 2, image: "path_to_soda_image" },
    ],
  },
  {
    id: 2,
    time: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    status: OrderStatus.GATHERING,
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, Town, Country",
    },
    items: [
      { name: "Pizza", price: 12, quantity: 1, image: "path_to_pizza_image" },
      { name: "Salad", price: 6, quantity: 1, image: "path_to_salad_image" },
      { name: "Juice", price: 3, quantity: 2, image: "path_to_juice_image" },
    ],
  },
  {
    id: 3,
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: OrderStatus.DONE,
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "555-555-5555",
      address: "789 Oak St, Village, Country",
    },
    items: [
      { name: "Pasta", price: 10, quantity: 1, image: "path_to_pasta_image" },
      { name: "Garlic Bread", price: 4, quantity: 2, image: "path_to_garlic_bread_image" },
      { name: "Water", price: 1, quantity: 1, image: "path_to_water_image" },
    ],
  },
  {
    id: 4,
    time: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: OrderStatus.CANCELED,
    customer: {
      name: "Bob Williams",
      email: "bob@example.com",
      phone: "111-222-3333",
      address: "321 Pine St, City, Country",
    },
    items: [
      { name: "Tacos", price: 9, quantity: 3, image: "path_to_tacos_image" },
      { name: "Nachos", price: 5, quantity: 1, image: "path_to_nachos_image" },
      { name: "Soda", price: 2, quantity: 1, image: "path_to_soda_image" },
    ],
  },
  {
    id: 5,
    time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    status: OrderStatus.RECEIVED,
    customer: {
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "444-555-6666",
      address: "654 Maple St, Town, Country",
    },
    items: [
      { name: "Steak", price: 20, quantity: 1, image: "path_to_steak_image" },
      { name: "Mashed Potatoes", price: 5, quantity: 2, image: "path_to_mashed_potatoes_image" },
      { name: "Wine", price: 8, quantity: 1, image: "path_to_wine_image" },
    ],
  },
  // Additional Orders for more data
  {
    id: 6,
    time: new Date(Date.now() - 75 * 60 * 1000), // 1 hour 15 minutes ago
    status: OrderStatus.ON_WAY,
    customer: {
      name: "David King",
      email: "david@example.com",
      phone: "777-888-9999",
      address: "987 Cedar St, City, Country",
    },
    items: [
      { name: "Sushi", price: 15, quantity: 3, image: "path_to_sushi_image" },
      { name: "Miso Soup", price: 5, quantity: 2, image: "path_to_miso_soup_image" },
      { name: "Green Tea", price: 3, quantity: 1, image: "path_to_green_tea_image" },
    ],
  },
  {
    id: 7,
    time: new Date(Date.now() - 90 * 60 * 1000), // 1 hour 30 minutes ago
    status: OrderStatus.GATHERING,
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "333-444-5555",
      address: "123 Birch St, Town, Country",
    },
    items: [
      { name: "BBQ Chicken", price: 14, quantity: 1, image: "path_to_bbq_chicken_image" },
      { name: "Coleslaw", price: 4, quantity: 1, image: "path_to_coleslaw_image" },
      { name: "Iced Tea", price: 3, quantity: 2, image: "path_to_iced_tea_image" },
    ],
  },
  {
    id: 8,
    time: new Date(Date.now() - 105 * 60 * 1000), // 1 hour 45 minutes ago
    status: OrderStatus.RECEIVED,
    customer: {
      name: "Olivia White",
      email: "olivia@example.com",
      phone: "555-666-7777",
      address: "456 Maple St, Village, Country",
    },
    items: [
      { name: "Grilled Salmon", price: 18, quantity: 1, image: "path_to_grilled_salmon_image" },
      { name: "Asparagus", price: 6, quantity: 1, image: "path_to_asparagus_image" },
      { name: "Lemonade", price: 3, quantity: 1, image: "path_to_lemonade_image" },
    ],
  },
];


// All possible statuses
const allStatuses = [OrderStatus.RECEIVED, OrderStatus.GATHERING, OrderStatus.ON_WAY, OrderStatus.DONE];

function CashierPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(ordersData); // Manage orders state

  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left section: List of Orders */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <ul>
          {orders.map((order) => (
            <li
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`p-3 mb-2 rounded shadow cursor-pointer hover:bg-gray-200 ${getCardStatusStyle(
                order.status
              )}`}
            >
              <div className="flex justify-between items-center">
                <div>
                <p>
                    <strong>Customer:</strong> {order.customer.name}
                  </p>
                  <p>
                    <strong>Placed:</strong>
                    {formatDistanceToNow(order.time, { addSuffix: true })}
                  </p>
               
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold text-white ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase()+order.status.slice(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section: Order Details */}
      <div className="w-2/3 bg-white p-4 overflow-auto pr-8"> {/* Added pr-8 for spacing */}
        {selectedOrder ? (
          <>
            {/* Customer Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">Customer Info</h3>
              <p>
                <strong>Name:</strong> {selectedOrder.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.customer.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.customer.address}
              </p>
            </div>

            {/* Items Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">Items</h3>
              <ul className="list-disc list-inside">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover mr-2"
                    />
                    <div>
                      <p><strong>{item.name}</strong> - {item.description}</p>
                      <p>Qty: {item.quantity} @ ${item.price.toFixed(2)} each</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Receipt Card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-4">
              <h3 className="text-xl font-semibold mb-2">Receipt</h3>
              {(() => {
                const { subtotal, tax, total } = calculateTotal(selectedOrder.items);
                return (
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border-b-2 border-gray-300 p-2 text-left">Description</th>
                        <th className="border-b-2 border-gray-300 p-2 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="border-b border-gray-300 p-2">{item.name}</td>
                          <td className="border-b border-gray-300 p-2">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="font-semibold p-2">Subtotal</td>
                        <td className="font-semibold p-2">${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold p-2">Tax (10%)</td>
                        <td className="font-semibold p-2">${tax.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Total</td>
                        <td className="font-bold p-2">${total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })()}
            </div>

            {/* Status Badge and Status Selector */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Change Order Status:</h3>
              <div className="flex space-x-2 mt-2">
                {allStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(selectedOrder.id, status)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getStatusStyle(
                      status
                    )} ${
                      selectedOrder.status === status
                        ? "opacity-75"
                        : "opacity-100"
                    }`}
                    disabled={selectedOrder.status === status}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Select an order to view details</p>
        )}
      </div>
    </div>
  );
}

export default CashierPage;
