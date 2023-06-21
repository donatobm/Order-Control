require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ordersRoutes = require("./routes/orders");
const statesRoutes = require("./routes/states");
const jobsRoutes = require("./routes/jobs");
const clientsRoutes = require("./routes/clients");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/states", statesRoutes);
app.use("/orders", ordersRoutes);
app.use("/jobs", jobsRoutes);
app.use("/clients", clientsRoutes);

const PORT = process.env.APP_PORT;

app.listen(PORT, console.log(`CONNECTED TO PORT ${PORT}`));