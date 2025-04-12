import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const clubs = [
  {
    name: "Viksha - Coding Club",
    description: "A haven for programmers and tech enthusiasts. Join us for coding competitions, hackathons, and peer learning.",
    image: "viksha.png",
    link: "https://www.linkedin.com/company/viksha/",
  },
  {
    name: "GDG RVU",
    description: "Google Developer Group at RVU focuses on developer technologies, workshops, and networking with industry experts.",
    image: "GDG.png",
    link: "https://www.linkedin.com/company/gdg-rvu/posts/?feedView=all",
  },
  {
    name: "IEEE RVU",
    description: "Connect with innovation and research. IEEE RVU offers technical seminars, project expos, and industry collaborations.",
    image: "ieee.png",
    link: "/clubs/ieee",
  },
  {
    name: "Shrigandha - Kannada Club",
    description: "Celebrate Kannada culture through music, drama, literature, and festivals. A home for language and heritage lovers.",
    image: "shrigandha.jpg",
    link: "/clubs/shrigandha",
  },
  {
    name: "Social - Premium Content & Marketing Club",
    description: "Master marketing, content creation, branding, and digital influence. Social is the creative soul of the campus.",
    image: "/socials.jpg",
    link: "/clubs/social",
  },
];


export default function ClubsDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Clubs @ SoCSE</h1>
          <p className="text-muted-foreground mt-1">Explore your interests, find your community, and get involved!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <Card key={index} className="socse-card socse-card-hover">
              <img src={club.image} alt={club.name} className="w-full h-40 object-cover rounded-t-2xl" />
              <CardHeader>
                <CardTitle className="text-lg">{club.name}</CardTitle>
                <CardDescription>{club.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to={club.link}>Explore Club →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
