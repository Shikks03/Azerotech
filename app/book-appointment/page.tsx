"use client";

import { useState } from "react";

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
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
  CheckCircle2,
  Phone,
  MessageCircle,
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

const services = [
  {
    id: "phone",
    label: "Phone Repair",
    desc: "LCD, charging, buttons, reformat & more",
    color: "#4F6EF7",
    bg: "#EEF1FF",
  },
  {
    id: "laptop",
    label: "Laptop / Desktop Repair",
    desc: "OS reformat, hardware maintenance & tuning",
    color: "#06B6D4",
    bg: "#EEF1FF",
  },
  {
    id: "checkup",
    label: "Device Checkup",
    desc: "General diagnostics and assessment",
    color: "#8B5CF6",
    bg: "#EEF1FF",
  },
];

const timeSlots = [
  "9:00 AM",  "9:30 AM",
  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM",
  "1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",
  "4:00 PM",  "4:30 PM",
  "5:00 PM",  "5:30 PM",
];

const steps = [
  { n: 1, label: "Service",    Icon: CheckCircle2 },
  { n: 2, label: "Date & Time", Icon: CalendarDays },
  { n: 3, label: "Your Info",  Icon: User },
  { n: 4, label: "Confirm",    Icon: CheckCircle2 },
];

const isPhoneValid = (v: string) => /^09\d{9}$/.test(v);

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    brand: "",
    deviceType: "",
    problem: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const getMaxDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  };

  const canProceed = () => {
    if (step === 1) return !!formData.service;
    if (step === 2) return !!formData.date && !!formData.time;
    if (step === 3)
      return (
        !!formData.name &&
        isPhoneValid(formData.phone) &&
        !!formData.brand &&
        !!formData.deviceType
      );
    return true;
  };

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: AppointmentEntry = {
      id: crypto.randomUUID(),
      type: "appointment",
      submittedAt: new Date().toISOString(),
      status: "Pending",
      service: formData.service,
      date: formData.date,
      time: formData.time,
      name: formData.name,
      phone: formData.phone,
      brand: formData.brand,
      deviceType: formData.deviceType,
      ...(formData.problem ? { problem: formData.problem } : {}),
    };
    const existing: AppointmentEntry[] = JSON.parse(
      localStorage.getItem("azerotech_appointments") ?? "[]"
    );
    localStorage.setItem("azerotech_appointments", JSON.stringify([...existing, newEntry]));
    setConfirmed(true);
  };

  const formatDate = (iso: string) =>
    iso
      ? new Date(iso + "T00:00:00").toLocaleDateString("en-PH", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  /* ─── SUCCESS SCREEN ─── */
  if (confirmed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6 py-24"
        style={{ background: "linear-gradient(135deg, #080B1A 0%, #0F1535 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease }}
          className="w-full max-w-lg bg-white rounded-2xl p-10 text-center"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#DCFCE7" }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: "#16A34A" }} />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Appointment Confirmed!</h1>
          <p className="text-slate-500 mb-8 text-sm">
            Please arrive at your selected time. Need to reschedule? Call us.
          </p>

          <div
            className="rounded-xl p-6 text-left mb-8 space-y-3"
            style={{ background: "#F7F8FF", border: "1px solid #E2E8F0" }}
          >
            {[
              ["Service",    formData.service],
              ["Date",       formatDate(formData.date)],
              ["Time",       formData.time],
              ["Name",       formData.name],
              ["Phone",      formData.phone],
              ["Device",     `${formData.brand} ${formData.deviceType}`],
              ...(formData.problem ? [["Problem", formData.problem] as [string, string]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 text-sm">
                <span className="text-slate-500 font-medium shrink-0">{k}</span>
                <span className="text-[#0F172A] font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4F6EF7, #6B84FF)", boxShadow: "0 6px 20px rgba(79,110,247,0.3)" }}
            >
              Back to Home
            </Link>
            <Link
              href="/accessories"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all hover:bg-slate-100 border border-slate-200 text-[#0F172A]"
            >
              Browse Accessories
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ─── MAIN PAGE ─── */
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
          style={{ background: "radial-gradient(circle, #4F6EF7, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-100 h-100 rounded-full pointer-events-none"
          style={{ opacity: 0.08, background: "radial-gradient(circle, #06B6D4, transparent 70%)" }}
        />

        <div className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-24 pb-36 max-w-4xl mx-auto w-full">
          <motion.div {...fadeUp(0)} className="mb-10">
            <span
              className="inline-flex items-center gap-2 border rounded-full px-5 py-2.5 text-sm"
              style={{
                background: "rgba(79,110,247,0.15)",
                borderColor: "rgba(79,110,247,0.3)",
                color: "#8B9EFF",
                fontWeight: 500,
              }}
            >
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              4 Easy Steps
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.08)}
            className="text-white mb-6"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Book an{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Appointment
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="text-slate-400 max-w-md leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}
          >
            Schedule your device repair or checkup in just a few steps.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 64L1440 64L1440 32C1200 0 240 64 0 32L0 64Z" fill="#F7F8FF" />
          </svg>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="py-16 md:py-24" style={{ background: "#F7F8FF" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10">

          {/* Stepper */}
          <motion.div {...fadeUpView()} className="mb-12">
            <div className="flex items-center justify-between gap-2 mb-5">
              {steps.map((s, idx) => (
                <div key={s.n} className="flex items-center flex-1">
                  <div className="flex flex-col items-center w-full">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                      style={
                        step >= s.n
                          ? { background: "linear-gradient(135deg, #4F6EF7, #6B84FF)", color: "white", boxShadow: "0 4px 12px rgba(79,110,247,0.35)" }
                          : { background: "#E2E8F0", color: "#94A3B8" }
                      }
                    >
                      {s.n}
                    </div>
                    <p
                      className="text-xs font-semibold mt-2 text-center"
                      style={{ color: step >= s.n ? "#4F6EF7" : "#94A3B8" }}
                    >
                      {s.label}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-300"
                      style={{ background: step > s.n ? "#4F6EF7" : "#E2E8F0" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            {...fadeUpView(0.08)}
            className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
          >
            <form onSubmit={handleSubmit}>

              {/* ── Step 1: Service ── */}
              {step === 1 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#4F6EF7" }}>Step 1 of 4</p>
                  <h2 className="text-[#0F172A] text-2xl font-bold mb-6">Select a Service</h2>
                  <div className="flex flex-col gap-4">
                    {services.map((svc) => {
                      const selected = formData.service === svc.label;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, service: svc.label }))}
                          className="flex items-center gap-5 text-left rounded-xl px-6 py-5 border-2 transition-all duration-200"
                          style={
                            selected
                              ? { borderColor: svc.color, background: svc.bg }
                              : { borderColor: "#E2E8F0", background: "white" }
                          }
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: svc.bg }}
                          >
                            <CheckCircle2
                              className="w-5 h-5"
                              style={{ color: selected ? svc.color : "#CBD5E1" }}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-[#0F172A]">{svc.label}</p>
                            <p className="text-slate-500 text-sm">{svc.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 2: Date & Time ── */}
              {step === 2 && (
                <div className="space-y-7">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#4F6EF7" }}>Step 2 of 4</p>
                    <h2 className="text-[#0F172A] text-2xl font-bold">Choose Date & Time</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      <CalendarDays className="inline w-4 h-4 mr-1.5 mb-0.5" style={{ color: "#4F6EF7" }} />
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A]"
                      style={{ fontSize: "1rem" }}
                      onFocus={(e) => (e.target.style.borderColor = "#4F6EF7")}
                      onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                    />
                  </div>

                  {formData.date && (
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                        <Clock className="inline w-4 h-4 mr-1.5 mb-0.5" style={{ color: "#4F6EF7" }} />
                        Select Time Slot
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => {
                          const selected = formData.time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, time: slot }))}
                              className="py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 border-2"
                              style={
                                selected
                                  ? { background: "linear-gradient(135deg, #4F6EF7, #6B84FF)", color: "white", borderColor: "transparent", boxShadow: "0 4px 12px rgba(79,110,247,0.3)" }
                                  : { background: "#F7F8FF", color: "#475569", borderColor: "#E2E8F0" }
                              }
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 3: Your Info ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#4F6EF7" }}>Step 3 of 4</p>
                    <h2 className="text-[#0F172A] text-2xl font-bold">Your Information</h2>
                  </div>

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
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400"
                      onFocus={(e) => (e.target.style.borderColor = "#4F6EF7")}
                      onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                    />
                  </div>

                  {/* Phone Number */}
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
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400 transition-colors"
                      style={{ borderColor: phoneError ? "#EF4444" : "#E2E8F0" }}
                      onFocus={(e) => { if (!phoneError) e.target.style.borderColor = "#4F6EF7"; }}
                      onBlur={(e) => { if (!phoneError) e.target.style.borderColor = "#E2E8F0"; }}
                    />
                    {phoneError && (
                      <p className="text-sm mt-1.5 font-medium" style={{ color: "#EF4444" }}>
                        {phoneError}
                      </p>
                    )}
                    {!phoneError && formData.phone.length > 0 && (
                      <p className="text-xs mt-1.5 text-slate-400">
                        {formData.phone.length} / 11 digits
                      </p>
                    )}
                  </div>

                  {/* Brand + Device Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                        Device Brand <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="e.g., Samsung"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400"
                        onFocus={(e) => (e.target.style.borderColor = "#4F6EF7")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                        Device Type <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                      <select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] bg-white"
                        onFocus={(e) => (e.target.style.borderColor = "#4F6EF7")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                      >
                        <option value="">Select type</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                      </select>
                    </div>
                  </div>

                  {/* Problem (optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                      Problem Description <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      name="problem"
                      value={formData.problem}
                      onChange={handleInputChange}
                      placeholder="Describe the issue with your device"
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none text-[#0F172A] placeholder:text-slate-400 resize-none"
                      onFocus={(e) => (e.target.style.borderColor = "#4F6EF7")}
                      onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                    />
                  </div>
                </div>
              )}

              {/* ── Step 4: Review ── */}
              {step === 4 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#4F6EF7" }}>Step 4 of 4</p>
                  <h2 className="text-[#0F172A] text-2xl font-bold mb-6">Review & Confirm</h2>

                  <div
                    className="rounded-xl overflow-hidden mb-8"
                    style={{ border: "1px solid #E2E8F0" }}
                  >
                    {[
                      ["Service",    formData.service],
                      ["Date",       formatDate(formData.date)],
                      ["Time",       formData.time],
                      ["Name",       formData.name],
                      ["Phone",      formData.phone],
                      ["Device",     `${formData.brand} ${formData.deviceType}`],
                      ...(formData.problem ? [["Problem", formData.problem] as [string, string]] : []),
                    ].map(([k, v], idx, arr) => (
                      <div
                        key={k}
                        className="flex justify-between gap-4 px-6 py-4 text-sm"
                        style={{
                          background: idx % 2 === 0 ? "#F7F8FF" : "white",
                          borderBottom: idx < arr.length - 1 ? "1px solid #E2E8F0" : "none",
                        }}
                      >
                        <span className="text-slate-500 font-medium shrink-0">{k}</span>
                        <span className="text-[#0F172A] font-semibold text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 text-white py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                      boxShadow: "0 8px 24px rgba(79,110,247,0.35)",
                    }}
                  >
                    Confirm Appointment <ArrowRight className="w-5 h-5 shrink-0" />
                  </button>
                </div>
              )}

              {/* Navigation */}
              {step < 4 && (
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border-2 border-slate-200 text-slate-600 transition-all hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" /> Previous
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                      boxShadow: canProceed() ? "0 6px 20px rgba(79,110,247,0.3)" : "none",
                    }}
                  >
                    Next <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              )}

              {step === 4 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 border-slate-200 text-slate-600 transition-all hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" /> Go Back
                </button>
              )}

            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── NEED HELP ─── */}
      <section className="py-16 md:py-24" style={{ background: "#080B1A" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10">
          <motion.div {...fadeUpView()} className="flex flex-col items-center text-center mb-10">
            <span className="inline-block text-sm mb-4 uppercase tracking-widest font-semibold" style={{ color: "#8B9EFF" }}>
              Need Help?
            </span>
            <h2 className="text-white font-bold">Reach Out Directly</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                Icon: Phone,
                label: "Call Us",
                detail: "+63 912 345 6789",
                href: "tel:+639123456789",
                accentBg: "rgba(79,110,247,0.15)",
                accentColor: "#8B9EFF",
              },
              {
                Icon: MessageCircle,
                label: "Messenger",
                detail: "Chat on Messenger",
                href: "https://m.me/azerotech",
                accentBg: "rgba(0,132,255,0.15)",
                accentColor: "#60A5FA",
              },
            ].map((item, idx) => (
              <motion.a
                key={item.label}
                {...fadeUpView(idx * 0.08)}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: item.accentBg }}
                >
                  <item.Icon className="w-5 h-5" style={{ color: item.accentColor }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="font-bold" style={{ color: item.accentColor }}>{item.detail}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
