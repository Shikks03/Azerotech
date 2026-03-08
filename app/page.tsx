import Link from "next/link";
import WaveDivider from "@/components/WaveDivider";

export default function Home() {
  const services = [
    {
      icon: "📱",
      title: "Phone Repair",
      description: "LCD replacement, reformats, and more",
    },
    {
      icon: "💻",
      title: "Laptop/Desktop",
      description: "Professional reformatting services",
    },
    {
      icon: "🛍️",
      title: "Accessories",
      description: "Quality chargers, cables, and more",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-navy-dark via-navy-dark to-indigo-900 overflow-hidden pt-20">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />

          {/* Dot Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #4F6EF7 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10 animate-slide-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Devices,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              Professional phone repair, laptop reformat, and affordable
              accessories for all your device needs. Fast, reliable, and
              trustworthy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-appointment"
                className="btn btn-primary text-base md:text-lg"
              >
                📅 Book Appointment
              </Link>
              <a
                href="tel:+639123456789"
                className="btn btn-secondary text-base md:text-lg"
              >
                ☎️ Call Shop
              </a>
              <a
                href="https://m.me/azerotech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost text-base md:text-lg"
              >
                💬 Message
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex-1 h-96 md:h-full relative animate-slide-right">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-9xl md:text-8xl animate-pulse">📱</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What We <span className="text-indigo-600">Offer</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Complete solutions for all your device needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Link
                key={idx}
                href={
                  service.title === "Phone Repair"
                    ? "/services#phone"
                    : service.title === "Laptop/Desktop"
                      ? "/services#laptop"
                      : "/accessories"
                }
              >
                <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-navy-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="mt-4 text-indigo-600 font-semibold flex items-center gap-2">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Visit Our <span className="text-indigo-600">Locations</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            We're conveniently located in Imus, Cavite
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold mb-2">Main Location</h3>
              <p className="text-gray-600 mb-4">9WCC+FG Imus, Cavite</p>
              <iframe
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.4457556754836!2d120.93487762346017!3d14.328614385947328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d51b90000001%3A0x1234567890!2sImus%2C%20Cavite!5e0!3m2!1sen!2sph!4v1234567890"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-4">Store Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Sunday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Extended hours on holidays available upon request.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+639123456789"
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    ☎️ +63 912 345 6789
                  </a>
                  <a
                    href="https://m.me/azerotech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    💬 Message on Messenger
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-dark to-indigo-900 py-16 md:py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Your Device Fixed?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Book an appointment now and get your devices back in working order.
          </p>
          <Link href="/book-appointment" className="btn btn-primary text-lg">
            Schedule Now
          </Link>
        </div>
      </section>
    </>
  );
}
