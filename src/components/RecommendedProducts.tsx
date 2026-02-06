import { ProductSelect } from "@/db/schema";
import { ProductCard } from "./ProductCard";
import { use } from "react";

export function RecommendedProducts({recommendedProducts}: {recommendedProducts: Promise<ProductSelect[]>}) {
  const data = use(recommendedProducts);
  return(
    <div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        { 
          data?.map((product) => <ProductCard key= {product.id} product={product}/>)
        }
      </div>
    </div>
  )
}
