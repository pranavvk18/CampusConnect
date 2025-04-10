
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [usn, setUsn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would validate against your database
    // For now, we'll mock the login process
    setTimeout(() => {
      if (email && usn) {
        // Success scenario
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        // Error scenario
        toast.error("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-socse-DEFAULT via-socse-DEFAULT to-socse-light">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" className="text-socse-DEFAULT" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Student Login</h1>
          <p className="text-gray-600 mt-2">Enter your university credentials to continue</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="student@university.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="usn">University Seat Number (USN)</Label>
            <Input 
              id="usn" 
              type="password" 
              placeholder="Enter your USN" 
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-socse-DEFAULT hover:bg-socse-light"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Forgot your password?{" "}
            <Link to="/reset-password" className="font-medium text-socse-DEFAULT hover:text-socse-light">
              Contact Admin
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-white">
        <p>© 2024 School of Computer Science and Engineering</p>
        <p className="mt-1">Student Hub - A hackathon project</p>
      </div>
    </div>
  );
}
