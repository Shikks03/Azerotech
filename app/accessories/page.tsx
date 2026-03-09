"use client";

import { useState } from "react";

type EntryStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

interface ReservationEntry {
  id: string;
  type: "reservation";
  submittedAt: string;
  status: EntryStatus;
  name: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  productName: string;
  productPrice: number;
}
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ShoppingBag,
  X,
  Phone,
  ArrowLeft,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

const isPhoneValid = (v: string) => /^09\d{9}$/.test(v);

const products = [
  {
    id: 1,
    name: "Samsung Fast Charger",
    price: "₱450",
    category: "Chargers",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 2,
    name: "Type-C Data Cable",
    price: "₱250",
    category: "Cables",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 3,
    name: "32GB Memory Card",
    price: "₱350",
    category: "Memory",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 4,
    name: "Wireless Earphones",
    price: "₱1,200",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: "₱2,500",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 6,
    name: "USB Mouse",
    price: "₱450",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 7,
    name: "Tempered Glass",
    price: "₱300",
    category: "Protection",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop&auto=format&q=80",
  },
  {
    id: 8,
    name: "iPhone Charger",
    price: "₱550",
    category: "Chargers",
    image: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&h=400&fit=crop&auto=format&q=80",
  },
];

const categories = ["All", "Chargers", "Cables", "Memory", "Audio", "Peripherals", "Protection"];

const pickupTimes = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

type Product = typeof products[number];

export default function Accessories() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reservingProduct, setReservingProduct] = useState<Product | null>(null);
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
  });
  const [reserved, setReserved] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 11);
      setFormData((prev) => ({ ...prev, phone: digits }));
      if (digits.length > 0 && !digits.startsWith("09")) {
        setPhoneError("Phone number must start with 09.");
      } else if (digits.length > 0 && digits.length < 11) {
        setPhoneError("Phone number must be exactly 11 digits.");
      } else {
        setPhoneError("");
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const canSubmit =
    !!formData.name &&
    isPhoneValid(formData.phone) &&
    !!formData.pickupDate &&
    !!formData.pickupTime;

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !reservingProduct) return;
    const newEntry: ReservationEntry = {
      id: crypto.randomUUID(),
      type: "reservation",
      submittedAt: new Date().toISOString(),
      status: "Pending",
      name: formData.name,
      phone: formData.phone,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      productName: reservingProduct.name,
      productPrice: Number(reservingProduct.price.replace(/[₱,]/g, "")),
    };
    const existing: ReservationEntry[] = JSON.parse(
      localStorage.getItem("azerotech_reservations") ?? "[]"
    );
    localStorage.setItem("azerotech_reservations", JSON.stringify([...existing, newEntry]));
    setReserved(true);
  };

  const closeModal = () => {
    setReservingProduct(null);
    setReserved(false);
    setPhoneError("");
    setFormData({ name: "", phone: "", pickupDate: "", pickupTime: "" });
  };

  return (
    <div className="flex flex-col">

      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden flex flex-col justify-center"
        style={{
          background: "linear-gradient(135deg, #080B1A 0%, #0F1535 60%, #080B1A 100%)",
          minHeight: "50vh",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-150 h-150 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-100 h-100 rounded-full pointer-events-none"
          style={{ opacity: 0.08, background: "radial-gradient(circle, #A78BFA, transparent 70%)" }}
        />

        <div className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-24 pb-36 max-w-4xl mx-auto w-full">
          <motion.div {...fadeUp(0)} className="mb-10">
            <span
              className="inline-flex items-center gap-2 border rounded-full px-5 py-2.5 text-sm"
              style={{
                background: "rgba(139,92,246,0.15)",
                borderColor: "rgba(139,92,246,0.3)",
                color: "#C4B5FD",
                fontWeight: 500,
              }}
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              Available for Pickup · Imus, Cavite
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-white mb-6"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Shop{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Accessories
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-slate-400 max-w-md leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}
          >
            Quality tech accessories in stock — reserve online and pick up in-store.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 64L1440 64L1440 32C1200 0 240 64 0 32L0 64Z" fill="#F7F8FF" />
          </svg>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div
        className="sticky top-16 z-40 border-b border-slate-200"
        style={{ background: "rgba(247,248,255,0.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4">
          <div className="flex overflow-x-auto gap-2 pb-0.5 scrollbar-hide">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0"
                  style={
                    active
                      ? {
                          background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                        }
                      : {
                          background: "white",
                          color: "#475569",
                          border: "1px solid #E2E8F0",
                        }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── PRODUCTS GRID ─── */}
      <section className="py-12 md:py-16" style={{ background: "#F7F8FF" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg font-semibold">No products in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  {...fadeUpView(idx * 0.05)}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 group hover:border-transparent hover:shadow-xl transition-all duration-300"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-slate-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#8B5CF6" }}
                    >
                      {product.category}
                    </span>
                    <p className="text-[#0F172A] font-bold text-base leading-snug mb-1 flex-1">
                      {product.name}
                    </p>
                    <p className="text-xl font-bold mb-4" style={{ color: "#4F6EF7" }}>
                      {product.price}
                    </p>
                    <button
                      onClick={() => setReservingProduct(product)}
                      className="flex items-center justify-center gap-2 w-full text-white py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
                        boxShadow: "0 4px 14px rgba(139,92,246,0.3)",
                      }}
                    >
                      Reserve for Pickup <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="py-36 md:py-44"
        style={{ background: "linear-gradient(135deg, #080B1A 0%, #0F1535 100%)" }}
      >
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-6 gap-8">
          <motion.h2 {...fadeUpView()} className="text-white" style={{ fontWeight: 700 }}>
            Don&apos;t See What You Need?
          </motion.h2>
          <motion.p {...fadeUpView(0.08)} className="text-slate-400 max-w-sm">
            Call us and ask about other accessories we might have in stock.
          </motion.p>
          <motion.div
            {...fadeUpView(0.16)}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <a
              href="tel:+639123456789"
              className="inline-flex items-center gap-2.5 text-white px-8 py-4 rounded-xl transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                fontWeight: 600,
                fontSize: "1.05rem",
                boxShadow: "0 8px 32px rgba(79,110,247,0.35)",
              }}
            >
              <Phone className="w-5 h-5 shrink-0" />
              Call Us Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 border text-white px-8 py-4 rounded-xl transition-all hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.15)",
                fontWeight: 500,
                fontSize: "1.05rem",
              }}
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── RESERVATION MODAL ─── */}
      <AnimatePresence>
        {reservingProduct && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(8,11,26,0.75)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
            >
              {reserved ? (
                /* Success state */
                <div className="flex flex-col items-center text-center p-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "#DCFCE7" }}
                  >
                    <ShoppingBag className="w-7 h-7" style={{ color: "#16A34A" }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Reservation Confirmed!</h3>
                  <p className="text-slate-500 text-sm mb-2">
                    <span className="font-semibold text-[#0F172A]">{reservingProduct.name}</span> is reserved for you.
                  </p>
                  <p className="text-slate-500 text-sm mb-8">
                    Pickup on{" "}
                    <span className="font-semibold text-[#0F172A]">
                      {new Date(formData.pickupDate + "T00:00:00").toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })}
                    </span>{" "}
                    at <span className="font-semibold text-[#0F172A]">{formData.pickupTime}</span>.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #A78BFA)", boxShadow: "0 6px 20px rgba(139,92,246,0.3)" }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Form state */
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8B5CF6" }}>Reserve for Pickup</p>
                      <h3 className="text-[#0F172A] font-bold text-lg leading-tight">{reservingProduct.name}</h3>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmitReservation} className="px-7 py-6 space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                        Full Name <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400 text-sm"
                        onFocus={(e) => (e.target.style.borderColor = "#8B5CF6")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                        Phone Number <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="09XXXXXXXXX"
                        maxLength={11}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400 text-sm transition-colors"
                        style={{ borderColor: phoneError ? "#EF4444" : "#E2E8F0" }}
                        onFocus={(e) => { if (!phoneError) e.target.style.borderColor = "#8B5CF6"; }}
                        onBlur={(e) => { if (!phoneError) e.target.style.borderColor = "#E2E8F0"; }}
                      />
                      {phoneError && (
                        <p className="text-xs mt-1 font-medium" style={{ color: "#EF4444" }}>{phoneError}</p>
                      )}
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                          Pickup Date <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleInputChange}
                          min={getMinDate()}
                          className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] text-sm"
                          onFocus={(e) => (e.target.style.borderColor = "#8B5CF6")}
                          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                          Pickup Time <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                        <select
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] bg-white text-sm"
                          onFocus={(e) => (e.target.style.borderColor = "#8B5CF6")}
                          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                        >
                          <option value="">Select</option>
                          {pickupTimes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-semibold text-sm border-2 border-slate-200 text-slate-600 transition-all hover:bg-slate-50"
                      >
                        <ArrowLeft className="w-4 h-4 shrink-0" /> Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
                          boxShadow: canSubmit ? "0 4px 14px rgba(139,92,246,0.3)" : "none",
                        }}
                      >
                        Confirm Reservation <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
