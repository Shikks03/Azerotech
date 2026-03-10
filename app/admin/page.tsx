"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  LogOut,
  CalendarDays,
  Clock,
  User,
  Phone,
  Wrench,
  ShoppingBag,
  ClipboardList,
  RefreshCw,
  Package,
  Plus,
  Minus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const ADMIN_PASSWORD = "admin123";
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type EntryStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

interface AppointmentEntry {
  id: string;
  appointmentId?: string;
  type: "appointment";
  submittedAt: string;
  status: EntryStatus;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  brand: string;
  deviceType: string;
  problem?: string;
}

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

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  stock?: number;
}

const STATUS_STYLES: Record<EntryStatus, { bg: string; color: string }> = {
  Pending:   { bg: "rgba(234,179,8,0.15)",   color: "#EAB308" },
  Confirmed: { bg: "rgba(79,110,247,0.15)",  color: "#4F6EF7" },
  Completed: { bg: "rgba(22,163,74,0.15)",   color: "#16A34A" },
  Cancelled: { bg: "rgba(239,68,68,0.15)",   color: "#EF4444" },
};

const STATUSES: EntryStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

function stockLevel(stock: number | undefined): { color: string; bg: string; label: string } {
  if (stock === undefined) return { color: "#94A3B8", bg: "rgba(148,163,184,0.15)", label: "—" };
  if (stock === 0)  return { color: "#EF4444", bg: "rgba(239,68,68,0.15)",  label: "Out of Stock" };
  if (stock <= 5)   return { color: "#EAB308", bg: "rgba(234,179,8,0.15)",  label: "Low Stock" };
  return              { color: "#16A34A", bg: "rgba(22,163,74,0.15)",  label: "In Stock" };
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const initiallyAuthed =
    typeof window !== "undefined" &&
    sessionStorage.getItem("azerotech_admin_authed") === "true";

  const [isAuthenticated, setIsAuthenticated] = useState(initiallyAuthed);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<"appointments" | "reservations" | "inventory">("appointments");
  const [appointments, setAppointments] = useState<AppointmentEntry[]>([]);
  const [reservations, setReservations] = useState<ReservationEntry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apptSearch, setApptSearch] = useState("");
  // per-product manual stock input values
  const [stockInputs, setStockInputs] = useState<Record<number, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(initiallyAuthed);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([
      fetch("/api/appointments").then((r) => r.json()),
      fetch("/api/reservations").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ]).then(([appts, resrvs, prods]) => {
      setAppointments(appts as AppointmentEntry[]);
      setReservations(resrvs as ReservationEntry[]);
      setProducts(prods as Product[]);
      setLoading(false);
    });
  }, [isAuthenticated, refreshKey]);

  const loadData = () => setRefreshKey((k) => k + 1);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("azerotech_admin_authed", "true");
      setLoading(true);
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("azerotech_admin_authed");
    setIsAuthenticated(false);
    setPasswordInput("");
    setLoginError(false);
  };

  const updateAppointmentStatus = (id: string, status: EntryStatus) => {
    setAppointments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const updateReservationStatus = (id: string, status: EntryStatus) => {
    const reservation = reservations.find((r) => r.id === id);
    setReservations((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (reservation && reservation.status !== status) {
      if (status === "Completed") {
        setProducts((prev) =>
          prev.map((p) =>
            p.name === reservation.productName
              ? { ...p, stock: Math.max(0, (p.stock ?? 0) - 1) }
              : p
          )
        );
      } else if (reservation.status === "Completed") {
        setProducts((prev) =>
          prev.map((p) =>
            p.name === reservation.productName
              ? { ...p, stock: (p.stock ?? 0) + 1 }
              : p
          )
        );
      }
    }
  };

  const updateStock = (productId: number, newStock: number) => {
    if (newStock < 0) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
    fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });
  };

  const addProduct = async (data: { name: string; price: string; category: string; image: string; stock: number }) => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setShowAddModal(false);
    loadData();
  };

  const editProductInfo = async (id: number, data: { name: string; price: string; category: string; image: string }) => {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditingProduct(null);
    loadData();
  };

  const deleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setConfirmDeleteId(null);
    loadData();
  };

  const pendingCount =
    appointments.filter((a) => a.status === "Pending").length +
    reservations.filter((r) => r.status === "Pending").length;

  const outOfStockCount = products.filter((p) => p.stock === 0).length;


  /* ─── LOGIN SCREEN ─── */
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#080B1A" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="w-full max-w-sm bg-white rounded-2xl p-10"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
        >
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(79,110,247,0.12)" }}
            >
              <Lock className="w-7 h-7" style={{ color: "#4F6EF7" }} />
            </div>
            <h1 className="text-[#0F172A] text-2xl font-bold">Admin Access</h1>
            <p className="text-slate-400 text-sm mt-1">AzeroTech Internal Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400 transition-colors"
                style={{ borderColor: loginError ? "#EF4444" : "#E2E8F0" }}
                onFocus={(e) => { if (!loginError) e.target.style.borderColor = "#4F6EF7"; }}
                onBlur={(e) => { if (!loginError) e.target.style.borderColor = "#E2E8F0"; }}
              />
              {loginError && (
                <p className="text-sm mt-1.5 font-medium" style={{ color: "#EF4444" }}>
                  Incorrect password. Try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white py-3.5 rounded-xl font-semibold transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                boxShadow: "0 6px 20px rgba(79,110,247,0.3)",
              }}
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* ─── LOADING ─── */
  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "#080B1A" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-4 border-t-transparent"
          style={{ borderColor: "#4F6EF7", borderTopColor: "transparent" }}
        />
        <p className="text-slate-400 text-sm font-medium">Fetching data…</p>
      </div>
    );
  }

  /* ─── DASHBOARD ─── */
  return (
    <div className="min-h-screen" style={{ background: "#080B1A" }}>

      {/* Top Bar */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(8,11,26,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(79,110,247,0.15)" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(79,110,247,0.2)" }}
            >
              <Lock className="w-4 h-4" style={{ color: "#4F6EF7" }} />
            </div>
            <span className="text-white font-bold text-sm tracking-wide">AzeroTech Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8">

        {/* Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Appointments", value: appointments.length, color: "#4F6EF7" },
            { label: "Reservations",  value: reservations.length,  color: "#8B5CF6" },
            { label: "Pending",       value: pendingCount,          color: "#EAB308" },
            { label: "Out of Stock",  value: outOfStockCount,       color: "#EF4444" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tab Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease }}
          className="flex gap-2 mb-6 flex-wrap"
        >
          {(
            [
              { key: "appointments", Icon: Wrench,    label: "Appointments" },
              { key: "reservations", Icon: ShoppingBag, label: "Reservations" },
              { key: "inventory",    Icon: Package,   label: "Inventory" },
            ] as const
          ).map(({ key, Icon, label }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #4F6EF7, #6B84FF)", color: "white", boxShadow: "0 4px 14px rgba(79,110,247,0.3)" }
                    : { background: "rgba(255,255,255,0.05)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">

          {/* ── Appointments ── */}
          {activeTab === "appointments" && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
            >
              {appointments.length === 0 ? (
                <EmptyState label="appointments" detail="Appointments submitted from the booking form will appear here." />
              ) : (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Search by Appointment ID or name…"
                    value={apptSearch}
                    onChange={(e) => setApptSearch(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "white",
                    }}
                  />
                  {(() => {
                    const filtered = apptSearch.trim()
                      ? appointments.filter((a) => {
                          const q = apptSearch.trim().toLowerCase();
                          return (
                            (a.appointmentId ?? "").toLowerCase().includes(q) ||
                            a.name.toLowerCase().includes(q)
                          );
                        })
                      : appointments;
                    if (filtered.length === 0) {
                      return (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <p className="text-slate-400 font-semibold">No appointments match that ID.</p>
                        </div>
                      );
                    }
                    return filtered.map((appt, idx) => (
                    <motion.div
                      key={appt.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04, ease }}
                      className="rounded-2xl p-6"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 shrink-0" style={{ color: "#8B9EFF" }} />
                            <span className="text-white font-bold">{appt.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "#64748B" }} />
                            <span className="text-slate-400 text-sm">{appt.phone}</span>
                          </div>
                          {appt.appointmentId && (
                            <span
                              className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg mt-2 inline-block"
                              style={{
                                background: "rgba(79,110,247,0.12)",
                                color: "#8B9EFF",
                                border: "1px solid rgba(79,110,247,0.2)",
                              }}
                            >
                              {appt.appointmentId}
                            </span>
                          )}
                        </div>
                        <StatusBadge status={appt.status} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <Detail icon={<Wrench className="w-3.5 h-3.5" />} label="Service" value={appt.service} />
                        <Detail icon={<CalendarDays className="w-3.5 h-3.5" />} label="Date" value={formatDate(appt.date)} />
                        <Detail icon={<Clock className="w-3.5 h-3.5" />} label="Time" value={appt.time} />
                        <Detail icon={<User className="w-3.5 h-3.5" />} label="Device" value={`${appt.brand} ${appt.deviceType}`} />
                      </div>
                      {appt.problem && (
                        <div
                          className="rounded-xl px-4 py-3 mb-4 text-sm text-slate-300"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <span className="text-slate-500 font-medium mr-2">Problem:</span>{appt.problem}
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-slate-500 text-xs">{formatSubmittedAt(appt.submittedAt)}</span>
                        <StatusSelect value={appt.status} onChange={(s) => updateAppointmentStatus(appt.id, s)} />
                      </div>
                    </motion.div>
                  ));
                  })()}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Reservations ── */}
          {activeTab === "reservations" && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
            >
              {reservations.length === 0 ? (
                <EmptyState label="reservations" detail="Accessory reservations submitted from the shop will appear here." />
              ) : (
                <div className="flex flex-col gap-4">
                  {reservations.map((res, idx) => (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04, ease }}
                      className="rounded-2xl p-6"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 shrink-0" style={{ color: "#C4B5FD" }} />
                            <span className="text-white font-bold">{res.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "#64748B" }} />
                            <span className="text-slate-400 text-sm">{res.phone}</span>
                          </div>
                        </div>
                        <StatusBadge status={res.status} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <Detail icon={<ShoppingBag className="w-3.5 h-3.5" />} label="Product" value={res.productName} />
                        <Detail icon={<span className="text-xs font-bold">₱</span>} label="Price" value={`₱${res.productPrice.toLocaleString()}`} />
                        <Detail icon={<CalendarDays className="w-3.5 h-3.5" />} label="Pickup Date" value={formatDate(res.pickupDate)} />
                        <Detail icon={<Clock className="w-3.5 h-3.5" />} label="Pickup Time" value={res.pickupTime} />
                      </div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-slate-500 text-xs">{formatSubmittedAt(res.submittedAt)}</span>
                        <StatusSelect value={res.status} onChange={(s) => updateReservationStatus(res.id, s)} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Inventory ── */}
          {activeTab === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
            >
              {/* Inventory header */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-slate-400 text-sm font-semibold">
                  {products.length} product{products.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                    color: "white",
                    boxShadow: "0 4px 14px rgba(79,110,247,0.3)",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              {products.length === 0 ? (
                <EmptyState label="products" detail="No products yet. Click 'Add Product' to get started, or visit /api/products/seed to seed the database." />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product, idx) => {
                    const { color, bg, label } = stockLevel(product.stock);
                    const stock = product.stock ?? 0;
                    const inputVal = stockInputs[product.id] ?? String(stock);
                    const isConfirmingDelete = confirmDeleteId === product.id;
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.04, ease }}
                        className="rounded-2xl p-5 flex flex-col gap-4"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <span
                              className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md mb-1.5 inline-block"
                              style={{ background: "rgba(79,110,247,0.12)", color: "#8B9EFF" }}
                            >
                              #{String(product.id).padStart(3, "0")}
                            </span>
                            <p className="text-white font-bold text-sm leading-snug truncate">{product.name}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{product.category} · {product.price}</p>
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
                            style={{ background: bg, color }}
                          >
                            {label}
                          </span>
                        </div>

                        {/* Stock count display */}
                        <div
                          className="rounded-xl px-4 py-3 flex items-center justify-between"
                          style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33` }}
                        >
                          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Stock</span>
                          <span className="text-2xl font-bold" style={{ color }}>{stock}</span>
                        </div>

                        {/* +/- controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStock(product.id, stock - 1)}
                            disabled={stock <= 0}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
                            title="Remove 1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <input
                            type="number"
                            min={0}
                            value={inputVal}
                            onChange={(e) =>
                              setStockInputs((prev) => ({ ...prev, [product.id]: e.target.value }))
                            }
                            onBlur={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val) && val >= 0) {
                                updateStock(product.id, val);
                              }
                              setStockInputs((prev) => {
                                const next = { ...prev };
                                delete next[product.id];
                                return next;
                              });
                            }}
                            className="flex-1 text-center text-white font-bold rounded-xl py-2.5 focus:outline-none text-sm"
                            style={{
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          />

                          <button
                            onClick={() => updateStock(product.id, stock + 1)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                            style={{ background: "rgba(22,163,74,0.15)", color: "#16A34A" }}
                            title="Add 1"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quick-set buttons */}
                        <div className="flex gap-2">
                          {[5, 10, 20].map((n) => (
                            <button
                              key={n}
                              onClick={() => updateStock(product.id, n)}
                              className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                              style={{ background: "rgba(79,110,247,0.15)", color: "#8B9EFF" }}
                            >
                              Set {n}
                            </button>
                          ))}
                        </div>

                        {/* Edit / Remove actions */}
                        <div
                          className="flex gap-2 pt-1 border-t"
                          style={{ borderColor: "rgba(255,255,255,0.07)" }}
                        >
                          <button
                            onClick={() => { setEditingProduct(product); setConfirmDeleteId(null); }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                            style={{ background: "rgba(79,110,247,0.12)", color: "#8B9EFF" }}
                          >
                            <Pencil className="w-3 h-3" />
                            Edit Info
                          </button>
                          {isConfirmingDelete ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                                style={{ background: "rgba(239,68,68,0.2)", color: "#EF4444" }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                                style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8" }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(product.id)}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                              style={{ background: "rgba(239,68,68,0.10)", color: "#EF4444" }}
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Product modals */}
      {(() => {
        const categories = Array.from(new Set(products.map((p) => p.category))).sort();
        return (
          <AnimatePresence>
            {showAddModal && (
              <ProductFormModal
                key="add-modal"
                title="Add Product"
                initial={{ name: "", price: "", category: "", image: "", stock: 0 }}
                categories={categories}
                showStock
                onSubmit={addProduct}
                onClose={() => setShowAddModal(false)}
              />
            )}
            {editingProduct && (
              <ProductFormModal
                key="edit-modal"
                title="Save Changes"
                initial={{
                  name: editingProduct.name,
                  price: editingProduct.price,
                  category: editingProduct.category,
                  image: editingProduct.image,
                }}
                categories={categories}
                showStock={false}
                onSubmit={(data) => editProductInfo(editingProduct.id, data)}
                onClose={() => setEditingProduct(null)}
              />
            )}
          </AnimatePresence>
        );
      })()}
    </div>
  );
}

function StatusBadge({ status }: { status: EntryStatus }) {
  const { bg, color } = STATUS_STYLES[status];
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
      style={{ background: bg, color }}
    >
      {status}
    </span>
  );
}

function StatusSelect({ value, onChange }: { value: EntryStatus; onChange: (s: EntryStatus) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as EntryStatus)}
      className="px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: STATUS_STYLES[value].color,
      }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} style={{ background: "#0F1535", color: STATUS_STYLES[s].color }}>
          {s}
        </option>
      ))}
    </select>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="rounded-xl px-3 py-2.5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-1.5 mb-1 text-slate-500">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-white text-sm font-semibold truncate">{value}</p>
    </div>
  );
}

function EmptyState({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <ClipboardList className="w-12 h-12 mb-4 opacity-20 text-white" />
      <p className="text-slate-300 font-semibold text-lg mb-2">No {label} yet</p>
      <p className="text-slate-500 text-sm max-w-xs">{detail}</p>
    </div>
  );
}

type ProductFormData = { name: string; price: string; category: string; image: string; stock: number };

function ProductFormModal({
  title,
  initial,
  categories,
  showStock,
  onSubmit,
  onClose,
}: {
  title: string;
  initial: Partial<ProductFormData>;
  categories: string[];
  showStock: boolean;
  onSubmit: (data: ProductFormData) => void;
  onClose: () => void;
}) {
  const initialCategory = initial.category ?? "";
  const isExisting = categories.includes(initialCategory);

  const [name, setName] = useState(initial.name ?? "");
  // category select value: existing category or "other"
  const [categorySelect, setCategorySelect] = useState(
    initialCategory && !isExisting ? "other" : initialCategory
  );
  const [customCategory, setCustomCategory] = useState(
    initialCategory && !isExisting ? initialCategory : ""
  );
  // price: strip ₱ prefix from stored value
  const [price, setPrice] = useState(
    (initial.price ?? "").replace(/^₱/, "").trim()
  );
  const [image, setImage] = useState(initial.image ?? "");
  const [stock, setStock] = useState(String(initial.stock ?? 0));

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  const resolvedCategory = categorySelect === "other" ? customCategory.trim() : categorySelect;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !resolvedCategory || !price) return;
    onSubmit({
      name: name.trim(),
      price: `₱${price}`,
      category: resolvedCategory,
      image: image.trim(),
      stock: parseInt(stock) || 0,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: "#0D1225",
          border: "1px solid rgba(79,110,247,0.25)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Samsung Fast Charger"
              className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none placeholder:text-slate-600"
              style={inputStyle}
            />
          </div>

          {/* Category — dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={categorySelect}
              onChange={(e) => setCategorySelect(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none cursor-pointer"
              style={{ ...inputStyle, color: categorySelect ? "white" : "#475569" }}
            >
              <option value="" disabled style={{ background: "#0D1225" }}>Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: "#0D1225" }}>{c}</option>
              ))}
              <option value="other" style={{ background: "#0D1225" }}>Other…</option>
            </select>
            {categorySelect === "other" && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter new category"
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none placeholder:text-slate-600 mt-2"
                style={inputStyle}
                autoFocus
              />
            )}
          </div>

          {/* Price — number with ₱ prefix */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Price
            </label>
            <div
              className="flex items-center rounded-xl overflow-hidden"
              style={inputStyle}
            >
              <span
                className="pl-4 pr-2 py-3 text-sm font-bold select-none"
                style={{ color: "#8B9EFF" }}
              >
                ₱
              </span>
              <input
                type="number"
                min={0}
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="450"
                className="flex-1 pr-4 py-3 bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none placeholder:text-slate-600"
              style={inputStyle}
            />
          </div>

          {/* Initial Stock (Add only) */}
          {showStock && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Initial Stock
              </label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none"
                style={inputStyle}
              />
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                color: "white",
                boxShadow: "0 4px 14px rgba(79,110,247,0.3)",
              }}
            >
              {title}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
