"use client"

import Link from 'next/link';
import { BookOpenIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Sidebar */}
          <div className="lg:w-64 lg:shrink-0">
            <nav className="sticky top-28 bg-black/50 p-6 rounded-xl backdrop-blur-lg border border-orange-900/30">
              <div className="flex items-center gap-3 mb-8">
                <ScaleIcon className="h-8 w-8 text-orange-500" />
                <h2 className="text-xl font-bold text-white">Contents</h2>
              </div>
              <ul className="space-y-4">
                {[1,2,3,4,5,6,7,8,9].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`#section-${item}`}
                      className="text-gray-300 hover:text-orange-400 group flex items-center gap-2 transition-colors"
                    >
                      <span className="w-2 h-2 bg-orange-500/30 rounded-full group-hover:bg-orange-500 transition-all"></span>
                      Section {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-12">
              <BookOpenIcon className="h-12 w-12 text-orange-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                Terms of Service
                <span className="block mt-1 h-1 w-16 bg-orange-500 rounded-full"></span>
              </h1>
            </div>

            <section id="section-1" className="mb-12 group">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative pb-4
                before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-orange-500
                hover:before:w-16 before:transition-all">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                By accessing or using <span className="text-orange-500 font-medium">[Your Company]</span>, 
                you agree to be bound by these Terms. Continued use constitutes acceptance of revisions.
              </p>
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">Key Points:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Binding legal agreement</li>
                  <li>Automatic acceptance through use</li>
                  <li>Modification rights reserved</li>
                </ul>
              </div>
            </section>

            {/* Add more sections with similar structure */}
            <section id="section-2" className="mb-12 group">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative pb-4
                before:absolute before:bottom-0 before:left-0 before:w-12 before:h-0.5 before:bg-orange-500
                hover:before:w-16 before:transition-all">
                2. User Obligations
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-3">2.1 Account Security</h3>
                  <p className="text-gray-600">
                    Users maintain responsibility for credential security and account activity.
                    <span className="block mt-2 text-orange-500 font-medium">
                      Immediate notification required for unauthorized access.
                    </span>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}