import Link from "next/link";

export default function Contact() {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });

  const hours = [
    { day: "Monday", time: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
    { day: "Thursday", time: "9:00 AM - 6:00 PM" },
    { day: "Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 5:00 PM" },
    { day: "Sunday", time: "10:00 AM - 5:00 PM" },
  ];

  const isToday = (day: string) => day === dayOfWeek;

  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us",
      description: "Available during store hours",
      contact: "+63 912 345 6789",
      link: "tel:+639123456789",
    },
    {
      icon: "💬",
      title: "Messenger",
      description: "Chat with us anytime",
      contact: "AzeroTech",
      link: "https://m.me/azerotech",
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Main location in Imus, Cavite",
      contact: "9WCC+FG Imus, Cavite",
      link: "https://maps.google.com/?q=imus+cavite",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-dark to-indigo-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-indigo-300">Touch</span>
          </h1>
          <p className="text-xl text-gray-300">
            We're here to help with all your device needs
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.link}
                target={method.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-6xl mb-4">{method.icon}</div>
                <h3 className="text-2xl font-bold text-navy-dark mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-lg font-semibold text-indigo-600">
                  {method.contact}
                </p>
                <div className="mt-4 text-indigo-600 font-semibold flex items-center justify-center gap-2">
                  {method.title === "Call Us" && "Call Now →"}
                  {method.title === "Messenger" && "Message Now →"}
                  {method.title === "Visit Us" && "Get Directions →"}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Store Hours */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Store <span className="text-indigo-600">Hours</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Plan your visit or reach out during these times
          </p>

          <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-navy-dark to-indigo-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Day</th>
                    <th className="px-6 py-4 text-left font-bold">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map((hour, idx) => (
                    <tr
                      key={idx}
                      className={`border-t border-gray-200 ${
                        isToday(hour.day)
                          ? "bg-indigo-50 font-bold"
                          : idx % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-navy-dark font-semibold">
                        {hour.day}
                        {isToday(hour.day) && (
                          <span className="ml-2 inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                            Today
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-navy-dark">
                        {hour.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Extended hours on holidays available upon request. Call us to confirm!
          </p>
        </div>
      </section>

      {/* Information Sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* FAQ */}
            <div>
              <h3 className="text-2xl font-bold text-navy-dark mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="bg-gray-50 p-4 rounded-lg group">
                  <summary className="font-semibold text-navy-dark cursor-pointer hover:text-indigo-600">
                    How long does a typical repair take?
                  </summary>
                  <p className="text-gray-600 mt-3">
                    Most repairs take 1-3 hours depending on the issue. We'll
                    give you an estimate when you bring in your device.
                  </p>
                </details>

                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-semibold text-navy-dark cursor-pointer hover:text-indigo-600">
                    Do you offer warranty?
                  </summary>
                  <p className="text-gray-600 mt-3">
                    Yes! All repairs come with a 30-day warranty. If the same
                    issue occurs, we'll fix it for free.
                  </p>
                </details>

                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-semibold text-navy-dark cursor-pointer hover:text-indigo-600">
                    Can I drop off my device and come back later?
                  </summary>
                  <p className="text-gray-600 mt-3">
                    Absolutely! You can drop off your device and we'll call you
                    when it's ready for pickup.
                  </p>
                </details>

                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="font-semibold text-navy-dark cursor-pointer hover:text-indigo-600">
                    What payment methods do you accept?
                  </summary>
                  <p className="text-gray-600 mt-3">
                    We accept cash, credit cards, debit cards, and online
                    transfers. Payment is made at the shop when you pick up
                    your device.
                  </p>
                </details>
              </div>
            </div>

            {/* Service Area */}
            <div>
              <h3 className="text-2xl font-bold text-navy-dark mb-6">
                About AzeroTech
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  AzeroTech is your trusted local repair shop serving the Imus,
                  Cavite community with professional device repair services and
                  quality accessories.
                </p>

                <p>
                  <strong>Our Mission:</strong> To provide fast, reliable, and
                  affordable repair services that keep your devices running
                  smoothly.
                </p>

                <p>
                  <strong>Why Choose Us:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Expert technicians with years of experience</li>
                  <li>Transparent pricing with no hidden fees</li>
                  <li>30-day warranty on all repairs</li>
                  <li>Quick turnaround times</li>
                  <li>Friendly and professional service</li>
                  <li>Convenient appointment booking</li>
                </ul>

                <p>
                  Whether you need a simple phone screen replacement or a full
                  laptop reformat, AzeroTech is here to help!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Find Us on the <span className="text-indigo-600">Map</span>
          </h2>

          <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg h-96 md:h-[500px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.4457556754836!2d120.93487762346017!3d14.328614385947328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d51b90000001%3A0x1234567890!2sImus%2C%20Cavite!5e0!3m2!1sen!2sph!4v1234567890"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-dark to-indigo-900 py-16 md:py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Book an appointment now or give us a call!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment" className="btn btn-primary text-lg">
              Book Appointment
            </Link>
            <a href="tel:+639123456789" className="btn btn-secondary text-lg">
              Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
