import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const AddEmployeeForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    startDate: "",
    address: "",
    emergencyContact: "",
    notes: "",
  });

  const departments = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Customer Support",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.department
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/employees", formData);

      toast({
        title: "Employee Added Successfully!",
        description: `${formData.firstName} ${formData.lastName} has been added to the ${formData.department} department.`,
      });

      // 👇 Tell EmployeeList.tsx to reload data
      window.dispatchEvent(new Event("employeeAdded"));

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        salary: "",
        startDate: "",
        address: "",
        emergencyContact: "",
        notes: "",
      });
    } catch (error) {
      toast({
        title: "Error Adding Employee",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    }
  };
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      salary: "",
      startDate: "",
      address: "",
      emergencyContact: "",
      notes: "",
    });

    toast({
      title: "Form Reset",
      description: "All fields have been cleared.",
    });
  };
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
          Add New Employee
        </CardTitle>
        <CardDescription>
          Fill out the form below to add a new employee to your organization
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-slate-50/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                  className="bg-white/50 border-slate-200"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                  className="bg-white/50 border-slate-200"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="bg-white/50 border-slate-200"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="bg-white/50 border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="bg-blue-50/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Job Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger className="bg-white/50 border-slate-200">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                  placeholder="Enter job position"
                  className="bg-white/50 border-slate-200"
                />
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number" // <--- Add this
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g., 85000"
                  className="bg-white/50 border-slate-200"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="bg-white/50 border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-green-50/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter full address"
                  className="bg-white/50 border-slate-200"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e.target.value)
                  }
                  placeholder="Name and phone number"
                  className="bg-white/50 border-slate-200"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional notes or comments"
                  className="bg-white/50 border-slate-200"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="border-slate-300 hover:bg-slate-50"
            >
              <X className="w-4 h-4 mr-2" />
              Reset Form
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEmployeeForm;
