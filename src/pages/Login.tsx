// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import axios from "axios";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!username.trim()) {
//       setError("Email is required");
//       return false;
//     }
//     if (!password.trim()) {
//       setError("USN is required");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         username: username.trim(),
//         password: password.trim(),
//       });

//       if (response.data.success) {
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         toast({
//           title: "Login Successful",
//           description: `Welcome ${response.data.user.name}!`,
//         });
//         navigate("/dashboard");
//       } else {
//         const msg = response.data.message || "Invalid credentials";
//         setError(msg);
//         toast({
//           variant: "destructive",
//           title: "Login Failed",
//           description: msg,
//         });
//       }
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || "Failed to login.";
//       setError(errorMessage);
//       toast({
//         variant: "destructive",
//         title: "Login Failed",
//         description: errorMessage,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Student Login</CardTitle>
//           <CardDescription className="text-center">
//             Enter your credentials to access your account
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             {error && (
//               <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
//                 {error}
//               </div>
//             )}
//             <div className="space-y-2">
//               <Label htmlFor="username">Email</Label>
//               <Input
//                 id="username"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">USN</Label>
//               <Input
//                 id="password"
//                 type="text"
//                 placeholder="Enter your USN"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-2">
//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//             <div className="text-sm text-center text-gray-500">
//               <a href="#" className="text-primary hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Hardcoded users data
const users = [
  {
    usn: "1RV22CS001",
    name: "Aarav Sharma",
    email: "aarav.sharma@rvu.edu.in",
    section: "A",
    sex: "Male",
    dob: "2002-05-12",
    course: "B.E. Computer Science",
    coreCourses: ["Data Structures", "Algorithms", "Database Systems", "Operating Systems", "Networks"],
    electives: ["Cloud Computing", "Machine Learning"],
    semester: 6,
  },
  {
    usn: "1RV22CS002",
    name: "Ananya Verma",
    email: "ananya.verma@rvu.edu.in",
    section: "A",
    sex: "Female",
    dob: "2001-11-24",
    course: "B.E. Computer Science",
    coreCourses: ["Software Engineering", "Computer Architecture", "Web Technologies", "AI Fundamentals", "System Design"],
    electives: ["Big Data Analytics", "Cyber Security"],
    semester: 6,
  },
  {
    usn: "1RV22CS004",
    name: "Meera Singh",
    email: "meera.singh@rvu.edu.in",
    section: "B",
    sex: "Female",
    dob: "2002-04-05",
    course: "B.E. Computer Science",
    coreCourses: ["Machine Learning", "Blockchain Fundamentals", "Distributed Computing", "Quantum Computing", "Robotics"],
    electives: ["AR/VR Development", "Digital Image Processing"],
    semester: 6,
  },
  {
    usn: "1RV22CS005",
    name: "Aditya Rao",
    email: "aditya.rao@rvu.edu.in",
    section: "C",
    sex: "Male",
    dob: "2001-09-19",
    course: "B.E. Computer Science",
    coreCourses: ["Theory of Computation", "Embedded Systems", "Parallel Processing", "Cloud Computing", "Mobile Networks"],
    electives: ["Software Testing", "Computer Vision"],
    semester: 6,
  },
  {
    usn: "1RV22CS006",
    name: "Kavya Iyer",
    email: "kavya.iyer@rvu.edu.in",
    section: "C",
    sex: "Female",
    dob: "2002-08-14",
    course: "B.E. Computer Science",
    coreCourses: ["Cyber Security", "Digital Design", "Internet of Things", "Semantic Web", "Big Data"],
    electives: ["Information Retrieval", "Game Development"],
    semester: 6,
  },
  {
    usn: "1RV22CS007",
    name: "Pranav Kulkarni",
    email: "pranav.kulkarni@rvu.edu.in",
    section: "D",
    sex: "Male",
    dob: "2002-02-28",
    course: "B.E. Computer Science",
    coreCourses: ["Deep Learning", "Evolutionary Computing", "High-Performance Computing", "IoT Protocols", "Wireless Networks"],
    electives: ["Bioinformatics", "Digital Forensics"],
    semester: 6,
  },
  {
    usn: "1RV22CS008",
    name: "Shreya Pandey",
    email: "shreya.pandey@rvu.edu.in",
    section: "D",
    sex: "Female",
    dob: "2001-07-23",
    course: "B.E. Computer Science",
    coreCourses: ["Virtual Reality", "Multimedia Systems", "Ethical Hacking", "UX Design", "Data Visualization"],
    electives: ["Human-Computer Interaction", "Automata Theory"],
    semester: 6,
  },
  {
    usn: "1RV22CS009",
    name: "Vihaan Mehta",
    email: "vihaan.mehta@rvu.edu.in",
    section: "E",
    sex: "Male",
    dob: "2002-03-17",
    course: "B.E. Computer Science",
    coreCourses: ["Distributed Ledger Technology", "Functional Programming", "Security Protocols", "3D Graphics", "Web Programming"],
    electives: ["Open Source Software", "Entrepreneurship"],
    semester: 6,
  },
  {
    usn: "1RV22CS010",
    name: "Pooja Patil",
    email: "pooja.patil@rvu.edu.in",
    section: "E",
    sex: "Female",
    dob: "2001-12-11",
    course: "B.E. Computer Science",
    coreCourses: ["Full Stack Development", "Advanced Networking", "AI Ethics", "Digital Logic Design", "Database Management Systems"],
    electives: ["Blockchain Engineering", "Cloud Infrastructure"],
    semester: 6,
  },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password.trim()) {
      setError("USN is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    // Simulate login by checking hardcoded users
    const user = users.find(
      (u) => u.email.toLowerCase() === username.trim().toLowerCase() && u.usn === password.trim()
    );

    setTimeout(() => {
      if (user) {
        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Login Successful",
          description: `Welcome ${user.name}!`,
        });
        navigate("/dashboard");
      } else {
        const msg = "Invalid email or USN";
        setError(msg);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: msg,
        });
      }
      setIsLoading(false);
    }, 1000); // Simulating a delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Student Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="email"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">USN</Label>
              <Input
                id="password"
                type="text"
                placeholder="Enter your USN"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-sm text-center text-gray-500">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
