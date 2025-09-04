"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#444343] to-[#313131]">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 gap-12">
        {/* Left Content */}
        <div className="max-w-xl text-white space-y-6">
          {/* Rhythmify Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/white_logo_transparent1.svg"
              alt="Rhythmify Logo"
              width={160}
              height={50}
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Download Rhythmify for Windows
          </h1>

          <p className="text-lg text-white/90 leading-relaxed">
            Enjoy high-quality audio and offline playback, plus Windows Game Bar
            integration and a friend activity feed that lets you see what your
            friends are listening to in real time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center sm:flex-row gap-10 mt-6">
            {/* Microsoft Store Button */}
            <Link
              href="#"
              className="flex items-center gap-4 bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-neutral-900"
            >
              <Image
                src="microsoft-store.svg"
                alt="Microsoft Store"
                width={34}
                height={34}
              />
              <div className="flex flex-col">
                <span className="text-sm">Download from the</span>
                <span className="text-xl"> Microsoft Store</span>
              </div>
            </Link>

            {/* Direct Download */}
            <Link href="#" className="text-white hover:text-gray-200">
              Download directly from Rhythmify
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <Image
            src="/download_preview.png"
            alt="Rhythmify App Preview"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
