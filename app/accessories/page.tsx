"use client";

import { useState } from "react";
import Link from "next/link";

export default function Accessories() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reservingProduct, setReservingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
  });

  const products = [
    {
      id: 1,
      name: "Samsung Fast Charger",
      price: "₱450",
      category: "Chargers",
      image: "🔌",
    },
    {
      id: 2,
      name: "Type-C Data Cable",
      price: "₱250",
      category: "Cables",
      image: "📊",
    },
    {
      id: 3,
      name: "32GB Memory Card",
      price: "₱350",
      category: "Memory",
      image: "💾",
    },
    {
      id: 4,
      name: "Wireless Earphones",
      price: "₱1,200",
      category: "Audio",
      image: "🎧",
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      price: "₱2,500",
      category: "Peripherals",
      image: "⌨️",
    },
    {
      id: 6,
      name: "USB Mouse",
      price: "₱450",
      category: "Peripherals",
      image: "🖱️",
    },
    {
      id: 7,
      name: "Tempered Glass",
      price: "₱300",
      category: "Protection",
      image: "🛡️",
    },
    {
      id: 8,
      name: "iPhone Charger",
      price: "₱550",
      category: "Chargers",
      image: "🔌",
    },
  ];

  const categories = [
    "All",
    "Chargers",
    "Cables",
    "Memory",
    "Audio",
    "Peripherals",
    "Protection",
  ];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleReserve = (productId: string) => {
    setReservingProduct(productId);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id.toString() === reservingProduct);
    console.log("Reservation:", { product, ...formData });
    alert(
      `Reservation successful! We'll prepare ${product?.name} for pickup on ${formData.pickupDate} at ${formData.pickupTime}.`
    );
    setReservingProduct(null);
    setFormData({ name: "", phone: "", pickupDate: "", pickupTime: "" });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-dark to-indigo-900 text-white pt-40 pb-28 md:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shop <span className="text-indigo-300">Accessories</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Quality products available for pickup
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white py-8 sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search accessories..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
            />
            <div className="flex overflow-x-auto gap-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <p className="text-xs text-indigo-600 font-semibold mb-2">
                  {product.category}
                </p>
                <h3 className="text-lg font-bold text-navy-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-indigo-600 mb-4">
                  {product.price}
                </p>
                <button
                  onClick={() => handleReserve(product.id.toString())}
                  className="w-full btn btn-primary"
                >
                  Reserve for Pickup
                </button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-600">
                No products in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Reservation Modal */}
      {reservingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Reserve for Pickup</h2>
            <p className="text-gray-600 mb-6">
              {products.find((p) => p.id.toString() === reservingProduct)?.name}
            </p>

            <form onSubmit={handleSubmitReservation} className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="09XX XXX XXXX"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Pickup Date:
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Pickup Time:
                </label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setReservingProduct(null)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn btn-primary">
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="bg-gradient-to-r from-navy-dark to-indigo-900 py-24 md:py-32 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Dont See What You Need?</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Call us and ask about other accessories we might have in stock!
          </p>
          <a href="tel:+639123456789" className="btn btn-primary text-lg">
            Call Us Now
          </a>
        </div>
      </section>
    </>
  );
}
