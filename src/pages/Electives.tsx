import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  // Updated elective data with your new courses
  const electiveData: Elective[] = [
    // University Electives - School of Computer Science and Engineering
    {
      id: "ue1",
      code: "UE101",
      name: "Fundamentals of Artificial Intelligence and Machine Learning",
      credits: 3,
      school: "School of Computer Science and Engineering",
      description: "Introduction to AI concepts, machine learning algorithms, and their applications.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Dr. Aditya Sharma",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 45,
      totalSeats: 60
    },
    {
      id: "ue2",
      code: "UE102",
      name: "Introduction to Nanotechnology",
      credits: 3,
      school: "School of Computer Science and Engineering",
      description: "Exploring the fundamentals of nanotechnology and its applications across industries.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Dr. Priya Mehta",
      slots: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      seatsAvailable: 30,
      totalSeats: 60
    },
    {
      id: "ue3",
      code: "UE103",
      name: "Essential Office Applications",
      credits: 2,
      school: "School of Computer Science and Engineering",
      description: "Practical training in productivity tools and office applications for professional use.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Prof. Rahul Verma",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30"],
      seatsAvailable: 55,
      totalSeats: 60
    },
    {
      id: "ue4",
      code: "UE104",
      name: "Using Generative AI in Digital Tools",
      credits: 3,
      school: "School of Computer Science and Engineering",
      description: "Practical applications of generative AI in various digital tools and creative workflows.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Dr. Shikha Gupta",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      seatsAvailable: 40,
      totalSeats: 60
    },
    
    // University Electives - School of Business
    {
      id: "ue5",
      code: "UE201",
      name: "Game Theory",
      credits: 3,
      school: "School of Business",
      description: "Strategic decision-making and its applications in economics, business, and other fields.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Dr. Rajiv Kumar",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 35,
      totalSeats: 60
    },
    {
      id: "ue6",
      code: "UE202",
      name: "Objects of Desire: Ultra-Luxury, Social Media, and Material Culture",
      credits: 3,
      school: "School of Business",
      description: "Exploring the intersection of luxury markets, consumer psychology, and social media influence.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Prof. Neha Singh",
      slots: ["Tue 9:30-11:00", "Thu 9:30-11:00"],
      seatsAvailable: 25,
      totalSeats: 60
    },
    
    // University Electives - School of Design and Innovation
    {
      id: "ue7",
      code: "UE301",
      name: "Introduction to Creative Painting",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Fundamentals of painting techniques, color theory, and creative expression.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Prof. Anjali Desai",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30"],
      seatsAvailable: 20,
      totalSeats: 40
    },
    {
      id: "ue8",
      code: "UE302",
      name: "Understanding the Users",
      credits: 3,
      school: "School of Design and Innovation",
      description: "User-centered design principles and methods for understanding user needs and behaviors.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Dr. Karan Shah",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "ue9",
      code: "UE303",
      name: "Personas and User Journeys",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Creating effective user personas and mapping user journeys for product design.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Prof. Meera Patel",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 25,
      totalSeats: 40
    },
    {
      id: "ue10",
      code: "UE304",
      name: "Understanding the LINE - An Enquiry through Photographs",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Exploring visual composition through photographic techniques and line theory.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Dr. Vikram Malhotra",
      slots: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      seatsAvailable: 20,
      totalSeats: 40
    },
    {
      id: "ue11",
      code: "UE305",
      name: "Model Making",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Hands-on workshop in creating physical models and prototypes for design concepts.",
      prerequisites: [],
      type: "university",
      semester: "5",
      faculty: "Prof. Alok Menon",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30"],
      seatsAvailable: 15,
      totalSeats: 30
    },
    {
      id: "ue12",
      code: "UE306",
      name: "Analysing Constructivist Composition",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Study of constructivist principles in art, design, and architecture.",
      prerequisites: [],
      type: "university",
      semester: "5",
      faculty: "Dr. Shalini Joshi",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      seatsAvailable: 20,
      totalSeats: 40
    },
    {
      id: "ue13",
      code: "UE307",
      name: "Smartphone Filmmaking",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Techniques for creating professional-quality videos using smartphones.",
      prerequisites: [],
      type: "university",
      semester: "5",
      faculty: "Prof. Arjun Kapoor",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 25,
      totalSeats: 40
    },
    {
      id: "ue14",
      code: "UE308",
      name: "New Media Productions",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Exploring emerging media formats and production techniques for digital platforms.",
      prerequisites: [],
      type: "university",
      semester: "6",
      faculty: "Dr. Rishi Kumar",
      slots: ["Tue 9:30-11:00", "Thu 9:30-11:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "ue15",
      code: "UE309",
      name: "Photography-L1",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Introduction to photography techniques, composition, and digital imaging.",
      prerequisites: [],
      type: "university",
      semester: "6",
      faculty: "Prof. Sana Qureshi",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30"],
      seatsAvailable: 20,
      totalSeats: 30
    },
    
    // University Electives - School of Law
    {
      id: "ue16",
      code: "UE401",
      name: "Negotiation and Mediation Act",
      credits: 3,
      school: "School of Law",
      description: "Understanding the legal frameworks and practical skills for negotiation and mediation.",
      prerequisites: [],
      type: "university",
      semester: "5",
      faculty: "Dr. Amitabh Chaturvedi",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 35,
      totalSeats: 50
    },
    
    // University Electives - School of Economics and Public Policy
    {
      id: "ue17",
      code: "UE501",
      name: "Fundamentals of Public Health Informatics - I",
      credits: 3,
      school: "School of Economics and Public Policy",
      description: "Introduction to health informatics systems and their role in public health (provided with the University of Oslo).",
      prerequisites: [],
      type: "university",
      semester: "5",
      faculty: "Dr. Sudha Rani",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 30,
      totalSeats: 50
    },
    {
      id: "ue18",
      code: "UE502",
      name: "Mathematics in Indian Knowledge Systems - Correcting Wrong History",
      credits: 3,
      school: "School of Economics and Public Policy",
      description: "Exploring mathematical contributions from ancient Indian knowledge systems and their historical context.",
      prerequisites: [],
      type: "university",
      semester: "6",
      faculty: "Prof. Vishnu Sharma",
      slots: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      seatsAvailable: 40,
      totalSeats: 60
    },
    {
      id: "ue19",
      code: "UE503",
      name: "Bhagavad Gita- Life Lessons",
      credits: 3,
      school: "School of Economics and Public Policy",
      description: "Philosophical insights and practical wisdom from the Bhagavad Gita for modern life.",
      prerequisites: [],
      type: "university",
      semester: "6",
      faculty: "Dr. Radha Krishnan",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30"],
      seatsAvailable: 45,
      totalSeats: 60
    },
    
    // Additional University Electives - Various Schools
    {
      id: "ue20",
      code: "UE601",
      name: "Balancing Toys - Playing with Physics",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Practical exploration of physics principles through toy design and creation.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Prof. Deepak Verma",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30"],
      seatsAvailable: 25,
      totalSeats: 40
    },
    {
      id: "ue21",
      code: "UE602",
      name: "Weaving Stories",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Narrative techniques and storytelling through textile and visual mediums.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Dr. Latika Sharma",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 20,
      totalSeats: 30
    },
    {
      id: "ue22",
      code: "UE603",
      name: "Japanese",
      credits: 3,
      school: "School of Economics and Public Policy",
      description: "Introductory course to Japanese language and culture.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Prof. Yuki Tanaka",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "ue23",
      code: "UE604",
      name: "Basic Theater Arts",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Introduction to acting, stage presence, and theatrical performance.",
      prerequisites: [],
      type: "university",
      semester: "5",
      faculty: "Prof. Nandita Das",
      slots: ["Tue 2:00-3:30", "Thu 2:00-3:30"],
      seatsAvailable: 25,
      totalSeats: 40
    },
    {
      id: "ue24",
      code: "UE605",
      name: "Guitar - Level 1",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Fundamental guitar techniques for beginners.",
      prerequisites: [],
      type: "university",
      semester: "4",
      faculty: "Prof. Rahul Sharma",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 15,
      totalSeats: 20
    },
    {
      id: "ue25",
      code: "UE606",
      name: "Drumming - Level 1",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Basic drumming techniques and rhythm foundations.",
      prerequisites: [],
      type: "university",
      semester: "3",
      faculty: "Prof. Tarun Nayar",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      seatsAvailable: 10,
      totalSeats: 15
    },
    {
      id: "ue26",
      code: "UE607",
      name: "Drumming - Level 2",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Intermediate drumming techniques and complex rhythms.",
      prerequisites: ["UE606"],
      type: "university",
      semester: "4",
      faculty: "Prof. Tarun Nayar",
      slots: ["Tue 9:30-11:00", "Thu 9:30-11:00"],
      seatsAvailable: 8,
      totalSeats: 15
    },
    {
      id: "ue27",
      code: "UE608",
      name: "Drumming - Level 3",
      credits: 2,
      school: "School of Design and Innovation",
      description: "Advanced drumming techniques and performance practices.",
      prerequisites: ["UE607"],
      type: "university",
      semester: "5",
      faculty: "Prof. Tarun Nayar",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30"],
      seatsAvailable: 5,
      totalSeats: 10
    },
    {
      id: "ue28",
      code: "UE609",
      name: "Kuchipudi",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Introduction to Kuchipudi classical dance form and its techniques.",
      prerequisites: [],
      type: "university",
      semester: "6",
      faculty: "Dr. Madhavi Reddy",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 15,
      totalSeats: 25
    },
    {
      id: "ue29",
      code: "UE610",
      name: "Contemporary Dance",
      credits: 3,
      school: "School of Design and Innovation",
      description: "Modern dance techniques, improvisation, and choreography.",
      prerequisites: [],
      type: "university",
      semester: "6",
      faculty: "Prof. Aishwarya Kumar",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 20,
      totalSeats: 30
    },
    
    // Professional Electives - 5th Semester
    {
      id: "pe1",
      code: "PE501",
      name: "Optimization of Machine Learning",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Advanced techniques for optimizing machine learning models and algorithms.",
      prerequisites: ["CS301"],
      type: "professional",
      semester: "5",
      faculty: "Dr. Vivek Goyal",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 35,
      totalSeats: 40
    },
    {
      id: "pe2",
      code: "PE502",
      name: "Data Science",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Comprehensive introduction to data science methodologies and analytics.",
      prerequisites: ["CS202", "MA201"],
      type: "professional",
      semester: "5",
      faculty: "Prof. Neha Sharma",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "pe3",
      code: "PE503",
      name: "Fundamentals of Deep Learning",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Core concepts of neural networks and deep learning architectures.",
      prerequisites: ["CS301", "MA202"],
      type: "professional",
      semester: "5",
      faculty: "Dr. Rajesh Sharma",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30"],
      seatsAvailable: 40,
      totalSeats: 45
    },
    {
      id: "pe4",
      code: "PE504",
      name: "Fundamentals of Cyber Security",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Essential principles and practices of information security and cybersecurity.",
      prerequisites: ["CS204"],
      type: "professional",
      semester: "5",
      faculty: "Prof. Arun Mishra",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "pe5",
      code: "PE505",
      name: "Web Development",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Modern web development techniques, frameworks, and best practices.",
      prerequisites: ["CS203"],
      type: "professional",
      semester: "5",
      faculty: "Dr. Sandeep Kumar",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 35,
      totalSeats: 45
    },
    {
      id: "pe6",
      code: "PE506",
      name: "Fundamentals of Cloud Computing",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Introduction to cloud infrastructure, services, and deployment models.",
      prerequisites: ["CS302"],
      type: "professional",
      semester: "5",
      faculty: "Prof. Manish Gupta",
      slots: ["Tue 9:30-11:00", "Thu 9:30-11:00"],
      seatsAvailable: 25,
      totalSeats: 40
    },
    
    // Professional Electives - 6th Semester
    {
      id: "pe7",
      code: "PE601",
      name: "AWS Cloud Platform",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Comprehensive study of Amazon Web Services cloud infrastructure and services.",
      prerequisites: ["PE506"],
      type: "professional",
      semester: "6",
      faculty: "Dr. Amit Jain",
      slots: ["Mon 9:30-11:00", "Wed 9:30-11:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "pe8",
      code: "PE602",
      name: "Ethical Hacking",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Techniques and methodologies for identifying and addressing security vulnerabilities.",
      prerequisites: ["PE504"],
      type: "professional",
      semester: "6",
      faculty: "Prof. Ravi Shankar",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30"],
      seatsAvailable: 25,
      totalSeats: 35
    },
    {
      id: "pe9",
      code: "PE603",
      name: "Web Application Security",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Security concepts and practices specific to web applications and services.",
      prerequisites: ["PE504", "PE505"],
      type: "professional",
      semester: "6",
      faculty: "Dr. Kavita Verma",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "pe10",
      code: "PE604",
      name: "Machine Learning Operations and Large Language Model Operations",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Operational aspects of deploying and managing ML systems and large language models.",
      prerequisites: ["PE501"],
      type: "professional",
      semester: "6",
      faculty: "Prof. Siddharth Malhotra",
      slots: ["Tue 3:30-5:00", "Thu 3:30-5:00"],
      seatsAvailable: 35,
      totalSeats: 40
    },
    {
      id: "pe11",
      code: "PE605",
      name: "Fundamentals of Natural Language Processing",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Core concepts and techniques in computational linguistics and text processing.",
      prerequisites: ["PE503"],
      type: "professional",
      semester: "6",
      faculty: "Dr. Alisha Patel",
      slots: ["Mon 3:30-5:00", "Wed 3:30-5:00"],
      seatsAvailable: 30,
      totalSeats: 40
    },
    {
      id: "pe12",
      code: "PE606",
      name: "Large Language Models",
      credits: 4,
      school: "School of Computer Science and Engineering",
      description: "Advanced study of transformer-based models, their architecture, training, and applications.",
      prerequisites: ["PE503", "PE605"],
      type: "professional",
      semester: "6",
      faculty: "Prof. Venkat Raman",
      slots: ["Tue 9:30-11:00", "Thu 9:30-11:00"],
      seatsAvailable: 25,
      totalSeats: 35
    },
    
    // Minors offered by SoCSE - 6th Semester
    {
      id: "min1",
      code: "MIN601",
      name: "AI and Data Science",
      credits: 12,
      school: "School of Computer Science and Engineering",
      description: "Comprehensive minor program focusing on artificial intelligence and data science applications.",
      prerequisites: ["CS301", "MA202"],
      type: "minor",
      semester: "6",
      faculty: "Dr. Sunita Rao",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30", "Fri 9:30-11:00"],
      seatsAvailable: 20,
      totalSeats: 30
    },
    {
      id: "min2",
      code: "MIN602",
      name: "Fintech",
      credits: 12,
      school: "School of Computer Science and Engineering",
      description: "Minor program covering financial technologies, blockchain, and digital payment systems.",
      prerequisites: ["CS301", "EC201"],
      type: "minor",
      semester: "6",
      faculty: "Prof. Kiran Shah",
      slots: ["Tue 2:00-3:30", "Thu 2:00-3:30", "Fri 11:00-12:30"],
      seatsAvailable: 25,
      totalSeats: 30
    },
    {
      id: "min3",
      code: "MIN603",
      name: "AI for Good",
      credits: 12,
      school: "School of Computer Science and Engineering",
      description: "Minor program exploring AI applications in healthcare, environment, education, and social welfare.",
      prerequisites: ["CS301"],
      type: "minor",
      semester: "6",
      faculty: "Dr. Mohan Reddy",
      slots: ["Mon 11:00-12:30", "Wed 11:00-12:30", "Fri 2:00-3:30"],
      seatsAvailable: 30,
      totalSeats: 35
    },
    {
      id: "min4",
      code: "MIN604",
      name: "Innovation, Entrepreneurship and Product Development",
      credits: 12,
      school: "School of Computer Science and Engineering",
      description: "Minor program providing frameworks for tech innovation, entrepreneurship, and product management.",
      prerequisites: [],
      type: "minor",
      semester: "6",
      faculty: "Prof. Rohit Kapoor",
      slots: ["Tue 11:00-12:30", "Thu 11:00-12:30", "Fri 3:30-5:00"],
      seatsAvailable: 35,
      totalSeats: 40
    },
    {
      id: "min5",
      code: "MIN605",
      name: "Robotics and Industrial Automation",
      credits: 12,
      school: "School of Computer Science and Engineering",
      description: "Minor program covering robotics systems, sensors, actuators, and industrial automation technologies.",
      prerequisites: ["CS304", "EE201"],
      type: "minor",
      semester: "6",
      faculty: "Dr. Vikram Singh",
      slots: ["Mon 2:00-3:30", "Wed 2:00-3:30", "Fri 11:00-12:30"],
      seatsAvailable: 20,
      totalSeats: 25
    }
  ];

  // Get unique semesters for tabs
  const semesters = Array.from(new Set(electiveData.map(elective => elective.semester))).sort();

  // Filter electives based on search and filters
  const filteredElectives = electiveData.filter(elective => {
    // Filter by search query
    const matchesSearch = 
      elective.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elective.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elective.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      elective.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
