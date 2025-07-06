import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import EmployeeList from "@/components/dashboard/EmployeeList";
import AddEmployeeForm from "@/components/dashboard/AddEmployeeForm";
import DepartmentManagement from "@/components/dashboard/DepartmentManagement";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

interface Employee {
  _id: string;
  name: string;
  department: string;
  createdAt: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [recentEmployees, setRecentEmployees] = useState<Employee[]>([]);

  const handleSignOut = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      window.location.href = "/auth"; // ⬅️ redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/recent-employees")
      .then((res) => res.json())
      .then(setRecentEmployees)
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Employee Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Manage your workforce efficiently
                </p>
              </div>
            </div>

            {/* ✅ Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white/50 backdrop-blur-sm border border-slate-200 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="employees"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Employees
            </TabsTrigger>
            <TabsTrigger
              value="add-employee"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Departments
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest employee updates and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEmployees.length > 0 ? (
                      recentEmployees.map((employee) => (
                        <div
                          key={employee._id}
                          className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-slate-700">
                            {employee.name} joined {employee.department} team
                          </span>
                          <span className="text-xs text-slate-500 ml-auto">
                            {formatDistanceToNow(new Date(employee.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">
                        No recent activity yet.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setActiveTab("add-employee")}
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Employee
                  </Button>
                  <Button
                    onClick={() => setActiveTab("departments")}
                    variant="outline"
                    className="w-full justify-start border-slate-300 hover:bg-slate-50"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Manage Departments
                  </Button>
                  <Button
                    onClick={() => setActiveTab("analytics")}
                    variant="outline"
                    className="w-full justify-start border-slate-300 hover:bg-slate-50"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeList />
          </TabsContent>

          <TabsContent value="add-employee">
            <AddEmployeeForm />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
