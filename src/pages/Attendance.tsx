import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Attendance() {
  // Mock data for the attendance tracker
  const subjects = [
    { id: 1, code: "CS301", name: "Data Structures", attended: 34, total: 40, percentage: 85 },
    { id: 2, code: "CS302", name: "Algorithms", attended: 31, total: 40, percentage: 78 },
    { id: 3, code: "CS303", name: "Computer Networks", attended: 37, total: 40, percentage: 92 },
    { id: 4, code: "CS304", name: "Database Systems", attended: 29, total: 40, percentage: 73 },
    { id: 5, code: "CS305", name: "Operating Systems", attended: 32, total: 40, percentage: 80 },
    { id: 6, code: "CS306", name: "Software Engineering", attended: 33, total: 40, percentage: 83 },
  ];

  // Mock data for detailed attendance
  const attendanceLog = [
    { date: "2025-04-01", subject: "Data Structures", status: "Present" },
    { date: "2025-04-01", subject: "Algorithms", status: "Present" },
    { date: "2025-04-01", subject: "Computer Networks", status: "Present" },
    { date: "2025-04-01", subject: "Database Systems", status: "Absent" },
    { date: "2025-04-02", subject: "Data Structures", status: "Present" },
    { date: "2025-04-02", subject: "Algorithms", status: "Present" },
    { date: "2025-04-02", subject: "Operating Systems", status: "Present" },
    { date: "2025-04-02", subject: "Software Engineering", status: "Present" },
    { date: "2025-04-03", subject: "Computer Networks", status: "Present" },
    { date: "2025-04-03", subject: "Database Systems", status: "Present" },
  ];

  const calculateAllowedAbsences = (attended: number, total: number) => {
    const currentPercentage = (attended / total) * 100;
    const totalClassesFor80Percent = Math.ceil(total * 1.25); // Total classes needed if we only attend 80%
    const allowedAbsences = Math.max(0, attended - Math.ceil(totalClassesFor80Percent * 0.8));
    
    return allowedAbsences;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Calculate overall attendance
  const overallAttended = subjects.reduce((sum, subject) => sum + subject.attended, 0);
  const overallTotal = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const overallPercentage = Math.round((overallAttended / overallTotal) * 100);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor your attendance and stay above the 80% requirement</p>
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Attendance Policy</AlertTitle>
          <AlertDescription>
            You must maintain at least 80% attendance in each subject to be eligible for the final semester exams.
          </AlertDescription>
        </Alert>

        <Card className="socse-card">
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
            <CardDescription>Your attendance across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{overallPercentage}%</div>
              <Progress 
                value={overallPercentage} 
                className="flex-1 h-3" 
                indicatorClassName={getProgressColor(overallPercentage)} 
              />
            </div>
            <div className="mt-2 text-sm text-right text-muted-foreground">
              {overallAttended} of {overallTotal} classes attended
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="summary">
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Card key={subject.id} className="socse-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription>{subject.code}</CardDescription>
                      </div>
                      <div 
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          subject.percentage >= 80 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {subject.percentage}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress 
                      value={subject.percentage} 
                      className="h-2 mt-1" 
                      indicatorClassName={getProgressColor(subject.percentage)} 
                    />
                    <div className="mt-4 flex justify-between items-center text-sm">
                      <span>
                        <span className="font-medium">{subject.attended}</span>/{subject.total} classes
                      </span>
                      <span className={subject.percentage < 80 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                        {subject.percentage < 80 
                          ? `Need to attend next ${Math.ceil((0.8 * subject.total - subject.attended) / 0.2)} classes` 
                          : `Can miss ${calculateAllowedAbsences(subject.attended, subject.total)} more classes`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card className="socse-card">
              <CardHeader>
                <CardTitle>Attendance Log</CardTitle>
                <CardDescription>Recent attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceLog.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                        <TableCell>{log.subject}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log.status === 'Present' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
