import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="ri-taxi-line text-2xl text-primary"></i>
              <span className="text-xl font-bold">ShareCab</span>
            </div>
            <p className="text-gray-400 mb-6">
              India's favorite ride-sharing platform. Connect with travelers, save money, and reduce your carbon footprint across India's vibrant cities.
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
              <li><Link href="/track-ride" className="text-gray-400 hover:text-white transition">Track Your Ride</Link></li>
              <li><Link href="/my-bookings" className="text-gray-400 hover:text-white transition">My Bookings</Link></li>
              <li><Link href="/plans" className="text-gray-400 hover:text-white transition">Subscription Plans</Link></li>
            </ul>
          </div>

          {/* Popular Routes in India */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Delhi - Chandigarh</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Mumbai - Pune</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Bangalore - Mysore</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Chennai - Pondicherry</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Hyderabad - Warangal</a></li>
            </ul>
          </div>

          {/* Compliance & Support for India */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support & Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">24/7 Customer Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Grievance Officer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-md font-semibold mb-3">Popular Cities in India</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Mumbai</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Delhi</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Bangalore</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Hyderabad</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Chennai</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Kolkata</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Pune</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Ahmedabad</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Jaipur</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">Lucknow</a>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-3">Download Our App</h4>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-600 transition">
                  <i className="ri-google-play-fill text-xl mr-2"></i>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </a>
                <a href="#" className="flex items-center bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-600 transition">
                  <i className="ri-apple-fill text-xl mr-2"></i>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
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
