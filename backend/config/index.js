const mongoose = require("mongoose");
require("dotenv").config({ path: [".env", ".env.local"] });

const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.a9cmqgr.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(connectionString)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));