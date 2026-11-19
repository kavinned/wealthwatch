import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    budgets: [
      {
        name: { type: String, required: true },
        limit: { type: Number, required: true },
        transactions: [
          {
            amount: { type: Number, required: true },
            category: { type: String, required: true },
            date: { type: Date, required: true },
            description: { type: String, required: true },
            type: { type: String, required: true, enum: ["income", "expense"] },
          },
        ],
      },
    ],
    trackedStocks: [
      {
        symbol: { type: String, required: true },
      },
    ],
    isDemo: { type: Boolean, default: false, index: true },
    demoLastAccessAt: { type: Date, index: { expires: 86400 } },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
