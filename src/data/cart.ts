import { db } from "@/db"
import { cartItems, products } from "@/db/schema"
import { eq } from "drizzle-orm";

export const getCartItemsFn = async () => {
  const cart = await db.select().from(cartItems).innerJoin(products, eq(cartItems.productId, products.id));
  return {
    items: cart.map(item => {
      return { ...item.products, quantity: item.cart_items.quantity }
    })
  };
}