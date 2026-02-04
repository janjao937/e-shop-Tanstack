import { ProductCard } from '@/components/ProductCard'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllProducts } from '@/data/products';

import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware, createServerFn, json } from '@tanstack/react-start'

const fetchProduct = createServerFn({method:"GET"}).handler(async () => await getAllProducts());

const loggerMiddleware = createMiddleware().server(async({request, next})=>{
  console.log(`---logging middleware---${request.url} from ${request.headers.get("origin")}`);
  return next();
});

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: async() => {
    return fetchProduct();
  },
  server:{
    middleware: [loggerMiddleware],
    handlers: {
      POST: async({request})=>{
        let body = null;
        try {
          body = await request.json();
        } catch {
          body = null;
        }
        return json({ message: "Hello from POST request", body });
      },
    }
  }
});


function RouteComponent() {
  const products = Route.useLoaderData();
  return (
    <div className='space-y-6'>
      <section className='space-y-4 max-w-6xl mx-auto'>
        <Card className='p-6 shadow-md bg-white/80'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <CardHeader className='px-0'>
                <p className='text-sm uppercase tracking-wide text-slate-500'>Recommended</p>
                <CardTitle className='text-2xl font-semibold'>Starter Service price</CardTitle>
              </CardHeader>
              <CardDescription className='text-sm text-slate-600'>
                Curated items to try cart and detail pages quickly
              </CardDescription>
            </div>
          </div>   
        </Card>
      </section>
      <section>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {
            products.map((product: any, index) => {
            return <ProductCard key={`product-${index}`} product = {product}/>
          })
        }
        </div>

      </section>
    </div>
  )
}
