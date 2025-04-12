import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import axios from "axios";
import { MainLayout } from "@/components/layout/main-layout";  // Importing the layout component

// Interfaces
interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    usn: string;
    semester: number;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  replies: ForumReply[];
  likes: number;
  views: number;
}

interface ForumReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    usn: string;
    semester: number;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isVerified?: boolean;
}

interface User {
  usn: string;
  name: string;
  email: string;
  section: string;
  gender: string;
  dob: string;
  course: string;
  school: string;
  semester: number;
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

// Sample data
const samplePosts: ForumPost[] = [
  {
    id: "1",
    title: "Which AI/ML elective should I choose in 5th semester?",
    content: "I'm confused between Advanced Deep Learning and NLP...",
    author: { id: "u1", name: "Aditya Sharma", usn: "1AB22CS045", semester: 4 },
    category: "Electives",
    tags: ["AI/ML", "Computer Science", "Electives"],
    createdAt: "2025-04-08T14:30:00Z",
    replies: [
      {
        id: "r1",
        content: "I took Advanced Deep Learning... helped me get an internship at Google.",
        author: { id: "u2", name: "Priya Mehta", usn: "1AB21CS102", semester: 6 },
        createdAt: "2025-04-09T09:15:00Z",
        likes: 7,
        isVerified: true,
      },
      {
        id: "r2",
        content: "NLP has fewer assignments but challenging concepts.",
        author: { id: "u3", name: "Rahul Kapoor", usn: "1AB21CS078", semester: 6 },
        createdAt: "2025-04-09T11:20:00Z",
        likes: 5,
      },
    ],
    likes: 12,
    views: 78,
  },
];

// Main Component
const PeerLearningForum = () => {
  const [posts, setPosts] = useState<ForumPost[]>(samplePosts);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostMode, setNewPostMode] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Electives", tags: "" });
  const [replyContent, setReplyContent] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setCurrentUser(JSON.parse(userData));
        } else {
          const response = await axios.get("/api/user/current");
          if (response.data.user) {
            setCurrentUser(response.data.user);
            sessionStorage.setItem("userData", JSON.stringify(response.data.user));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && post.category.toLowerCase() === activeTab.toLowerCase();
  });

  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to post a question");
      return;
    }

    const newForumPost: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        id: currentUser.usn,
        name: currentUser.name,
        usn: currentUser.usn,
        semester: currentUser.semester,
      },
      category: newPost.category,
      tags: newPost.tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date().toISOString(),
      replies: [],
      likes: 0,
      views: 0,
    };

    setPosts([newForumPost, ...posts]);
    setNewPostMode(false);
    setNewPost({ title: "", content: "", category: "Electives", tags: "" });
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyContent.trim() || !currentUser) return;

    const isSenior = currentUser.semester > 4;
    const newReply: ForumReply = {
      id: `r${Date.now()}`,
      content: replyContent,
      author: {
        id: currentUser.usn,
        name: currentUser.name,
        usn: currentUser.usn,
        semester: currentUser.semester,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isVerified: isSenior,
    };

    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, replies: [...post.replies, newReply] } : post
    );

    setPosts(updatedPosts);
    setReplyContent("");
    setActivePostId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSuggestedTags = () => {
    if (!currentUser) return [];
    const tags = [
      currentUser.core_course_1,
      currentUser.core_course_2,
      currentUser.core_course_3,
      currentUser.core_course_4,
      currentUser.core_course_5,
      currentUser.professional_elective_1,
      currentUser.professional_elective_2,
      currentUser.course,
      `Semester ${currentUser.semester}`,
    ];
    return tags.filter(Boolean).slice(0, 5);
  };

  if (isLoading) return <div className="container mx-auto py-6">Loading...</div>;

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Peer Learning Forum</h1>
          <div className="flex items-center gap-4">
            {currentUser && <div className="text-sm text-gray-600">Welcome, {currentUser.name} ({currentUser.usn})</div>}
            <Button onClick={() => setNewPostMode(!newPostMode)}>{newPostMode ? "Cancel" : "Ask a Question"}</Button>
          </div>
        </div>

        {newPostMode && (
          <Card className="mb-8 border border-gray-200">
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>Get guidance from your seniors and peers</CardDescription>
            </CardHeader>
            <form onSubmit={handleNewPostSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    id="title"
                    placeholder="e.g., Which elective should I choose for next semester?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    id="content"
                    placeholder="Describe your question in detail..."
                    rows={4}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                    <select
                      id="category"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    >
                      <option value="Electives">Electives</option>
                      <option value="Minors">Minors</option>
                      <option value="Projects">Projects</option>
                      <option value="Internships">Internships</option>
                      <option value="Career">Career Advice</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                    <Input
                      id="tags"
                      placeholder="e.g., AI/ML, Computer Science, 5th Semester"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    />
                    {currentUser && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Suggested tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getSuggestedTags().map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                const currentTags = newPost.tags ? newPost.tags.split(",").map((t) => t.trim()) : [];
                                if (!currentTags.includes(tag)) {
                                  const updatedTags = [...currentTags, tag].join(", ");
                                  setNewPost({ ...newPost, tags: updatedTags });
                                }
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={!currentUser}>Post Question</Button>
                {!currentUser && <span className="ml-2 text-sm text-red-500">Please log in to post questions</span>}
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default PeerLearningForum;