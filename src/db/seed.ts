import dotenv from "dotenv";
import { ProductInsert } from "./schema";
dotenv.config();

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

async function seed() {
  try {
    const { db } = await import("./index");
    const { products } = await import("./schema");

    console.log("Starting database seed!!!");
    const shouldReset = process.argv.includes("--reset") || process.argv.includes("-r");
    if (shouldReset) {
      console.log("clearing existing product...");
      await db.delete(products);
      console.log("clear all product");
    } else {
      const existingProducts = await db.select().from(products).limit(1);
      if (existingProducts.length > 0) {
        console.log("Product already exit in database");
        console.log("run with --reset flag clear and re-seed: npm run db:seed-- --reset");
        process.exit(0);
      }
    }
    console.log(`Insert ${sampleProducts.length} product...`);
    await db.insert(products).values(sampleProducts);
    console.log("insert seed success");
  } catch(err){
    console.error("Error seeding database", err);
    process.exit(1);
  }
}

seed();