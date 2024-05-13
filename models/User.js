import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
  name: String,
});

userSchema.plugin(timestamp);

export default mongoose.model("User", userSchema);
