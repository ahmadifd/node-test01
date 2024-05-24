import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const personSchema = new mongoose.Schema({
  index: { type: Number },
  name: { type: String },
  isActive: { type: Boolean },
  registered: { type: Date },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female"] },
  eyeColor: { type: String },
  favoriteFruit: { type: String },
  company: {
    title: String,
    email: String,
    phone: String,
    location: {
      country: String,
      address: String,
    },
  },
  tags: { type: [String] },
});

personSchema.plugin(timestamp);

export default mongoose.model("Person", personSchema);
