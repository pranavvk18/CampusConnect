
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, FileText, GraduationCap, Users, Search, Filter } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define elective type
interface Elective {
  id: string;
  code: string;
  name: string;
  credits: number;
  school: string;
  description: string;
  prerequisites: string[];
  type: "university" | "professional" | "minor";
  semester: string;
  faculty: string;
  slots: string[];
  seatsAvailable: number;
  totalSeats: number;
}

export default function Electives() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSchool, setFilterSchool] = useState("all");

  // Mock data for university electives
  const electiveData: Elective[] = [
    {
      id: "1",
      code: "UE101",
      name: "Introduction to Psychology",
      credits: 3,
      school: "School of Liberal Arts",
      description: "An introductory course to understand basic concepts of psychology and human behavior.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Dr. Sarah Johnson",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 45,
      totalSeats: 60
    },
    {
      id: "2",
      code: "UE102",
      name: "Environmental Science",
      credits: 3,
      school: "School of Environmental Studies",
      description: "Understand environmental challenges and sustainable solutions for the modern world.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Dr. Robert Miller",
      slots: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      seatsAvailable: 30,
      totalSeats: 60
    },
    {
      id: "3",
      code: "UE203",
      name: "Business Economics",
      credits: 4,
      school: "School of Business",
      description: "Application of economic principles in business decision making.",
      prerequisites: ["UE101"],
      type: "university",
      semester: "4",
      faculty: "Prof. James Wilson",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30"],
      seatsAvailable: 55,
      totalSeats: 60
    },
    {
      id: "4",
      code: "PE301",
      name: "Machine Learning",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Advanced algorithms and techniques for machine learning applications.",
      prerequisites: ["CS201", "MA202"],
      type: "professional",
      semester: "5",
      faculty: "Dr. Alan Turing",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      seatsAvailable: 25,
      totalSeats: 40
    },
    {
      id: "5", 
      code: "PE302",
      name: "Cloud Computing",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Fundamentals of cloud architectures, services, and deployment models.",
      prerequisites: ["CS202"],
      type: "professional",
      semester: "5",
      faculty: "Prof. Lisa Chang",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 35,
      totalSeats: 40
    },
    {
      id: "6",
      code: "MIN201",
      name: "Financial Management",
      credits: 3,
      school: "School of Business",
      description: "Core concepts of financial management and investment strategies.",
      prerequisites: [],
      type: "minor",
      semester: "4",
      faculty: "Dr. Michael Scott",
      slots: ["Tue 9:30-11:00", "Thu 9:30-11:00"],
      seatsAvailable: 20,
      totalSeats: 30
    },
    {
      id: "7",
      code: "UE204",
      name: "Introduction to Sociology",
      credits: 3,
      school: "School of Liberal Arts",
      description: "Understanding social structures and human societies.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Dr. Emily Rodriguez",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30"],
      seatsAvailable: 40,
      totalSeats: 60
    },
    {
      id: "8",
      code: "PE401",
      name: "Blockchain Technology",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Fundamentals of blockchain, cryptocurrencies, and decentralized applications.",
      prerequisites: ["CS301"],
      type: "professional",
      semester: "6",
      faculty: "Prof. David Lee",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
  ];

  // Get unique semesters for tabs
  const semesters = Array.from(new Set(electiveData.map(elective => elective.semester))).sort();

  // Filter electives based on search and filters
  const filteredElectives = electiveData.filter(elective => {
    // Filter by search query
    const matchesSearch = 
      elective.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elective.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elective.faculty.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = filterType === "all" || elective.type === filterType;
    
    // Filter by school
    const matchesSchool = filterSchool === "all" || elective.school === filterSchool;
    
    return matchesSearch && matchesType && matchesSchool;
  });

  // Get unique schools for filter
  const schools = Array.from(new Set(electiveData.map(elective => elective.school)));

  // Helper function to get badge color based on elective type
  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case "university": return "bg-blue-500 hover:bg-blue-600";
      case "professional": return "bg-green-500 hover:bg-green-600";
      case "minor": return "bg-purple-500 hover:bg-purple-600";
      default: return "";
    }
  };

  // Helper function to get text for elective type
  const getTypeText = (type: string) => {
    switch(type) {
      case "university": return "University Elective";
      case "professional": return "Professional Elective";
      case "minor": return "Minor";
      default: return type;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Electives</h1>
          <p className="text-muted-foreground mt-1">Browse and register for university electives, professional electives, and minors.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search electives..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="university">University Electives</SelectItem>
                  <SelectItem value="professional">Professional Electives</SelectItem>
                  <SelectItem value="minor">Minors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={filterSchool} onValueChange={setFilterSchool}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs for different semesters */}
        <Tabs defaultValue={semesters[0]} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-2">
            {semesters.map((semester) => (
              <TabsTrigger key={semester} value={semester}>
                Semester {semester}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {semesters.map((semester) => (
            <TabsContent key={semester} value={semester}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredElectives
                  .filter(elective => elective.semester === semester)
                  .map((elective) => (
                    <Card key={elective.id} className="socse-card">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{elective.name}</CardTitle>
                            <CardDescription>{elective.code} • {elective.credits} Credits</CardDescription>
                          </div>
                          <Badge className={getTypeBadgeColor(elective.type)}>
                            {getTypeText(elective.type)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm">{elective.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{elective.school}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{elective.faculty}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {elective.prerequisites.length > 0 
                                ? elective.prerequisites.join(", ") 
                                : "No prerequisites"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{elective.slots[0]}</span>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-sm">
                            <strong>{elective.seatsAvailable}</strong> of {elective.totalSeats} seats available
                          </span>
                          <Button size="sm">Register</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {filteredElectives.filter(elective => elective.semester === semester).length === 0 && (
                  <div className="col-span-2 p-8 text-center">
                    <p className="text-muted-foreground">No electives found for the selected filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
}
