import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 py-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1>No Preducts found for: {query}</h1>
          <p className="text-gray-500 tetx-center">
            Try searching for something else
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Results for: {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
