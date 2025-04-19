"use client"
import { ShieldCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="flex items-center gap-4 mb-12">
            <ShieldCheckIcon className="h-12 w-12 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Privacy Policy
              <span className="block mt-1 h-1 w-16 bg-orange-500 rounded-full"></span>
            </h1>
          </div>

          <section className="mb-12 group">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative pb-4
              before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-orange-500
              hover:before:w-16 before:transition-all">
              1. Data Collection
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-3">Information We Collect</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <span className="font-medium text-orange-500">Identity Data:</span> 
                    Name, contact info, user ID
                  </li>
                  <li>
                    <span className="font-medium text-orange-500">Technical Data:</span> 
                    IP addresses, device information
                  </li>
                  <li>
                    <span className="font-medium text-orange-500">Usage Data:</span> 
                    Interaction patterns, preferences
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 group">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative pb-4
              before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-orange-500
              hover:before:w-16 before:transition-all">
              2. Data Protection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>AES-256 encryption</li>
                  <li>Regular security audits</li>
                  <li>Two-factor authentication</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">User Rights</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Right to access</li>
                  <li>Right to erasure</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-orange-50 p-8 rounded-xl border border-orange-100">
            <div className="flex items-center gap-4">
              <DocumentTextIcon className="h-8 w-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Our DPO</h3>
                <p className="text-gray-600">
                  privacy@yourcompany.com<br />
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}