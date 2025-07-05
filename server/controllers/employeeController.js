const Employee = require("../models/Employee");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addEmployee = async (req, res) => {
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
    res.status(500).json({ message: "Failed to add employee" });
  }
};

exports.getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeToday = await Employee.countDocuments({ status: "Active" });
    const onLeave = await Employee.countDocuments({ status: "On Leave" });

    const avgSalary = await Employee.aggregate([
      {
        $group: {
          _id: null,
          averageSalary: { $avg: { $toDouble: "$salary" } }
        }
      }
    ]);

    const departments = await Employee.distinct("department");

    res.json({
      totalEmployees,
      activeToday,
      avgSalary: avgSalary[0]?.averageSalary || 0,
      onLeave,
      departmentCount: departments.length
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

exports.getRecentEmployees = async (req, res) => {
  try {
    const recentEmployees = await Employee.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentEmployees);
  } catch (err) {
    res.status(500).json({ message: "Failed to load recent activity" });
  }
};

// Update
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
