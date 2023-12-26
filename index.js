const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoute")
const authentification = require("./routes/authentification")
const productRoute = require("./routes/productRoute")
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute")
const stripe = require("./routes/stripe")
const cors = require("cors")



app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authentification)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout",stripe)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connection established"))
    .catch(err => { console.log(err) })

app.listen(process.env.PORT || 5000,
    () => { console.log("backend server is running on port 5000") })


