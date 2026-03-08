import Link from "next/link";

export default function Services() {
  const phoneServices = [
    { icon: "🔌", name: "LCD Replacement" },
    { icon: "💿", name: "Reformat" },
    { icon: "⚙️", name: "Reprogram" },
    { icon: "🎯", name: "Hang Logo Fix" },
    { icon: "🔄", name: "Auto Shutdown Fix" },
    { icon: "🔄", name: "Auto Restart Fix" },
    { icon: "🔋", name: "Not Charging Repair" },
    { icon: "🔊", name: "Volume Button Repair" },
    { icon: "🔘", name: "Power Button Repair" },
  ];

  const laptopServices = [
    { icon: "💻", name: "Full System Reformat" },
    { icon: "🔧", name: "Hardware Maintenance" },
    { icon: "⚡", name: "Performance Optimization" },
  ];

  const accessories = [
    "📱 Chargers",
    "📊 Data Cables",
    "💾 Memory Cards",
    "🎧 Earphones",
    "⌨️ Keyboard",
    "🖱️ Mouse",
    "🛡️ Tempered Glass",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-dark to-indigo-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl animate-fade-in">
            Professional repair and maintenance services for all your devices
          </p>
        </div>
      </section>

      {/* Phone Repair Services */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="phone" className="mb-8 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              📱 Phone <span className="text-indigo-600">Repair</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Expert phone repair services for all brands and models. We handle
              hardware replacements, software issues, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phoneServices.map((service, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <p className="text-lg font-semibold text-navy-dark">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laptop/Desktop Services */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="laptop" className="mb-8 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              💻 Laptop/Desktop <span className="text-indigo-600">Services</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Keep your computers running smoothly with our professional
              maintenance and software services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {laptopServices.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <p className="text-lg font-semibold text-navy-dark">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            🛍️ Accessories <span className="text-indigo-600">Available</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Quality accessories in stock for immediate pickup or reservation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {accessories.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200 text-center hover:shadow-lg transition-all duration-300"
              >
                <p className="text-2xl font-semibold text-navy-dark">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 md:p-12 rounded-2xl border border-indigo-200">
            <h3 className="text-2xl font-bold mb-4">Ready to Browse?</h3>
            <p className="text-gray-600 mb-6">
              Check out our full accessories catalog with images, prices, and
              reservation options.
            </p>
            <Link href="/accessories" className="btn btn-primary inline-flex">
              View Accessories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy-dark to-indigo-900 py-16 md:py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have Questions? Let's Help
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-appointment"
              className="btn btn-primary text-lg"
            >
              Book Service
            </Link>
            <Link href="/contact" className="btn btn-secondary text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
