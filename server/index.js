const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger); //  Logging middleware

//  Main Routes
app.use("/api", employeeRoutes);

//  Error handler middleware (should be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
