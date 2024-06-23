import mongoose from "mongoose";

export default function DbConnection() {
  try {
    mongoose
      .connect("mongodb://0.0.0.0:27017/newDatabase")
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => console.log("Error connecting", err));
  } catch (error) {
    console.log(error);
  }
}
