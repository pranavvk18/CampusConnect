// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import { BellIcon } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "@/components/ui/use-toast";

// export function Header() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     usn: "",
//     name: "",
//     email: "",
//     section: "",
//     gender: "",
//     dob: "",
//     course: "",
//     semester: "",
//     core_course_1: "",
//     core_course_2: "",
//     core_course_3: "",
//     core_course_4: "",
//     core_course_5: "",
//   });

//   useEffect(() => {
//     // Get user data from localStorage on component mount
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setUser({
//           usn: userData.usn || "",
//           name: userData.name || "Student",
//           email: userData.email || "",
//           section: userData.section || "",
//           gender: userData.gender || "",
//           dob: userData.dob || "",
//           course: userData.course || "",
//           semester: userData.semester || "",
//           core_course_1: userData.core_course_1 || "",
//           core_course_2: userData.core_course_2 || "",
//           core_course_3: userData.core_course_3 || "",
//           core_course_4: userData.core_course_4 || "",
//           core_course_5: userData.core_course_5 || "",
//         });
//       } catch (error) {
//         console.error("Failed to parse user data", error);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     toast({
//       title: "Logged out",
//       description: "You have been successfully logged out",
//     });
//     navigate("/login");
//   };

//   return (
//     <header className="border-b px-4 py-3 flex items-center justify-between bg-white">
//       <div className="flex items-center">
//         <SidebarTrigger />
//       </div>

//       <div className="flex items-center gap-2">
//         <Button variant="ghost" size="icon" className="relative">
//           <BellIcon className="h-5 w-5" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </Button>
        
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="relative p-1 flex items-center gap-2 hover:bg-slate-50">
//               <Avatar className="h-8 w-8">
//                 <AvatarFallback className="bg-socse-light text-white">
//                   {user.name ? user.name.charAt(0) : "S"}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="hidden md:flex flex-col text-left text-sm">
//                 <span className="font-medium">{user.name}</span>
//                 <span className="text-xs text-muted-foreground">{user.usn}</span>
//               </div>
//             </Button>
//           </DropdownMenuTrigger>
          
//           <DropdownMenuContent align="end" className="w-72">
//             <div className="p-3 border-b">
//               <div className="font-medium">{user.name}</div>
//               <div className="text-xs text-muted-foreground">{user.usn}</div>
//               <div className="text-xs text-muted-foreground mt-1">{user.email}</div>
//             </div>
            
//             <div className="p-3 border-b max-h-60 overflow-y-auto">
//               {/* Personal Information */}
//               <div className="mb-2 font-medium text-sm">Personal Information</div>
//               <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
//                 <span className="text-muted-foreground">Gender:</span>
//                 <span>{user.gender}</span>
//                 <span className="text-muted-foreground">Date of Birth:</span>
//                 <span>{user.dob}</span>
//               </div>
              
//               {/* Academic Information */}
//               <div className="mb-2 font-medium text-sm">Academic Details</div>
//               <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
//                 <span className="text-muted-foreground">Course:</span>
//                 <span>{user.course}</span>
//                 <span className="text-muted-foreground">Section:</span>
//                 <span>{user.section}</span>
//                 <span className="text-muted-foreground">Semester:</span>
//                 <span>{user.semester}</span>
//               </div>
              
//               {/* Course Information */}
//               <div className="mb-2 font-medium text-sm">Enrolled Courses</div>
//               <div className="grid grid-cols-1 gap-y-1 text-xs">
//                 {user.core_course_1 && <span>• {user.core_course_1}</span>}
//                 {user.core_course_2 && <span>• {user.core_course_2}</span>}
//                 {user.core_course_3 && <span>• {user.core_course_3}</span>}
//                 {user.core_course_4 && <span>• {user.core_course_4}</span>}
//                 {user.core_course_5 && <span>• {user.core_course_5}</span>}
//               </div>
//             </div>
            
//             <DropdownMenuItem asChild>
//               <Link to="/user-profile" className="cursor-pointer">
//                 View Full Profile
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link to="/settings" className="cursor-pointer">
//                 Settings
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={handleLogout} className="text-red-500 font-medium cursor-pointer">
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

export function Header() {
  const navigate = useNavigate();

  // State to store the logged-in user's information
  const [user, setUser] = useState({
    usn: "",
    name: "",
    email: "",
    section: "",
    gender: "",
    dob: "",
    course: "",
    semester: "",
    coreCourses: [], // An array to store core courses
    electives: [], // An array to store elective courses
  });

  useEffect(() => {
    // Retrieve user information from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          usn: userData.usn || "",
          name: userData.name || "Student",
          email: userData.email || "",
          section: userData.section || "",
          gender: userData.sex || "", // Corrected 'gender' field to match the `sex` attribute
          dob: userData.dob || "",
          course: userData.course || "",
          semester: userData.semester || "",
          coreCourses: userData.coreCourses || [], // Populating the core courses array
          electives: userData.electives || [], // Populating the elective courses array
        });
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <header className="border-b px-4 py-3 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative p-1 flex items-center gap-2 hover:bg-slate-50"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-socse-light text-white">
                  {user.name ? user.name.charAt(0) : "S"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col text-left text-sm">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.usn}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-72">
            {/* Profile Overview */}
            <div className="p-3 border-b">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.usn}</div>
              <div className="text-xs text-muted-foreground mt-1">{user.email}</div>
            </div>

            {/* Personal Information */}
            <div className="p-3 border-b max-h-60 overflow-y-auto">
              <div className="mb-2 font-medium text-sm">Personal Information</div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
                <span className="text-muted-foreground">Gender:</span>
                <span>{user.gender}</span>
                <span className="text-muted-foreground">Date of Birth:</span>
                <span>{user.dob}</span>
              </div>

              {/* Academic Information */}
              <div className="mb-2 font-medium text-sm">Academic Details</div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
                <span className="text-muted-foreground">Course:</span>
                <span>{user.course}</span>
                <span className="text-muted-foreground">Section:</span>
                <span>{user.section}</span>
                <span className="text-muted-foreground">Semester:</span>
                <span>{user.semester}</span>
              </div>

              {/* Enrolled Courses */}
              <div className="mb-2 font-medium text-sm">Enrolled Courses</div>
              <div className="grid grid-cols-1 gap-y-1 text-xs">
                {user.coreCourses.map((course, index) => (
                  <span key={index}>• {course}</span>
                ))}
              </div>

              {/* Elective Courses */}
              <div className="mb-2 font-medium text-sm mt-2">Electives</div>
              <div className="grid grid-cols-1 gap-y-1 text-xs">
                {user.electives.map((elective, index) => (
                  <span key={index}>• {elective}</span>
                ))}
              </div>
            </div>

            {/* Dropdown Options */}
            <DropdownMenuItem asChild>
              <Link to="/user-profile" className="cursor-pointer">
                View Full Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 font-medium cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
