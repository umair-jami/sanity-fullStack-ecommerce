import React from "react";
import fb from "@/public/assets/footer/fb.png";
import x from "@/public/assets/footer/x.png";
import insta from "@/public/assets/footer/insta.png";
import github from "@/public/assets/footer/github.png";
import gpay from "@/public/assets/footer/g pay.png";
import applepay from "@/public/assets/footer/applypay.png";
import pypal from "@/public/assets/footer/paypal.png";
import master from "@/public/assets/footer/master.png";
import visa from "@/public/assets/footer/visa.png";
import email from "@/public/assets/footer/email.png";

import Image from "next/image";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Footer() {
  return (
    <footer className={`${poppins.className}`}>
      <div className="bg-black text-white py-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-12">
          <h3 className="text-2xl font-bold text-center lg:text-left">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h3>
          <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-[300px] pl-10 pr-4 py-3 rounded-full bg-white text-black focus:outline-none"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Image src={email} alt="email" />
              </span>
            </div>
            <button className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      <div className="py-10 container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-5 gap-6">
        <div>
          <h4 className="text-2xl font-bold mb-4" style={{ fontWeight: 900 }}>
            SHOP.CO
          </h4>
          <p className="text-gray-600 text-sm mb-4">
            We have clothes that suit your style and which you&apos;re proud to wear.
            From women to men.
          </p>
          <div className="flex items-center gap-3">
            {/* Icons */}
            <Image src={x} alt="x" />
            <Image src={fb} alt="fb" />
            <Image src={insta} alt="insta" />
            <Image src={github} alt="github" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="text-lg mb-3">COMPANY</h5>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h5 className="text-lg mb-3">HELP</h5>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* FAQ Links */}
        <div>
          <h5 className="text-lg mb-3">FAQ</h5>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h5 className="text-lg  mb-3">RESOURCES</h5>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>YouTube Playlist</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 flex flex-col sm:flex-row justify-between px-10 items-center py-4 text-center text-gray-600 text-sm">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="mt-2 flex justify-center items-center gap-3">
          <Image src={visa} alt="visa" />
          <Image src={master} alt="master" />
          <Image src={pypal} alt="pypal" />
          <Image src={applepay} alt="applepay" />
          <Image src={gpay} alt="gpay" />
        </div>
      </div>
    </footer>
  );
}
