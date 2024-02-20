require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
// use V2
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
// database
const connectDB = require("./db/connect");
// routes

const productsRoutes = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});
app.get("/status", (req, res) => {
  res.status(200).json({ status: "success" });
});
app.post("status", (req, res) => {
  res.status(200).json({ status: "success" });
});
app.use("/api/v1/products", productsRoutes);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8888;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
