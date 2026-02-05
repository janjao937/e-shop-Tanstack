import { numeric, pgEnum, pgTable, text, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";

// const badgeValues = ["NEW", "Sale", "Featured", "Limited"] as const;
const badgeValues = ['New', 'Sale', 'Featured', 'Limited'] as const;
const inventoryValues = ["in-stock", "backorder", "preorder"] as const;

export const badgeEnum = pgEnum("badge", badgeValues);
export const inventoryEnum = pgEnum("inventory", inventoryValues);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", {length: 255}).notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2}).notNull(),
  badge: badgeEnum("badge"),
  rating: numeric("rating", { precision: 3, scale: 2}).notNull().default("0"),
  review: integer("review").notNull().default(0),
  image:varchar("image", {length: 512}).notNull(),
  inventory: inventoryEnum("inventory").notNull().default("in-stock"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export type ProductSelect = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;

export const cartItem = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade"}),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export type CartItemSelect = typeof cartItem.$inferSelect;
export type CartItemInsert = typeof cartItem.$inferInsert;

export type BadgeValue = (typeof badgeValues)[number];
export type InventoryValues = (typeof inventoryValues)[number];
