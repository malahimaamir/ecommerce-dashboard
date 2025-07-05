const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/empowerDashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  department: String,
  position: String,
  status: String,
  joinDate: String,
  salary: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      position: req.body.position,
      status: "Active",
      joinDate: req.body.startDate,
      salary: req.body.salary,
      avatar: "/placeholder.svg"
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Failed to add employee" });
  }
});

app.get("/api/employee-stats", async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeToday = await Employee.countDocuments({ status: "Active" });
    const onLeave = await Employee.countDocuments({ status: "On Leave" });

    const avgSalaryRaw = await Employee.aggregate([
      {
        $group: {
          _id: null,         
        }
      }
    ]);    

    const departments = await Employee.distinct("department");

    res.json({
      totalEmployees,
      activeToday,
      avgSalary,
      onLeave,
      departmentCount: departments.length
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

app.get("/api/recent-employees", async (req, res) => {
  try {
   const recentEmployees = await Employee.find()
  .sort({ createdAt: -1 })
  .limit(5);


    // console.log("📦 Recent Employees:", recentEmployees); 

    res.json(recentEmployees);
  } catch (err) {
    console.error("Error fetching recent employees:", err);
    res.status(500).json({ message: "Failed to load recent activity" });
  }
});



app.put("/api/employees/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});


app.delete("/api/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});



// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
