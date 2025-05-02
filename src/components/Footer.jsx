import { BookText } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { PackageSearch } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Mail } from "lucide-react";
import { Landmark } from "lucide-react";
import { ScrollText } from "lucide-react";
import { Users } from "lucide-react";
import { Store } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-zinc-900 text-zinc-300 py-10 px-6">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div>
          <h4 className="text-white font-semibold mb-2 flex items-center gap-1 font-play-fair text-3xl">
            Buy
            <span className="text-blue-600">It</span>
          </h4>
          <p className="text-sm">Your favorite place to shop online.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <Users className="w-4 h-4" /> About
            </li>
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <BookText className="w-4 h-4" /> Careers
            </li>
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <ScrollText className="w-4 h-4" /> Blog
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <PhoneCall className="w-4 h-4" /> Help Center
            </li>
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <Mail className="w-4 h-4" /> Contact
            </li>
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <PackageSearch className="w-4 h-4" /> Returns
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <Landmark className="w-4 h-4" /> Terms
            </li>
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <ShieldCheck className="w-4 h-4" /> Privacy
            </li>
            <li className="flex items-center gap-2 hover:text-blue-300 transition cursor-pointer">
              <ScrollText className="w-4 h-4" /> Cookies
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm mt-6 text-zinc-500">
        &copy; {new Date().getFullYear()} BuyIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
