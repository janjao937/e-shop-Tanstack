import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex'>
    <Link to="/products/$id" params = {{id:1}}>Go to product 1</Link>
    <Link to="/products/$id" params = {{id:2}}>Go to product 2</Link>
    <Link to="/products/$id" params = {{id:3}}>Go to product 3</Link>
    </div>
  )
}
