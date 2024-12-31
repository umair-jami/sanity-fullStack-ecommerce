import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";

import Image from "next/image";
import Link from "next/link";
type Block = {
  _type: string;
  children?: Child[];
};

type Child = {
  _type: string;
  text?: string;
};


function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col h-full w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-square w-full overflow-hidden h-full">
        {product.image && (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name || "product image"}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900 truncate">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description?.map((block: Block) =>
            block._type === "block"
              ? block.children?.map((child: Child) => child.text).join("")
              : ""
          )}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">
        £{product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductThumb;
