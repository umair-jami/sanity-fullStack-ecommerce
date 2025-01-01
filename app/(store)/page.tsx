import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getallCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic="force-static"
export const revalidate=60
export default async function Home() {
  const products = (await getAllProducts()) ?? [];
  console.log("Sanity token is available:",process.env.SANITY_API_TOKEN);
  const categories = (await getAllCategories()) ?? [];
  console.log(
    crypto.randomUUID().slice(0,5)+ `>>> Rerender the home page cache with ${products.length} products and ${categories.length} categories`
  )
  return (
    <div>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}
