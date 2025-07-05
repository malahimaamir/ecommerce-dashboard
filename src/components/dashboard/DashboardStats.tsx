import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Building2, TrendingUp, DollarSign, Clock } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Today",
      value: "198",
      change: "+5%",
      changeType: "positive",
      icon: UserCheck,
      color: "green"
    },
    {
      title: "Departments",
      value: "8",
      change: "+1",
      changeType: "positive",
      icon: Building2,
      color: "purple"
    },
    {
      title: "Avg. Salary",
      value: "$75,450",
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
      color: "orange"
    },
    {
      title: "Performance",
      value: "94%",
      change: "+2%",
      changeType: "positive",
      icon: TrendingUp,
      color: "indigo"
    },
    {
      title: "On Leave",
      value: "12",
      change: "-3",
      changeType: "negative",
      icon: Clock,
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 text-blue-600",
      green: "from-green-500 to-green-600 text-green-600",
      purple: "from-purple-500 to-purple-600 text-purple-600",
      orange: "from-orange-500 to-orange-600 text-orange-600",
      indigo: "from-indigo-500 to-indigo-600 text-indigo-600",
      red: "from-red-500 to-red-600 text-red-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <Card key={index} className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses.split('text-')[0]}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <p className={`text-xs flex items-center ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className={`mr-1 ${
                  stat.changeType === 'positive' ? '↗' : '↘'
                }`}>
                  {stat.changeType === 'positive' ? '↗' : '↘'}
                </span>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
