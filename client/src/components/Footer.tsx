import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="ri-taxi-line text-2xl text-primary"></i>
              <span className="text-xl font-bold">ShareCab</span>
            </div>
            <p className="text-gray-400 mb-6">
              India's favorite ride-sharing platform. Commute smartly with carpooling to save money and reduce your carbon footprint in India's busy urban areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="WhatsApp">
                <i className="ri-whatsapp-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/book-ride" className="text-gray-400 hover:text-white transition">Book a Ride</Link></li>
              <li><Link href="/my-bookings" className="text-gray-400 hover:text-white transition">My Rides</Link></li>
              <li><Link href="/plans" className="text-gray-400 hover:text-white transition">Subscription Plans</Link></li>
              <li><Link href="/community" className="text-gray-400 hover:text-white transition">Community</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition">Login / Sign Up</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support & Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">24/7 Customer Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Safety Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Driver Partner Program</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Grievance Officer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ShareCab India Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="Indian Flag" className="w-4 h-3 mr-1" />
              <span className="text-gray-400 text-sm">Made in India</span>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">English</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">हिन्दी</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">தமிழ்</a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">INR (₹)</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
