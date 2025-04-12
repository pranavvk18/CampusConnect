
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import DigitalID from "./pages/DigitalID";
import Electives from "./pages/Electives";
import NotFound from "./pages/NotFound";
import Plagarism from './pages/plagarism';
import Clubs from './pages/clubs';
import LostAndFound from "./pages/lostfound";
import UserProfile from "./pages/UserProfile";
import PeerLearningForum from "./pages/PeerLearningForum";
import QuestionPapers from "./pages/questionpapers";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/digital-id" element={<DigitalID />} />
          <Route path="/electives" element={<Electives />} />
          <Route path="/plagiarism" element={<Plagarism />} />
          <Route path="/clubs" element={<Clubs/>} />
          <Route path="/lostfound" element={<LostAndFound/>} />''
          <Route path="/peer-learning" element={<PeerLearningForum />} />
          {/* <Route path="/UserProfile" element={<UserProfile/>} /> */}
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/questionpapers" element={<QuestionPapers/>} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
