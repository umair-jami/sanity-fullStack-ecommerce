"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SignedIn } from "@clerk/clerk-react";
import userBasketStore from "@/store/store";
import { Poppins } from "next/font/google";
import logo from "../public/Orange and Gray Tag Cart Virtual Shop Logo (1).png"
import Image from "next/image";
import { log } from "console";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header() {
  const { user } = useUser();
  const itemCount=userBasketStore((state)=>
  state.items.reduce((total,item)=>total+item.quantity,0)
  );
  const createClerkPasskey = async () => {
    try{
        const response=await user?.createPasskey();
        console.log(response);
    }catch(error){
        console.log("Error",JSON.stringify(error,null,2));
    }
  };
  return (
    <header className={`${poppins.className} flex flex-wrap justify-between items-center px-4 py-2`}>
      {/* Top row */}
      <div className="flex w-full justify-between flex-wrap items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="rounded-md"
          />
        </Link>
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full border max-w-4xl"
          />
        </Form>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 md:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 border hover:scale-105 transition-all duration-200 border-b-black py-2 px-4 rounded-md font-bold"
          >
            <TrolleyIcon className="w-6 h-6" />
            {/* Span Item count once glbal state is implemented */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
            <span>My Basket</span>
          </Link>
          {/* User area */}

          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2  border border-b-black py-2 px-4 rounded-md font-bold hover:scale-105 transition-all duration-200"
              >
                <PackageIcon className="w-6 h-6" />
                {/* Span Item count once glbal state is implemented */}
                <span>My Orders</span>
              </Link>
            </SignedIn>
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 py-2 px-4 rounded-md font-bold border-blue-300 border"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
