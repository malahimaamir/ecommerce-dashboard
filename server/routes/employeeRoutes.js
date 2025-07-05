const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getAllEmployees);
router.post("/employees", employeeController.addEmployee);
router.get("/employee-stats", employeeController.getEmployeeStats);
router.get("/recent-employees", employeeController.getRecentEmployees);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);

module.exports = router;
