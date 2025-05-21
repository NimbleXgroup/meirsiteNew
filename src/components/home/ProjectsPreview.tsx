
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsPreview = () => {
  const projects = [
    {
      id: 1,
      title: "Modern Office Building",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      location: "Downtown Business District"
    },
    {
      id: 2,
      title: "Luxury Residential Complex",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      location: "Riverside Heights"
    },
    {
      id: 3,
      title: "Public Library Renovation",
      category: "Renovation",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      location: "City Center"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-construction-navy">Our Recent Projects</h2>
          <p className="text-construction-gray">
            Take a look at some of our most impressive completed projects that showcase our 
            expertise, attention to detail, and commitment to excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-none shadow-lg">
              <div className="h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-construction-navy">{project.title}</CardTitle>
                  <span className="text-sm bg-construction-light px-3 py-1 rounded-full text-construction-navy">
                    {project.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-construction-gray flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {project.location}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/projects/${project.id}`} className="text-construction-navy font-medium hover:text-construction-gold transition-colors">
                  View Project Details →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/projects">
            <Button className="bg-construction-navy hover:bg-construction-navy/90">
              Explore All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
