
// import { MainLayout } from "@/components/layout/main-layout";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { QrCode, Download, Share2 } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";

// export default function DigitalID() {
//   // Mock student data
//   const student = {
//     name: "John Doe",
//     usn: "1AB22CS001",
//     program: "B.Tech Computer Science",
//     batch: "2022-2026",
//     photo: "", // Empty for avatar fallback
//     dob: "2002-05-15",
//     bloodGroup: "B+",
//     validUntil: "31 July 2026",
//     emergencyContact: "+91 9876543210"
//   };

//   const handleDownload = () => {
//     // In a real app, this would generate and download the ID card as PDF
//     toast.success("ID Card downloaded successfully!");
//   };

//   const handleShare = () => {
//     // In a real app, this would implement sharing functionality
//     toast.success("Sharing link copied to clipboard!");
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold">Digital ID Card</h1>
//           <p className="text-muted-foreground mt-1">Your official university identification</p>
//         </div>
        
//         <Card className="socse-card overflow-hidden">
//           <div className="bg-socse-DEFAULT p-4 flex items-center justify-between">
//             <div className="text-white">
//               <h2 className="text-xl font-bold">SoCSE Student ID</h2>
//               <p className="text-sm opacity-90">School of Computer Science and Engineering</p>
//             </div>
//             <div className="text-white text-right">
//               <p className="text-xs opacity-90">Valid Until</p>
//               <p className="font-medium">{student.validUntil}</p>
//             </div>
//           </div>
          
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex flex-col items-center">
//                 <Avatar className="w-32 h-32 border-4 border-socse-DEFAULT">
//                   <AvatarImage src={student.photo} />
//                   <AvatarFallback className="bg-socse-light text-white text-2xl">
//                     {student.name.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
                
//                 <div className="mt-4 p-2 border rounded-md w-32 h-32 flex items-center justify-center bg-white">
//                   <QrCode className="w-24 h-24 text-socse-DEFAULT" />
//                 </div>
//               </div>
              
//               <div className="flex-1 space-y-4">
//                 <div>
//                   <h3 className="text-2xl font-bold">{student.name}</h3>
//                   <p className="text-lg font-medium text-socse-DEFAULT">{student.usn}</p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Program</span>
//                     <span className="font-medium">{student.program}</span>
//                   </div>
//                   <Separator />
                  
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Batch</span>
//                     <span className="font-medium">{student.batch}</span>
//                   </div>
//                   <Separator />
                  
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Date of Birth</span>
//                     <span className="font-medium">{new Date(student.dob).toLocaleDateString()}</span>
//                   </div>
//                   <Separator />
                  
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Blood Group</span>
//                     <span className="font-medium">{student.bloodGroup}</span>
//                   </div>
//                   <Separator />
                  
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Emergency Contact</span>
//                     <span className="font-medium">{student.emergencyContact}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8 flex gap-4 justify-center">
//               <Button 
//                 variant="outline"
//                 className="flex items-center gap-2"
//                 onClick={handleDownload}
//               >
//                 <Download className="h-4 w-4" />
//                 Download ID
//               </Button>
//               <Button 
//                 variant="outline"
//                 className="flex items-center gap-2"
//                 onClick={handleShare}
//               >
//                 <Share2 className="h-4 w-4" />
//                 Share
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
        
//         <div className="mt-6 text-center text-sm text-muted-foreground">
//           <p>This digital ID card is as valid as your physical ID card.</p>
//           <p>Please have this ready when requested by university staff.</p>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code"; // Install this library: npm install react-qr-code
import { toast } from "sonner";

export default function DigitalID() {
  const [student, setStudent] = useState({
    name: "",
    usn: "",
    program: "",
    batch: "",
    photo: "", // Placeholder for student photo
    dob: "",
    bloodGroup: "",
    validUntil: "",
    emergencyContact: "",
  });

  useEffect(() => {
    // Retrieve student data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setStudent({
          name: userData.name || "Student",
          usn: userData.usn || "",
          program: userData.course || "N/A",
          batch: "2022-2026", // You can dynamically set this if it's available
          photo: "", // Add logic here if student photo is available
          dob: userData.dob || "",
          bloodGroup: "N/A", // Update if blood group is stored
          validUntil: "31 July 2026", // Customize validity
          emergencyContact: "+91 9876543210", // Replace with student's contact if available
        });
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  const handleDownload = () => {
    // In a real app, implement download functionality here
    toast.success("ID Card downloaded successfully!");
  };

  const handleShare = () => {
    // In a real app, implement sharing functionality here
    toast.success("Sharing link copied to clipboard!");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Digital ID Card</h1>
          <p className="text-muted-foreground mt-1">Your official university identification</p>
        </div>

        <Card className="socse-card overflow-hidden">
          <div className="bg-socse-DEFAULT p-4 flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-xl font-bold">SoCSE Student ID</h2>
              <p className="text-sm opacity-90">School of Computer Science and Engineering</p>
            </div>
            <div className="text-white text-right">
              <p className="text-xs opacity-90">Valid Until</p>
              <p className="font-medium">{student.validUntil}</p>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Student's Photo and QR Code */}
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 border-4 border-socse-DEFAULT">
                  <AvatarImage src={student.photo} />
                  <AvatarFallback className="bg-socse-light text-white text-2xl">
                    {student.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-4 p-2 border rounded-md w-32 h-32 flex items-center justify-center bg-white">
                  <QRCode
                    value={`Name: ${student.name}, USN: ${student.usn}`} // QR Code content
                    size={128}
                    level="H"
                  />
                </div>
              </div>

              {/* Student's Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{student.name}</h3>
                  <p className="text-lg font-medium text-socse-DEFAULT">{student.usn}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Program</span>
                    <span className="font-medium">{student.program}</span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Batch</span>
                    <span className="font-medium">{student.batch}</span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date of Birth</span>
                    <span className="font-medium">
                      {student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Blood Group</span>
                    <span className="font-medium">{student.bloodGroup}</span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Emergency Contact</span>
                    <span className="font-medium">{student.emergencyContact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download ID
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>This digital ID card is as valid as your physical ID card.</p>
          <p>Please have this ready when requested by university staff.</p>
        </div>
      </div>
    </MainLayout>
  );
}
