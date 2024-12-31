import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getallCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {slug
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{" "}
        Collection
      </h1>
      <ProductView products={products} categories={categories} />
    </div>
  );
}

export default CategoryPage;
