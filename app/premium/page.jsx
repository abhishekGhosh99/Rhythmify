"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PremiumPage = () => {
  const paymentOptions = [
    { src: "/UPI-logo.svg", alt: "UPI" },
    { src: "/gpay.svg", alt: "Google Pay" },
    { src: "/paytm.svg", alt: "Paytm" },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-16 pb-32">
        {/* Left Content */}
        <div className="max-w-xl z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Listen without limits. Try 3 months of Premium Individual for ₹139.
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Only ₹139/month after. Cancel anytime.
          </p>
          <div className="flex gap-4">
            <Button className="bg-slate-500 hover:bg-slate-600 rounded-full px-6 py-3 font-semibold">
              Try 3 months for ₹139
            </Button>
            <Button className="bg-neutral-900 border border-white hover:bg-neutral-800 rounded-full px-6 py-3 font-semibold">
              View all plans
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Premium Individual only. ₹139 for 3 months, then ₹139 per month
            after. Offer only available if you haven't tried Premium before.{" "}
            <Link href="#" className="underline">
              Terms apply
            </Link>
            . Offer ends 23 September 2025.
          </p>
        </div>

        {/* Right Image Grid */}
        <div className="absolute md:relative right-0 -top-[50px] w-full md:w-2/3 opacity-90">
          <Image
            src="/premium-hero.png" // save uploaded image as /public/premium-hero.png
            alt="Premium Hero"
            width={600}
            height={600}
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-8 md:px-20 py-16 bg-neutral-950">
        <h2 className="text-5xl font-bold text-center mb-4">
          Experience the difference
        </h2>
        <p className="text-center text-gray-400 mb-12 text-2xl">
          Go Premium and enjoy full control of your listening. Cancel anytime.
        </p>

        <div className="overflow-x-auto">
          <table className="table-auto w-2/3 mx-auto text-left text-gray-300 border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th className="px-4 py-2">What you'll get</th>
                <th className="px-4 py-2">Free plan</th>
                <th className="px-4 py-2">Premium plan</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Ad-free music listening",
                "Download to listen offline",
                "Play songs in any order",
                "High audio quality",
                "Listen with friends in real time",
                "Organise listening queue",
              ].map((feature, idx) => (
                <tr key={idx} className="bg-neutral-900">
                  <td className="px-4 py-3 rounded-l-lg">{feature}</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3 rounded-r-lg">✔</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Affordable Plans */}
      <section className="px-8 md:px-20 py-16 bg-black text-center">
        <h2 className="text-4xl font-bold mb-4">
          Affordable plans for any situation
        </h2>
        <p className="text-gray-400 mb-8 text-xl w-[60%] mx-auto">
          Choose a Premium plan and listen to ad-free music without limits on
          your phone, speaker and other devices. Cancel anytime.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {paymentOptions.map((option, index) => (
            <Image
              key={index}
              src={option.src}
              alt={option.alt}
              width={60}
              height={60}
              className="rounded bg-white p-2"
            />
          ))}
        </div>

        <div className="text-lg font-semibold flex justify-center items-center gap-10 mt-16">
          <p className="text-2xl font-semibold">All Premium plans include:</p>
          <br />
          <ul className="flex flex-col items-start">
            <li className="text-gray-300">✓ Ad-free music listening</li>
            <li className="text-lg font-semibold">
              ✓ Download to listen offline
            </li>
            <li className="text-lg font-semibold">✓ Play songs in any order</li>
            <li className="text-lg font-semibold">✓ High audio quality</li>
            <li className="text-lg font-semibold">
              ✓ Listen with friends in real time
            </li>
            <li className="text-lg font-semibold">
              ✓ Organise listening queue
            </li>
          </ul>
        </div>

        {/* Premium Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-24">
          {/* Individual Plan */}
          <div className="bg-neutral-800 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-4 bg-rose-200 text-black px-3 py-1 rounded-full text-sm font-semibold">
              ₹139 for 3 months
            </div>

            <div className="flex items-center gap-2 mb-4 mt-4">
              <Image
                src="/white_logo_transparent1.svg"
                alt="logo"
                width={40}
                height={24}
                className="w-24 h-10"
              />
              <span className="text-white font-semibold">Premium</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">Individual</h3>
            <p className="text-white font-semibold mb-1">₹139 for 3 months</p>
            <p className="text-gray-400 text-sm mb-6">₹139/month after</p>

            <ul className="space-y-3 mb-8">
              <li className="text-white">• 1 Premium account</li>
              <li className="text-white">• Cancel anytime</li>
              <li className="text-white">• Subscribe or one-time payment</li>
            </ul>

            <div className="space-y-3">
              <Button className="w-full bg-rose-200 hover:bg-rose-400 text-black rounded-full py-3 font-semibold">
                Try 3 months for ₹139
              </Button>
              <Button className="w-full bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-full py-3 font-semibold">
                One-time payment
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              ₹139 for 3 months, then ₹139 per month after. Offer only available
              if you haven't tried Premium before.{" "}
              <Link href="#" className="underline">
                Terms apply
              </Link>
              . Offer ends 23 September 2025.
            </p>
          </div>

          {/* Family Plan */}
          <div className="bg-neutral-800 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-4 bg-sky-200 text-black px-3 py-1 rounded-full text-sm font-semibold">
              ₹229 for 2 months
            </div>

            <div className="flex items-center gap-2 mb-4 mt-4">
              <Image
                src="/white_logo_transparent1.svg"
                alt="logo"
                width={40}
                height={24}
                className="w-24 h-10"
              />
              <span className="text-white font-semibold">Premium</span>
            </div>

            <h3 className="text-3xl font-bold text-sky-200 mb-2">Family</h3>
            <p className="text-white font-semibold mb-1">₹229 for 2 months</p>
            <p className="text-gray-400 text-sm mb-6">₹229/month after</p>

            <ul className="space-y-3 mb-8">
              <li className="text-white">• Up to 6 Premium accounts</li>
              <li className="text-white">
                • Control content marked as explicit
              </li>
              <li className="text-white">• Cancel anytime</li>
              <li className="text-white">• Subscribe or one-time payment</li>
            </ul>

            <div className="space-y-3">
              <Button className="w-full bg-sky-200 hover:bg-sky-400 text-black rounded-full py-3 font-semibold">
                Try 2 months for ₹229
              </Button>
              <Button className="w-full bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-full py-3 font-semibold">
                One-time payment
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              ₹229 for 2 months, then ₹229 per month after. Offer only available
              if you haven't tried Premium before. For up to 6 family members
              residing at the same address.{" "}
              <Link href="#" className="underline">
                Terms apply
              </Link>
              .
            </p>
          </div>

          {/* Duo Plan */}
          <div className="bg-neutral-800 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-4 bg-amber-200 text-black px-3 py-1 rounded-full text-sm font-semibold">
              ₹179 for 2 months
            </div>

            <div className="flex items-center gap-2 mb-4 mt-4">
              <Image
                src="/white_logo_transparent1.svg"
                alt="logo"
                width={40}
                height={24}
                className="w-24 h-10"
              />
              <span className="text-white font-semibold">Premium</span>
            </div>

            <h3 className="text-3xl font-bold text-amber-200 mb-2">Duo</h3>
            <p className="text-white font-semibold mb-1">₹179 for 2 months</p>
            <p className="text-gray-400 text-sm mb-6">₹179/month after</p>

            <ul className="space-y-3 mb-8">
              <li className="text-white">• 2 Premium accounts</li>
              <li className="text-white">• Cancel anytime</li>
              <li className="text-white">• Subscribe or one-time payment</li>
            </ul>

            <div className="space-y-3">
              <Button className="w-full bg-amber-200 hover:bg-amber-400 text-black rounded-full py-3 font-semibold">
                Try 2 months for ₹179
              </Button>
              <Button className="w-full bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-full py-3 font-semibold">
                One-time payment
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              ₹179 for 2 months, then ₹179 per month after. Offer only available
              if you haven't tried Premium before. For couples who reside at the
              same address.{" "}
              <Link href="#" className="underline">
                Terms apply
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PremiumPage;
