import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/ProductCard';
import { createServerFn } from '@tanstack/react-start';

const fetchRecomendedProduct = createServerFn({method: "GET"}).handler(async()=>{
  const {getRecomendedProducts} = await import("@/data/products");
  const products = await getRecomendedProducts();
  return products;
})

export const Route = createFileRoute("/")({
  component: App,
  loader: async () =>{
    // const {getRecomendedProducts} = await import("@/data/products");
    // const products = await getRecomendedProducts();
    // return products;
    const products = await fetchRecomendedProduct();
    return products;
  }
})

function App() {
  const products = Route.useLoaderData();

  return (
    <div className='space-y-12 bg-linear-to-b from-slate-50 via-white to-slate-50 p-6'>
      <section>
        <Card className='p-8 shadow-md bg-white/80'>
          <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Your favorite development services</p>
          <CardTitle className='text-4xl font-bold leading-tight text-slate-900 dark:text-white
          max-w-2xl'>
            <h1>E-Shop - Everything you need in development services</h1>
          </CardTitle>
          <CardDescription>
            <Link to= "/products" className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 
            text-sm font-semiblod text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl'> 
              Browser products
              <ArrowRightIcon size={16}/>
            </Link>
          </CardDescription>
        </Card>
      </section>

      <section className='space-y-4 max-w-6xl mx-auto rounded-2xl'>
        <Card className='p-6 shadow-md bg-white/80'>
          <div className='flex items-center justify-between'>
            <div>
              <CardHeader className='px-0'>
                <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Recommended</p>
                <CardTitle className='text-2xl font-semibold text-slate-900'>Starter Service price</CardTitle>
              </CardHeader>
              <CardDescription className='text-sm text-slate-600'>
                Curated items to try cart and detail pages quickly
              </CardDescription>
            </div>
            <div>
              <Link to= "/products" className='hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700
              sm:inline-flex transition hover:-translate-0.5 hover:shadow-xl'>
                View All <ArrowRightIcon size= {14}/>
              </Link>
            </div> 
          </div>   
        </Card>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product: any, index: number) => {
             return <ProductCard key = {index} product = {product}/>
          })}
        </div>
      </section>
    </div>
  )
}
