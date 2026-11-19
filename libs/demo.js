import bcrypt from "bcrypt";
import { connectDB } from "./mongodb";
import { User } from "@/app/(models)/user";

const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (days) => new Date(Date.now() - days * DAY);

export function seedDemoData() {
  return {
    budgets: [
      {
        name: "Groceries",
        limit: 600,
        transactions: [
          {
            amount: 84.32,
            category: "Groceries",
            date: daysAgo(1),
            description: "Weekly shop",
            type: "expense",
          },
          {
            amount: 51.17,
            category: "Groceries",
            date: daysAgo(4),
            description: "Farmers market",
            type: "expense",
          },
          {
            amount: 123.4,
            category: "Groceries",
            date: daysAgo(8),
            description: "Bulk order",
            type: "expense",
          },
          {
            amount: 62.05,
            category: "Groceries",
            date: daysAgo(12),
            description: "Corner store",
            type: "expense",
          },
        ],
      },
      {
        name: "Entertainment",
        limit: 250,
        transactions: [
          {
            amount: 24.99,
            category: "Entertainment",
            date: daysAgo(2),
            description: "Streaming subscription",
            type: "expense",
          },
          {
            amount: 68,
            category: "Entertainment",
            date: daysAgo(7),
            description: "Concert tickets",
            type: "expense",
          },
          {
            amount: 15.5,
            category: "Entertainment",
            date: daysAgo(15),
            description: "Movie night",
            type: "expense",
          },
        ],
      },
      {
        name: "Transport",
        limit: 180,
        transactions: [
          {
            amount: 45,
            category: "Transport",
            date: daysAgo(3),
            description: "Transit pass",
            type: "expense",
          },
          {
            amount: 28.75,
            category: "Transport",
            date: daysAgo(10),
            description: "Fuel",
            type: "expense",
          },
        ],
      },
    ],
    trackedStocks: [
      { symbol: "AAPL" },
      { symbol: "MSFT" },
      { symbol: "TSLA" },
    ],
  };
}

export async function createDemoUser() {
  await connectDB();
  if ((await User.countDocuments({ isDemo: true })) >= 200) {
    throw new Error("DemoUnavailable");
  }
  return User.create({
    name: "Demo User",
    email: `demo-${crypto.randomUUID()}@wealthwatch.local`,
    password: await bcrypt.hash(crypto.randomUUID(), 10),
    role: "user",
    isDemo: true,
    demoLastAccessAt: new Date(),
    ...seedDemoData(),
  });
}

export async function resetDemo(email) {
  await connectDB();
  await User.updateOne(
    { email, isDemo: true },
    { $set: { ...seedDemoData(), demoLastAccessAt: new Date() } },
  );
}
