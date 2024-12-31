"use client";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";
import { Product } from "@/sanity.types";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-[100%] h-[100%]">
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
              style={{ width: "100%", height: "auto" }}
            >
              <ProductThumb key={product._id} product={product} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default ProductGrid;
