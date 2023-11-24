import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    required: true,
    //default: "regular", // You can set the default value as needed
  },
  membershipExpiry: {
    type: Date,
    default: new Date(1711411200000), // You can set the default date as needed
  },
  paymentMethod: {
    type: String,
    default: "credit_card", // You can set the default payment method as needed
  },
});

export default mongoose.model("User", userSchema);
