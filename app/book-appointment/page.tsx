"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [confirmed, setConfirmed] = useState(false);

  const services = [
    "Phone Repair",
    "Laptop/Desktop Repair",
    "Device Checkup",
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    console.log("Appointment Data:", formData);
    // Here you would send the data to your backend
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    return twoWeeks.toISOString().split("T")[0];
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-dark to-indigo-900 pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center animate-fade-in">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Appointment Confirmed!
            </h1>
            <div className="bg-indigo-50 p-6 rounded-xl mb-8 text-left">
              <h2 className="text-lg font-semibold text-navy-dark mb-4">
                Your Appointment Details:
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Service:</strong> {formData.service}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(formData.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {formData.time}
                </p>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Device:</strong> {formData.brand} {formData.deviceType}
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Please arrive at your selected time. If you need to reschedule,
              call us at +63 912 345 6789.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn btn-primary">
                Back to Home
              </Link>
              <Link href="/accessories" className="btn btn-secondary">
                Browse Accessories
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-dark to-indigo-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-gray-300">
            Schedule your device checkup in 4 easy steps
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      step >= s
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>
                  <p className="text-sm font-semibold mt-2 text-center">
                    {[
                      "Service",
                      "Date & Time",
                      "Info",
                      "Confirm",
                    ][s - 1]}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-300 h-1 rounded-full">
              <div
                className="bg-indigo-600 h-1 rounded-full transition-all"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 text-navy-dark">
                  Step 1: Select Service
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, service }))
                      }
                      className={`p-6 text-left rounded-xl border-2 transition-all font-semibold text-lg ${
                        formData.service === service
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 hover:border-indigo-400"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl font-bold text-navy-dark">
                  Step 2: Choose Date & Time
                </h2>
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
                  />
                </div>
                {formData.date && (
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Select Time (30-minute slots):
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, time: slot }))
                          }
                          className={`p-3 rounded-lg font-semibold text-center transition-all ${
                            formData.time === slot
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Customer Info */}
            {step === 3 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl font-bold text-navy-dark">
                  Step 3: Your Information
                </h2>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="09XX XXX XXXX"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      Device Brand:
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g., Samsung"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      Device Type:
                    </label>
                    <select
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
                      required
                    >
                      <option value="">Select device type</option>
                      <option value="Phone">Phone</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Problem Description:
                  </label>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    placeholder="Describe the issue with your device"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-lg"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 text-navy-dark">
                  Step 4: Review & Confirm
                </h2>
                <div className="bg-indigo-50 p-8 rounded-xl border-2 border-indigo-200 space-y-4">
                  <div className="flex justify-between py-3 border-b border-indigo-200">
                    <span className="font-semibold text-gray-700">Service:</span>
                    <span className="text-navy-dark font-bold">
                      {formData.service}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-indigo-200">
                    <span className="font-semibold text-gray-700">
                      Date & Time:
                    </span>
                    <span className="text-navy-dark font-bold">
                      {new Date(formData.date).toLocaleDateString()} at{" "}
                      {formData.time}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-indigo-200">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-navy-dark font-bold">
                      {formData.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-indigo-200">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-navy-dark font-bold">
                      {formData.phone}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-indigo-200">
                    <span className="font-semibold text-gray-700">Device:</span>
                    <span className="text-navy-dark font-bold">
                      {formData.brand} {formData.deviceType}
                    </span>
                  </div>
                  <div className="py-3">
                    <span className="font-semibold text-gray-700">Problem:</span>
                    <p className="text-navy-dark mt-2">{formData.problem}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary mt-8 text-lg py-4"
                >
                  Confirm Appointment
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={step === 1}
                className="flex-1 btn btn-secondary disabled:opacity-50"
              >
                ← Previous
              </button>
              {step < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !formData.service) ||
                    (step === 2 && (!formData.date || !formData.time)) ||
                    (step === 3 &&
                      (!formData.name ||
                        !formData.phone ||
                        !formData.brand ||
                        !formData.deviceType ||
                        !formData.problem))
                  }
                  className="flex-1 btn btn-primary disabled:opacity-50"
                >
                  Next →
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-navy-dark/5 to-indigo-600/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <a
                href="tel:+639123456789"
                className="text-indigo-600 font-semibold"
              >
                +63 912 345 6789
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Message Us</h3>
              <a
                href="https://m.me/azerotech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold"
              >
                Chat on Messenger
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
