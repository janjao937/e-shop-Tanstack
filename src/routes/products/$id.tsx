import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react';

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { getProductById } = await import('@/data/products')
    return await getProductById(params.id);
  }
})

function RouteComponent() {
  const { id } = Route.useParams();
  const product = Route.useLoaderData();

  // return <div>Hello "/products/{id} {JSON.stringify(product, null, 2)}</div>

  return (
    <div>
      <Card className='max-w-4xl mx-auto p-6'>
      <Link to="/products" className='inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700'>
        <ArrowLeftIcon size={16} />
        Back to products
      </Link>
        <Card>
          {/* <CardHeader> */}

            <CardHeader className='flex items-center gap-2'>
              <CardTitle>
                <h1 className='text-2xl font-semibold'>{product?.name}</h1>
                <div className="flex items-center gap-2">
                  {product?.badge && (<span className="rouded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">{product.badge}</span>)}
                </div>
              </CardTitle>
            </CardHeader>
          {/* </CardHeader> */}
          <CardContent className='flex items-center flex-col'>
            <CardDescription>{product?.description}</CardDescription>
            <p className='text-lg font-semibold'>{product?.price}</p>
            <span> Rated {product?.rating} ({product?.review})</span>
          </CardContent>
        </Card>
      </Card>
    </div>
  )
}
