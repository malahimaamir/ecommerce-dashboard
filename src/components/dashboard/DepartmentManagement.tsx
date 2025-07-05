
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DepartmentManagement = () => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Engineering",
      description: "Software development and technical operations",
      employeeCount: 45,
      budget: "$2,400,000",
      manager: "John Smith",
      status: "Active",
      color: "blue"
    },
    {
      id: 2,
      name: "Design",
      description: "UI/UX design and creative services",
      employeeCount: 12,
      budget: "$800,000",
      manager: "Sarah Jones",
      status: "Active",
      color: "purple"
    },
    {
      id: 3,
      name: "Marketing",
      description: "Brand promotion and customer outreach",
      employeeCount: 18,
      budget: "$1,200,000",
      manager: "Mike Wilson",
      status: "Active",
      color: "green"
    },
    {
      id: 4,
      name: "Sales",
      description: "Revenue generation and client relations",
      employeeCount: 25,
      budget: "$1,800,000",
      manager: "Emily Chen",
      status: "Active",
      color: "orange"
    },
    {
      id: 5,
      name: "HR",
      description: "Human resources and employee relations",
      employeeCount: 8,
      budget: "$600,000",
      manager: "David Brown",
      status: "Active",
      color: "indigo"
    },
    {
      id: 6,
      name: "Finance",
      description: "Financial planning and accounting",
      employeeCount: 15,
      budget: "$900,000",
      manager: "Lisa Davis",
      status: "Active",
      color: "red"
    }
  ]);

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    manager: '',
    budget: ''
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      green: "bg-green-100 text-green-700 border-green-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200",
      indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
      red: "bg-red-100 text-red-700 border-red-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      orange: "from-orange-500 to-orange-600",
      indigo: "from-indigo-500 to-indigo-600",
      red: "from-red-500 to-red-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in the required fields.",
        variant: "destructive"
      });
      return;
    }

    const department = {
      id: departments.length + 1,
      name: newDepartment.name,
      description: newDepartment.description,
      employeeCount: 0,
      budget: newDepartment.budget || "$0",
      manager: newDepartment.manager || "TBD",
      status: "Active",
      color: "blue"
    };

    setDepartments([...departments, department]);
    
    toast({
      title: "Department Added",
      description: `${newDepartment.name} department has been created successfully.`,
    });

    setNewDepartment({ name: '', description: '', manager: '', budget: '' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteDepartment = (id: number, name: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: "Department Deleted",
      description: `${name} department has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                Department Management
              </CardTitle>
              <CardDescription>
                Manage organizational departments and their structure
              </CardDescription>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200">
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>
                    Create a new department for your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deptName">Department Name *</Label>
                    <Input
                      id="deptName"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      placeholder="e.g., Operations"
                      className="bg-white/50 border-slate-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deptDescription">Description *</Label>
                    <Textarea
                      id="deptDescription"
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      placeholder="Brief description of the department"
                      className="bg-white/50 border-slate-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deptManager">Department Manager</Label>
                    <Input
                      id="deptManager"
                      value={newDepartment.manager}
                      onChange={(e) => setNewDepartment({...newDepartment, manager: e.target.value})}
                      placeholder="Manager name"
                      className="bg-white/50 border-slate-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deptBudget">Budget</Label>
                    <Input
                      id="deptBudget"
                      value={newDepartment.budget}
                      onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                      placeholder="e.g., $500,000"
                      className="bg-white/50 border-slate-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-slate-300"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddDepartment}>
                      Create Department
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Departments</p>
                <p className="text-2xl font-bold text-slate-900">{departments.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Employees</p>
                <p className="text-2xl font-bold text-slate-900">
                  {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Team Size</p>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.round(departments.reduce((sum, dept) => sum + dept.employeeCount, 0) / departments.length)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Status</p>
                <p className="text-2xl font-bold text-slate-900">100%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(department => (
          <Card key={department.id} className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getIconColor(department.color)}`}>
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <Badge className={getColorClasses(department.color)}>
                      {department.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteDepartment(department.id, department.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{department.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Manager:</span>
                  <span className="text-sm font-medium text-slate-900">{department.manager}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Employees:</span>
                  <span className="text-sm font-medium text-slate-900">{department.employeeCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Budget:</span>
                  <span className="text-sm font-medium text-slate-900">{department.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement;
