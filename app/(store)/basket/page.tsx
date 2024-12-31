"use client";

import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import AddtoBasketButton from "@/components/AddtoBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignIn, SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   wait for the client to mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">
          Your basket is empty. Add some items to it!
        </p>
      </div>
    );
  }
  const handleCheckout = async () => {
    if (!SignIn) return;
    setIsLoading(true);
    try {
      const metadata:Metadata = {
        orderNumber: crypto.randomUUID(), //example : aj345jl3 lafj5
        customerName: user?.fullName ?? "unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
        clerkUserId: user?.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() => {
                  router.push(`/product/${item.product.slug?.current}`);
                }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: £
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddtoBasketButton product={item.product} disabled={false} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:sticky lg:w-80 lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto ">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                £
                {groupedItems.reduce((totle, item) => totle + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>
                £{useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md px-4 hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Loading..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md px-4 hover:bg-blue-600 disabled:bg-gray-400">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0">
          {/* spacer for fixed checkout on mobile */}
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
