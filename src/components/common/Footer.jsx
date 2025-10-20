import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/home" className="inline-flex items-center gap-2 text-2xl font-bold text-green-400 hover:text-green-300 transition duration-300 mb-4">
              <Leaf className="w-8 h-8" />
              PlantFresh
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Eco-friendly cleaning solutions for a sparkling home and a healthier planet. 100% natural, 100% effective.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-700 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-700 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-700 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  Cleaning Tips
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:w-4 transition-all duration-200"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start group">
                <div className="bg-green-500/20 p-2 rounded-lg mr-3 group-hover:bg-green-500 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-green-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="text-sm">123 Green Street, Eco City</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-green-500/20 p-2 rounded-lg mr-3 group-hover:bg-green-500 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-green-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-sm">(555) 123-FRESH</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="bg-green-500/20 p-2 rounded-lg mr-3 group-hover:bg-green-500 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-green-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-sm">hello@plantfresh.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3 text-white">Stay Fresh & Informed</h3>
            <p className="text-gray-300 mb-6">Subscribe to get updates on new products and exclusive offers!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 max-w-md"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PlantFresh. All rights reserved. Made with 🌿 for a better planet.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;