"use client";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-gray-400 px-10 py-10 rounded-lg mx-0">
      {/* Top Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-neutral-800 pb-8">
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                For the Record
              </a>
            </li>
          </ul>
        </div>

        {/* Communities */}
        <div>
          <h3 className="text-white font-semibold mb-4">Communities</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                For Artists
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Developers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Advertising
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Investors
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Vendors
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Useful links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Free Mobile App
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Popular by Country
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Import your music
              </a>
            </li>
          </ul>
        </div>

        {/* Spotify Plans */}
        <div>
          <h3 className="text-white font-semibold mb-4">Rhythmify Plans</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Premium Individual
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Premium Duo
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Premium Family
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Premium Student
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Rhythmify Free
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <a href="#" className="hover:underline">
            Legal
          </a>
          <a href="#" className="hover:underline">
            Safety & Privacy Center
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookies
          </a>
          <a href="#" className="hover:underline">
            About Ads
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
            >
              <FaInstagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
            >
              <FaTwitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
            >
              <FaFacebook className="w-5 h-5 text-white" />
            </a>
          </div>
          <span className="text-gray-400">© 2025 Rhythmify</span>
        </div>
      </div>
    </footer>
  );
}
