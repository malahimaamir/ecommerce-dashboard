import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Employee = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  salary: string;
  avatar: string;
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    fetchEmployees();
    window.addEventListener("employeeAdded", fetchEmployees);
    return () => window.removeEventListener("employeeAdded", fetchEmployees);
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching:", err));
  };

  const departments = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleDelete = async (id: string) => {
  try {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    fetchEmployees(); // Refresh list after delete
  } catch (err) {
    console.error("Error deleting employee:", err);
  }
};

const handleEdit = async (employee: Employee) => {
  const newName = prompt("Enter new name:", employee.name);
  if (!newName) return;

  try {
    await axios.put(`http://localhost:5000/api/employees/${employee._id}`, {
      ...employee,
      name: newName,
    });
    fetchEmployees(); // Refresh list after update
  } catch (err) {
    console.error("Error updating employee:", err);
  }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Inactive":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex gap-2 w-full md:w-1/2">
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Select onValueChange={setDepartmentFilter} defaultValue="all">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <CardDescription>{employee.position}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleEdit(employee)}>
                    <Edit className="mr-2 w-4 h-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(employee._id!)}>
                    <Trash2 className="mr-2 w-4 h-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <Mail className="inline w-4 h-4 mr-1" /> {employee.email}
              </p>
              <p>
                <Phone className="inline w-4 h-4 mr-1" /> {employee.phone}
              </p>
              <p>Department: {employee.department}</p>
              <p>Join Date: {employee.joinDate}</p>
              <p>Salary: {employee.salary}</p>
              <Badge className={getStatusColor(employee.status)}>
                {employee.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
