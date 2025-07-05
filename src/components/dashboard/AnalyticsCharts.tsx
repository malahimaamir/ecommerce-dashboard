
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, Clock, Target, Award } from "lucide-react";

const AnalyticsCharts = () => {
  // Sample data for charts
  const monthlyHiring = [
    { month: 'Jan', hired: 12, left: 3 },
    { month: 'Feb', hired: 8, left: 5 },
    { month: 'Mar', hired: 15, left: 2 },
    { month: 'Apr', hired: 18, left: 4 },
    { month: 'May', hired: 10, left: 6 },
    { month: 'Jun', hired: 22, left: 1 }
  ];

  const departmentData = [
    { department: 'Engineering', employees: 45, color: '#3B82F6' },
    { department: 'Sales', employees: 25, color: '#10B981' },
    { department: 'Marketing', employees: 18, color: '#F59E0B' },
    { department: 'Design', employees: 12, color: '#8B5CF6' },
    { department: 'HR', employees: 8, color: '#EF4444' },
    { department: 'Finance', employees: 15, color: '#6366F1' }
  ];

  const salaryTrends = [
    { year: '2020', avgSalary: 65000 },
    { year: '2021', avgSalary: 68000 },
    { year: '2022', avgSalary: 71000 },
    { year: '2023', avgSalary: 75000 },
    { year: '2024', avgSalary: 78000 }
  ];

  const performanceData = [
    { quarter: 'Q1', performance: 88, satisfaction: 92 },
    { quarter: 'Q2', performance: 91, satisfaction: 89 },
    { quarter: 'Q3', performance: 94, satisfaction: 93 },
    { quarter: 'Q4', performance: 89, satisfaction: 91 }
  ];

  const keyMetrics = [
    {
      title: "Employee Retention",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: Users,
      color: "green"
    },
    {
      title: "Avg. Performance",
      value: "90.5%",
      change: "+3.2%",
      changeType: "positive",
      icon: Target,
      color: "blue"
    },
    {
      title: "Training Hours",
      value: "1,248",
      change: "+15%",
      changeType: "positive",
      icon: Clock,
      color: "purple"
    },
    {
      title: "Satisfaction Score",
      value: "4.7/5",
      change: "+0.3",
      changeType: "positive",
      icon: Award,
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = getColorClasses(metric.color);
          
          return (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
                    <p className={`text-xs flex items-center mt-2 ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className="mr-1">
                        {metric.changeType === 'positive' ? '↗' : '↘'}
                      </span>
                      {metric.change} from last period
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Hiring Trends */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Hiring Trends
            </CardTitle>
            <CardDescription>Monthly hiring vs departures</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyHiring}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="hired" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="left" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="employees"
                  label={({ department, employees }) => `${department}: ${employees}`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Trends */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Salary Trends
            </CardTitle>
            <CardDescription>Average salary growth over years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgSalary" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance & Satisfaction */}
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Performance & Satisfaction</CardTitle>
            <CardDescription>Quarterly performance and satisfaction scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="quarter" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="performance" 
                  stackId="1"
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stackId="2"
                  stroke="#F59E0B" 
                  fill="#F59E0B"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle>Analytics Summary</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
              <p className="text-sm text-slate-600">Employee engagement rate shows strong team satisfaction</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">+22%</div>
              <p className="text-sm text-slate-600">Year-over-year growth in team productivity metrics</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
              <p className="text-sm text-slate-600">Average training hours per employee this quarter</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
