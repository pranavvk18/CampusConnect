import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface UserData {
  usn: string;
  name: string;
  email: string;
  section: string;
  gender: string;
  dob: string;
  course: string;
  school: string;
  semester: string;
  parent_name: string;
  parent_phone: string;
  phone: string;
  core_course_1: string;
  core_course_2: string;
  core_course_3: string;
  core_course_4: string;
  core_course_5: string;
  professional_elective_1: string;
  professional_elective_2: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      // First check if the user is logged in
      const storedUser = localStorage.getItem("user");
      
      if (!storedUser) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login first",
        });
        navigate("/login");
        return;
      }
      
      const { usn } = JSON.parse(storedUser);
      
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/user/${usn}`);
        
        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch user data",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      {userData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-medium">USN:</p>
                <p>{userData.usn}</p>
                
                <p className="font-medium">Name:</p>
                <p>{userData.name}</p>
                
                <p className="font-medium">Email:</p>
                <p>{userData.email}</p>
                
                <p className="font-medium">Phone:</p>
                <p>{userData.phone}</p>
                
                <p className="font-medium">Gender:</p>
                <p>{userData.gender}</p>
                
                <p className="font-medium">Date of Birth:</p>
                <p>{new Date(userData.dob).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your academic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-medium">Course:</p>
                <p>{userData.course}</p>
                
                <p className="font-medium">School:</p>
                <p>{userData.school}</p>
                
                <p className="font-medium">Semester:</p>
                <p>{userData.semester}</p>
                
                <p className="font-medium">Section:</p>
                <p>{userData.section}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parent Information</CardTitle>
              <CardDescription>Guardian details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-medium">Parent Name:</p>
                <p>{userData.parent_name}</p>
                
                <p className="font-medium">Parent Phone:</p>
                <p>{userData.parent_phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Enrolled courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Core Courses</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>{userData.core_course_1}</li>
                <li>{userData.core_course_2}</li>
                <li>{userData.core_course_3}</li>
                <li>{userData.core_course_4}</li>
                <li>{userData.core_course_5}</li>
              </ul>
              
              <h3 className="font-semibold mt-4">Professional Electives</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>{userData.professional_elective_1}</li>
                <li>{userData.professional_elective_2}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-lg">User data not found. Please try logging in again.</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;