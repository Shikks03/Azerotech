import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark border-t border-indigo-500/20 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">AzeroTech</h3>
            <p className="text-gray-400 text-sm">
              Professional phone and laptop repair services with modern,
              affordable accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-indigo-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/accessories"
                  className="text-gray-400 hover:text-indigo-400"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-indigo-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Store Hours</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Monday - Sunday</li>
              <li>9:00 AM - 6:00 PM</li>
              <li className="pt-2 text-indigo-400">Call for Extensions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+639123456789"
                  className="text-gray-400 hover:text-indigo-400 text-sm"
                >
                  +63 912 345 6789
                </a>
              </li>
              <li>
                <a
                  href="https://m.me/azerotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 text-sm"
                >
                  Message on Messenger
                </a>
              </li>
              <li>
                <p className="text-gray-400 text-sm">Imus, Cavite</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-500/20 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} AzeroTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
