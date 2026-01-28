import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute("/")({component: App })

function App() {
  return (
    <div className='space-y-12 bg-linear-to-b from-slate-50 via-white to-slate-50 p-6'>
      <section>
      <Card className='p-8 shadow-md bg-white/80'>
        <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Your favorite e-commerce store</p>
        <CardTitle className='text-4xl font-bold leading-tight text-slate-900 dark:text-white
        max-w-2xl'>
          <h1>E-Shop - Your one-stop shop for all you need</h1>
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
    </div>
  )
}
