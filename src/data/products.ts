import {db} from "@/db";
import { type ProductInsert, products, ProductSelect } from "@/db/schema";
import { eq } from "drizzle-orm"; 

export const sampleProducts: ProductInsert[] = [
  {
    name: "Singleplayer Game",
    description: "Immersive singleplayer experience with both 3D and 2D gameplay modes.",
    price: "15000.00",
    badge: "NEW",
    rating: "4.8",
    review: 120,
    image: "/tanstack-circle-logo.png",
    inventory: "in-stock"
  },
  {
    name: "Sample Multiplayer Game",
    description: "Engaging multiplayer adventure featuring 3D and 2D modes with leaderboard and turn-based mechanics.",
    price: "25000.00",
    badge: "NEW",
    rating: "4.8",
    review: 120,
    image: "/tanstack-circle-logo.png",
    inventory: "in-stock"
  },
  {
    name: "Realtime Multiplayer Game",
    description: "Fast-paced realtime multiplayer with 3D and 2D gameplay, powered by REST API and WebSocket protocols.",
    price: "30000.00",
    badge: "NEW",
    rating: "4.8",
    review: 20,
    image: "/tanstack-circle-logo.png",
    inventory: "backorder"
  },
  {
    name: "Software Architecture Design",
    description: "Professional design services for monolithic and microservice architectures, tailored to your project needs.",
    price: "5000.00",
    badge: "NEW",
    rating: "4.8",
    review: 120,
    image: "/tanstack-circle-logo.png",
    inventory: "in-stock"
  },
  {
    name: "Backend",
    description: "Robust backend development covering APIs and database integration for scalable applications.",
    price: "30000.00",
    badge: "NEW",
    rating: "4.8",
    review: 200,
    image: "/tanstack-circle-logo.png",
    inventory: "in-stock"
  },
  {
    name: "Frontend",
    description: "Modern frontend development for responsive web and mobile applications with intuitive UI/UX.",
    price: "25000.00",
    badge: "NEW",
    rating: "4.8",
    review: 120,
    image: "/tanstack-circle-logo.png",
    inventory: "in-stock"
  },
  {
    name: "Fullstack",
    description: "Comprehensive end-to-end fullstack solutions including frontend, backend, APIs, databases, and architecture design.",
    price: "50000.00",
    badge: "NEW",
    rating: "5.0",
    review: 200,
    image: "/tanstack-circle-logo.png",
    inventory: "backorder"
  },
]

export async function getRecomendedProducts() {
  try{
    await new Promise((resolve) => setTimeout(resolve, 5000));//delay for test loading

    const productsData = await db.select().from(products).limit(3);
    return productsData
  }catch(err){
    console.log("Error getting recommended products ", err);
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.select().from(products).where(eq(products.id, id)).limit(1);
    // return product;
    return product?.[0] ?? null;
  } catch(err) {
    console.error("Error getting produc by id: ", err);
    return null;
  }
}

export async function getAllProducts(): Promise<ProductSelect[]> {
  try {
    const allProducts: ProductSelect[] = await db.select().from(products);
    
    return allProducts;
  } catch(err) {
   console.log("Error getting all products ", err);
    return []
  }
}