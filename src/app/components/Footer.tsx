import Link from 'next/link';
import { 
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  Mail, Phone, MapPin, Globe, Clock,
  MessageSquare, FileText, ShieldCheck, CreditCard, HelpCircle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Turboss</h3>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for automotive enthusiasts, providing innovative tools,
              rich information, and a vibrant community.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Youtube" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="flex items-center text-gray-400">
              <Clock size={14} className="mr-2" />
              <span className="text-sm">Mon-Fri: 9AM-6PM EST</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/communitychat" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Community Chat
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center">
                  <HelpCircle size={16} className="mr-1" />
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/termsofservices" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center">
                  <FileText size={16} className="mr-1" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center">
                  <ShieldCheck size={16} className="mr-1" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog/engine-basics" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Engine Basics
                </Link>
              </li>
              <li>
                <Link href="/blog/maintenance-tips" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Maintenance Tips
                </Link>
              </li>
              <li>
                <Link href="/payment-options" className="text-gray-400 hover:text-orange-500 transition-colors flex items-center">
                  <CreditCard size={16} className="mr-1" />
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Automotive Street, Engine City, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-orange-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-orange-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@turboss.com</span>
              </li>
              <li className="flex items-center">
                <Globe size={20} className="text-orange-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">www.turboss.com</span>
              </li>
              <li className="flex items-center">
                <MessageSquare size={20} className="text-orange-500 mr-2 flex-shrink-0" />
                <Link href="/live-chat" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Live Chat Support
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Business Hours:</p>
              <p className="text-sm text-gray-400">Weekdays: 9AM - 6PM</p>
              <p className="text-sm text-gray-400">Weekends: 10AM - 4PM (EST)</p>
            </div>
          </div>
        </div>

        {/* Award Badges Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-center text-lg font-semibold mb-4">Recognized By</h4>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-orange-500 font-bold">⭐ 2023</div>
              <div className="text-xs text-gray-400">Best Automotive Platform</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-orange-500 font-bold">🏆 CERTIFIED</div>
              <div className="text-xs text-gray-400">Automotive Excellence</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-orange-500 font-bold">🔧 PRO</div>
              <div className="text-xs text-gray-400">Mechanic Recommended</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-orange-500 font-bold">🛡️ SECURE</div>
              <div className="text-xs text-gray-400">Data Protection</div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">Subscribe to our newsletter for the latest automotive news and updates.</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 bg-gray-800 text-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold">Get Our Mobile App</h4>
            <p className="text-sm text-gray-400">Access Turboss on the go</p>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="bg-black px-4 py-2 rounded flex items-center border border-gray-700">
              <div className="mr-2">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.707 10.708L16.293 9.294 13 12.587 9.707 9.294 8.293 10.708 11.586 14.001 8.293 17.294 9.707 18.708 13 15.415 16.293 18.708 17.707 17.294 14.414 14.001z"></path></svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
            <button className="bg-black px-4 py-2 rounded flex items-center border border-gray-700">
              <div className="mr-2">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M17.707 10.708L16.293 9.294 13 12.587 9.707 9.294 8.293 10.708 11.586 14.001 8.293 17.294 9.707 18.708 13 15.415 16.293 18.708 17.707 17.294 14.414 14.001z"></path></svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Turboss. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/accessibility" className="text-gray-500 hover:text-gray-300 text-sm">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-gray-500 hover:text-gray-300 text-sm">
              Sitemap
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">
              Cookie Policy
            </Link>
            <Link href="/affiliates" className="text-gray-500 hover:text-gray-300 text-sm">
              Affiliate Program
            </Link>
            <Link href="/careers" className="text-gray-500 hover:text-gray-300 text-sm">
              Careers
            </Link>
            <Link href="/press" className="text-gray-500 hover:text-gray-300 text-sm">
              Press Kit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
