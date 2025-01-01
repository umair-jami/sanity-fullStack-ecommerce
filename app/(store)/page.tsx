import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getallCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const dynamic="force-static"
export const revalidate=60
export default async function Home() {
  const products = (await getAllProducts()) ?? [];
  const categories = (await getAllCategories()) ?? [];
  console.log(
    crypto.randomUUID().slice(0,5)+ `>>> Rerender the home page cache with ${products.length} products and ${categories.length} categories`
  )
  return (
    <div className={poppins.className}>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}
