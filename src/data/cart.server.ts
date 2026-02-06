import { db } from "@/db"
import { cartItems, products } from "@/db/schema"
// import { createServerFn } from "@tanstack/react-start";
import { eq, desc, gt } from "drizzle-orm";

export const getCartItemsFn = async () => {
  const cart = await db.select().from(cartItems).innerJoin(products, eq(cartItems.productId, products.id));
  return {
    items: cart.map(item => {
      return { ...item.products, quantity: item.cart_items.quantity }
    })
  };
}

export const getCartItemsCount = async () => {
  const cart = await getCartItems()
  const count = cart.items.reduce(
    (acc: number, item) => acc + Number(item.quantity),
    0,
  )
  return {
    count,
    total: cart.items.reduce(
      (acc: number, item) => acc + Number(item.price) * Number(item.quantity),
      0,
    ),
  }
}


export const getCartItems = async () => {
  const cart = await db
    .select()
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .orderBy(desc(cartItems.createdAt))

  return {
    items: cart.map((item) => ({
      ...item.products,
      quantity: item.cart_items.quantity,
    })),
  }
}

export async function addToCart(productId: string, quantity: number = 1) {
  const existingItem = await db.select().from(cartItems).where(eq(cartItems.productId, productId));
  const qty = Math.max(1, Math.min(quantity, 99));

  if (existingItem.length > 0) {
    //update
    // const newQty = Math.max(1, Math.min(existingItem[0].quantity + qty, 99));
    // await db.update(cartItems).set({ quantity: newQty }).where(eq(cartItems.productId, productId));
    await updateCartItem(productId, existingItem[0].quantity + qty);

  } else {
    // await db.insert(cartItems).values({productId, quantity}).returning();
    await db.insert(cartItems).values({ productId, quantity: qty });
  }

  return await getCartItems();
}

export async function updateCartItem(productId: string, quantity: number = 1) {
  const qty = Math.max(0, Math.min(quantity, 99));

  if (qty === 0) {
    await db.delete(cartItems).where(eq(cartItems.productId, productId)); // delete the item
  } else {

    const existingItem = await db.select().from(cartItems).where(eq(cartItems.productId, productId)).limit(1); // check if an item already exists in the cart

    if (existingItem.length > 0) {

      await db.update(cartItems).set({ quantity: qty }).where(eq(cartItems.productId, productId)); // update quantity
    }
  }
}


export async function removeFromCart(productId: string) {
  await db.delete(cartItems).where(eq(cartItems.productId, productId))
  return await getCartItems()
}

export async function clearCart() {
  await db.delete(cartItems).where(gt(cartItems.quantity, 0))
  return await getCartItems()
}

