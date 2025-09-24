import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardOverview = () => {
  // Mock data - Replace with actual API calls when backend is ready
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      change: "+12%",
      icon: CheckSquare,
      color: "text-primary"
    },
    {
      title: "In Progress",
      value: "8",
      change: "+4%",
      icon: Clock,
      color: "text-warning"
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2%",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-primary"
    }
  ];

  const recentTasks = [
    {
      id: "1",
      title: "Design new landing page",
      status: "in-progress" as const,
      priority: "high" as const,
      dueDate: "2024-01-15"
    },
    {
      id: "2",
      title: "Implement user authentication", 
      status: "completed" as const,
      priority: "high" as const,
      dueDate: "2024-01-12"
    },
    {
      id: "3",
      title: "Write API documentation",
      status: "todo" as const,
      priority: "medium" as const,
      dueDate: "2024-01-20"
    },
    {
      id: "4",
      title: "Setup database migrations",
      status: "in-progress" as const,
      priority: "medium" as const,
      dueDate: "2024-01-18"
    }
  ];

  const projects = [
    {
      name: "TaskFlow Web App",
      progress: 75,
      dueDate: "Jan 30, 2024",
      team: 5
    },
    {
      name: "Mobile App MVP",
      progress: 45,
      dueDate: "Feb 15, 2024", 
      team: 3
    },
    {
      name: "API Documentation",
      progress: 30,
      dueDate: "Feb 5, 2024",
      team: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user.name || "User"}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>
        
        <Link to="/dashboard/tasks">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="outline" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5" />
                  <span>Recent Tasks</span>
                </CardTitle>
                <CardDescription>
                  Your latest task updates
                </CardDescription>
              </div>
              <Link to="/dashboard/tasks">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Project Progress</span>
                </CardTitle>
                <CardDescription>
                  Track your active projects
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due {project.dueDate}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {project.team} members
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/tasks">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <CardContent className="p-6 text-center">
                  <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium">Create Task</h4>
                  <p className="text-sm text-muted-foreground">Add a new task to your project</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/dashboard/team">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium">Invite Team</h4>
                  <p className="text-sm text-muted-foreground">Collaborate with your team</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/dashboard/settings">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium">Project Settings</h4>
                  <p className="text-sm text-muted-foreground">Configure your workspace</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;