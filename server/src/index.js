require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const mobilRoutes = require("./routes/mobil.routes");
const bookingRoutes = require("./routes/booking.routes");
const profileRoutes = require("./routes/profile.routes");
const contactRoutes = require("./routes/contact.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const testimoniRoutes = require("./routes/testimoni.routes");
const faqRoutes = require("./routes/faq.routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/mobil", mobilRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/faq", faqRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server rental mobil berjalan di http://localhost:${PORT}`);
});
