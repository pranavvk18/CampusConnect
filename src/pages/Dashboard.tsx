
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Calendar, CheckCircle, CircleAlert, ClipboardCheck, Search, UserRound } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data for dashboard
  const attendanceData = [
    { subject: "Data Structures", percentage: 85, classes: "34/40" },
    { subject: "Algorithms", percentage: 78, classes: "31/40" },
    { subject: "Computer Networks", percentage: 92, classes: "37/40" },
    { subject: "Database Systems", percentage: 73, classes: "29/40" },
  ];

  // Mock upcoming events
  const upcomingEvents = [
    { title: "Mid-semester Exam", date: "April 15, 2025", type: "exam" },
    { title: "Hackathon Registration Deadline", date: "April 20, 2025", type: "deadline" },
    { title: "Campus Placement Drive", date: "April 25, 2025", type: "event" },
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam": return <Calendar className="h-4 w-4 text-blue-500" />;
      case "deadline": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "event": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <CircleAlert className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your academic status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="socse-card socse-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ClipboardCheck className="h-5 w-5 mr-2 text-socse-DEFAULT" />
                Attendance
              </CardTitle>
              <CardDescription>Your current attendance status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">82%</div>
              <p className="text-sm text-muted-foreground">Overall Average</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link to="/attendance">View Details →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="socse-card socse-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-socse-DEFAULT" />
                Electives
              </CardTitle>
              <CardDescription>Course registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">Open</div>
              <p className="text-sm text-muted-foreground">Registration closing soon</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link to="/electives">Register Now →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="socse-card socse-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Search className="h-5 w-5 mr-2 text-socse-DEFAULT" />
                Lost & Found
              </CardTitle>
              <CardDescription>Recent items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">12</div>
              <p className="text-sm text-muted-foreground">New items this week</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link to="/lost-found">Browse Items →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="socse-card socse-card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <UserRound className="h-5 w-5 mr-2 text-socse-DEFAULT" />
                Digital ID
              </CardTitle>
              <CardDescription>Quick access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">Active</div>
              <p className="text-sm text-muted-foreground">ID verified</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link to="/digital-id">Show ID →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="socse-card col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Subject-wise attendance percentages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((subject) => (
                  <div key={subject.subject} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{subject.subject}</span>
                      <span className="font-medium">{subject.percentage}% ({subject.classes})</span>
                    </div>
                    <Progress 
                      value={subject.percentage} 
                      className="h-2" 
                      indicatorClassName={getProgressColor(subject.percentage)} 
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/attendance">View Full Attendance Report</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="socse-card">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates to remember</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                    <div className="mt-0.5">
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/calendar">View Calendar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
