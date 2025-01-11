import { pgTable,serial } from "drizzle-orm/pg-core";
import {
    boolean,
    timestamp,
    text,
    primaryKey,
    integer,
  } from "drizzle-orm/pg-core"
  import postgres from "postgres"
  import { drizzle } from "drizzle-orm/postgres-js"
  import type { AdapterAccountType } from "next-auth/adapters"
import { relations } from "drizzle-orm";

   
export const bids = pgTable("bb_bids",{
    id:serial('id').primaryKey(),
    amount:integer('amount').notNull(),
    itemId:serial('itemId').notNull()
    .references(()=> items.id,{onDelete:"cascade"}),
    userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
})
export const items = pgTable("bb_items",{
    name:text('name').notNull(),
    id:serial('id').primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    startingPrice: integer("startingPrice").notNull().default(0),
    filekey:text('fileKey').notNull(), 
    equity:integer("equity").notNull().default(0),
     filepdf:text("filepdf").notNull(),
    description:text("description").notNull(),
    companyval:text("company").notNull(),
    bidInterval:integer("bidInterval").notNull().default(100),
    currentBid:integer("currentBid").notNull().default(0),
    endDate: timestamp("endDate", { mode: "date" }).notNull()
})

const connectionString = process.env.DATABASE_URL!
const pool = postgres(connectionString, { max: 1 })
 
export const db = drizzle(pool)
 
export const users = pgTable("bb_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "bb_account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 
export const sessions = pgTable("bb_session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "bb_verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)
 
export const authenticators = pgTable(
  "bb_authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
  
)
export const userRelations = relations(bids,({one})=>({
  user:one(users,{
    fields:[bids.userId],
    references:[users.id],
  })
}))
export type Item = typeof items.$inferSelect