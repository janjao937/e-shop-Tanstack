import { ProductSelect } from "@/db/schema";
import { ProductCard } from "./ProductCard";
import { use } from "react";

export function RecommendedProducts({recommendedProducts}: {recommendedProducts: Promise<ProductSelect[]>}) {
  const data = use(recommendedProducts);
  return(
    <div>
      {/* <h2 className='text-2xl font-bold my-4'>Recommended Products</h2> */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        { 
          data?.map((product) => <ProductCard key= {product.id} product={product}/>)
        }
      </div>
    </div>
  )
}
