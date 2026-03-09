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
} from "lucide-react";

const ADMIN_PASSWORD = "admin123";
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type EntryStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

interface AppointmentEntry {
  id: string;
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

const STATUS_STYLES: Record<EntryStatus, { bg: string; color: string }> = {
  Pending:   { bg: "rgba(234,179,8,0.15)",   color: "#EAB308" },
  Confirmed: { bg: "rgba(79,110,247,0.15)",  color: "#4F6EF7" },
  Completed: { bg: "rgba(22,163,74,0.15)",   color: "#16A34A" },
  Cancelled: { bg: "rgba(239,68,68,0.15)",   color: "#EF4444" },
};

const STATUSES: EntryStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<"appointments" | "reservations">("appointments");
  const [appointments, setAppointments] = useState<AppointmentEntry[]>([]);
  const [reservations, setReservations] = useState<ReservationEntry[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsLoaded(true);
    const authed = sessionStorage.getItem("azerotech_admin_authed");
    if (authed === "true") setIsAuthenticated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([
      fetch("/api/appointments").then((r) => r.json()),
      fetch("/api/reservations").then((r) => r.json()),
    ]).then(([appts, resrvs]) => {
      /* eslint-disable react-hooks/set-state-in-effect */
      setAppointments(appts as AppointmentEntry[]);
      setReservations(resrvs as ReservationEntry[]);
      /* eslint-enable react-hooks/set-state-in-effect */
    });
  }, [isAuthenticated, refreshKey]);

  const loadData = () => setRefreshKey((k) => k + 1);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("azerotech_admin_authed", "true");
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
    setReservations((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const pendingCount =
    appointments.filter((a) => a.status === "Pending").length +
    reservations.filter((r) => r.status === "Pending").length;

  if (!isLoaded) return null;

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
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Appointments", value: appointments.length, color: "#4F6EF7", bg: "rgba(79,110,247,0.12)" },
            { label: "Reservations",  value: reservations.length,  color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
            { label: "Pending",       value: pendingCount,          color: "#EAB308", bg: "rgba(234,179,8,0.12)" },
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
          className="flex gap-2 mb-6"
        >
          {(["appointments", "reservations"] as const).map((tab) => {
            const active = activeTab === tab;
            const Icon = tab === "appointments" ? Wrench : ShoppingBag;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 capitalize"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #4F6EF7, #6B84FF)", color: "white", boxShadow: "0 4px 14px rgba(79,110,247,0.3)" }
                    : { background: "rgba(255,255,255,0.05)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                <Icon className="w-4 h-4" />
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "appointments" ? (
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
                  {appointments.map((appt, idx) => (
                    <motion.div
                      key={appt.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04, ease }}
                      className="rounded-2xl p-6"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {/* Header row */}
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
                        </div>
                        <StatusBadge status={appt.status} />
                      </div>

                      {/* Detail row */}
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

                      {/* Footer row */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-slate-500 text-xs">{formatSubmittedAt(appt.submittedAt)}</span>
                        <StatusSelect
                          value={appt.status}
                          onChange={(s) => updateAppointmentStatus(appt.id, s)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
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
                      {/* Header row */}
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

                      {/* Detail row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <Detail icon={<ShoppingBag className="w-3.5 h-3.5" />} label="Product" value={res.productName} />
                        <Detail icon={<span className="text-xs font-bold">₱</span>} label="Price" value={`₱${res.productPrice.toLocaleString()}`} />
                        <Detail icon={<CalendarDays className="w-3.5 h-3.5" />} label="Pickup Date" value={formatDate(res.pickupDate)} />
                        <Detail icon={<Clock className="w-3.5 h-3.5" />} label="Pickup Time" value={res.pickupTime} />
                      </div>

                      {/* Footer row */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-slate-500 text-xs">{formatSubmittedAt(res.submittedAt)}</span>
                        <StatusSelect
                          value={res.status}
                          onChange={(s) => updateReservationStatus(res.id, s)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
