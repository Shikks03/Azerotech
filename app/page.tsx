"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Smartphone,
  Monitor,
  ShoppingBag,
  Zap,
  Shield,
  Clock3,
  Star,
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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #080B1A 0%, #0F1535 60%, #080B1A 100%)",
          minHeight: "92vh",
        }}
      >
        {/* Grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div
          className="absolute -top-32 -left-32 w-150 h-150 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #4F6EF7, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-100 h-100 rounded-full pointer-events-none"
          style={{
            opacity: 0.08,
            background: "radial-gradient(circle, #06B6D4, transparent 70%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-28 sm:py-36">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span
              className="inline-flex items-center gap-2 border rounded-full px-4 py-2 text-sm"
              style={{
                background: "rgba(79,110,247,0.15)",
                borderColor: "rgba(79,110,247,0.3)",
                color: "#8B9EFF",
                fontWeight: 500,
              }}
            >
              <MapPin className="w-3.5 h-3.5" />
              Imus, Cavite · Open 7 Days a Week
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.08)}
            className="text-white mb-6 max-w-3xl"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            We Fix What{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Matters Most
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.16)}
            className="text-slate-400 mb-10 max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
          >
            We repair phones, reformat laptops and computers, and offer
            affordable accessories — fast, reliable, and honest.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.24)}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center gap-2.5 text-white px-8 py-4 rounded-xl transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                fontWeight: 600,
                fontSize: "1.05rem",
                boxShadow: "0 8px 32px rgba(79,110,247,0.35)",
              }}
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+639000000000"
              className="inline-flex items-center justify-center gap-2.5 border text-white px-8 py-4 rounded-xl transition-all hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.15)",
                fontWeight: 500,
                fontSize: "1.05rem",
              }}
            >
              <Phone className="w-5 h-5" style={{ color: "#8B9EFF" }} />
              Call Shop
            </a>
            <a
              href="https://m.me/azerotech"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 text-white px-8 py-4 rounded-xl transition-all hover:opacity-90"
              style={{
                background: "#0084FF",
                fontWeight: 500,
                fontSize: "1.05rem",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Messenger
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            {...fadeUp(0.32)}
            className="flex flex-wrap justify-center gap-6 mt-14 text-sm"
            style={{ color: "#94A3B8" }}
          >
            {[
              { Icon: Shield, text: "Quality Guaranteed" },
              { Icon: Clock3, text: "Fast Turnaround" },
              { Icon: Star, text: "Trusted by Locals" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color: "#4F6EF7" }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path
              d="M0 64L1440 64L1440 32C1200 0 240 64 0 32L0 64Z"
              fill="#F7F8FF"
            />
          </svg>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 md:py-32" style={{ background: "#F7F8FF" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpView()} className="text-center mb-14">
            <span
              className="inline-block text-sm mb-3 uppercase tracking-widest"
              style={{ color: "#4F6EF7", fontWeight: 600 }}
            >
              What We Offer
            </span>
            <h2 className="text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>
              Our Main Services
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              From cracked screens to slow laptops — we handle it all at an
              affordable price.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Smartphone,
                title: "Phone Repair",
                desc: "LCD replacement, charging fix, button repair, reprogram, reformat, and more.",
                href: "/services#phone",
                color: "#4F6EF7",
                bg: "#EEF1FF",
                delay: 0,
              },
              {
                Icon: Monitor,
                title: "Laptop & Desktop",
                desc: "Full OS reformat and reinstallation for laptops and desktop computers.",
                href: "/services#laptop",
                color: "#06B6D4",
                bg: "#ECFEFF",
                delay: 0.08,
              },
              {
                Icon: ShoppingBag,
                title: "Accessories",
                desc: "Quality chargers, cables, earphones, keyboards, mice, and more in-store.",
                href: "/accessories",
                color: "#8B5CF6",
                bg: "#F5F3FF",
                delay: 0.16,
              },
            ].map((item) => (
              <motion.div key={item.title} {...fadeUpView(item.delay)}>
                <Link href={item.href}>
                  <div
                    className="flex flex-col h-full bg-white rounded-2xl p-8 border border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: item.bg }}
                    >
                      <item.Icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <h3
                      className="text-[#0F172A] mb-3"
                      style={{ fontSize: "1.2rem", fontWeight: 700 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">
                      {item.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm transition-all group-hover:gap-2.5"
                      style={{ color: item.color, fontWeight: 600 }}
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY AZEROTECH ─── */}
      <section className="py-24 md:py-32" style={{ background: "#080B1A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpView()} className="text-center mb-14">
            <span
              className="inline-block text-sm mb-3 uppercase tracking-widest"
              style={{ color: "#8B9EFF", fontWeight: 600 }}
            >
              Why AzeroTech
            </span>
            <h2 className="text-white" style={{ fontWeight: 700 }}>
              Repairs You Can Trust
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Zap,
                title: "Fast Service",
                desc: "Most repairs completed same day or within 24 hours.",
                delay: 0,
              },
              {
                Icon: Shield,
                title: "Quality Parts",
                desc: "We use quality replacement parts for long-lasting results.",
                delay: 0.06,
              },
              {
                Icon: Clock3,
                title: "Open Daily",
                desc: "We're open Monday to Sunday, 9AM to 7PM.",
                delay: 0.12,
              },
              {
                Icon: Star,
                title: "Affordable",
                desc: "Fair, transparent pricing with no hidden fees.",
                delay: 0.18,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                {...fadeUpView(item.delay)}
                className="rounded-2xl p-7 transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#4F6EF7]/25"
                  style={{ background: "rgba(79,110,247,0.15)" }}
                >
                  <item.Icon className="w-6 h-6" style={{ color: "#8B9EFF" }} />
                </div>
                <h4
                  className="text-white mb-2"
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section className="py-24 md:py-32" style={{ background: "#F7F8FF" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpView()} className="text-center mb-14">
            <span
              className="inline-block text-sm mb-3 uppercase tracking-widest"
              style={{ color: "#4F6EF7", fontWeight: 600 }}
            >
              Find Us
            </span>
            <h2 className="text-[#0F172A]" style={{ fontWeight: 700 }}>
              Visit Our Shop
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            {/* Location Cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <motion.div
                {...fadeUpView(0)}
                className="bg-white rounded-2xl p-7 border border-slate-100"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#EEF1FF] p-3 rounded-xl shrink-0">
                    <MapPin className="w-6 h-6 text-[#4F6EF7]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="text-[#0F172A]"
                        style={{ fontSize: "1.1rem", fontWeight: 700 }}
                      >
                        Main Branch
                      </h3>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{
                          background: "#DCFCE7",
                          color: "#15803D",
                          fontWeight: 600,
                        }}
                      >
                        Open
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      9WCC+FG Imus, Cavite
                    </p>
                    <a
                      href="https://maps.google.com/?q=9WCC+FG+Imus+Cavite"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm mt-3 hover:underline"
                      style={{ color: "#4F6EF7", fontWeight: 500 }}
                    >
                      Open in Maps <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeUpView(0.08)}
                className="bg-white rounded-2xl p-7 border border-slate-100"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl shrink-0">
                    <MapPin className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="text-[#0F172A]"
                        style={{ fontSize: "1.1rem", fontWeight: 700 }}
                      >
                        Branch 2
                      </h3>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{
                          background: "#F1F5F9",
                          color: "#64748B",
                          fontWeight: 600,
                        }}
                      >
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Address available locally. Not yet on Google Maps.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUpView(0.16)}>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                    fontWeight: 600,
                    boxShadow: "0 6px 24px rgba(79,110,247,0.25)",
                  }}
                >
                  Get Directions & Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Map */}
            <motion.div
              {...fadeUpView(0.1)}
              className="lg:col-span-3 bg-white rounded-2xl overflow-hidden border border-slate-100"
              style={{
                minHeight: "380px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <iframe
                title="AzeroTech Location – Imus, Cavite"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.5528615367586!2d120.9388385!3d14.4262198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d2ba9ebef455%3A0x6e8a0028eeb3dc89!2sImus%2C%20Cavite!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="py-24 text-center"
        style={{
          background: "linear-gradient(135deg, #080B1A 0%, #0F1535 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.h2
            {...fadeUpView()}
            className="text-white mb-4"
            style={{ fontWeight: 700 }}
          >
            Ready to Fix Your Device?
          </motion.h2>
          <motion.p {...fadeUpView(0.08)} className="text-slate-400 mb-8">
            Book your appointment now — it only takes a minute.
          </motion.p>
          <motion.div {...fadeUpView(0.16)}>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2.5 text-white px-8 py-4 rounded-xl transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4F6EF7, #6B84FF)",
                fontWeight: 600,
                fontSize: "1.05rem",
                boxShadow: "0 8px 32px rgba(79,110,247,0.35)",
              }}
            >
              Book an Appointment <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
