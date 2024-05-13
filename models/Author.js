import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

authorSchema.plugin(timestamp);

export default mongoose.model("Author", authorSchema);
