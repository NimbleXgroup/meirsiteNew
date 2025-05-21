
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  
  const projects = [
    {
      id: 1,
      title: "Modern Office Building",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      description: "A 10-story modern office building with sustainable design elements and state-of-the-art facilities.",
      location: "Downtown Business District",
      year: 2023,
      client: "Tech Innovations Inc."
    },
    {
      id: 2,
      title: "Luxury Residential Complex",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      description: "Premium residential complex featuring 45 luxury apartments with high-end finishes and amenities.",
      location: "Riverside Heights",
      year: 2022,
      client: "Riverside Developments LLC"
    },
    {
      id: 3,
      title: "Public Library Renovation",
      category: "Renovation",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      description: "Complete renovation and modernization of the city's main public library while preserving its historic elements.",
      location: "City Center",
      year: 2023,
      client: "City of Springfield"
    },
    {
      id: 4,
      title: "Hillside Custom Home",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      description: "Custom-designed luxury home built on challenging hillside terrain with panoramic views.",
      location: "Mountain View Estates",
      year: 2021,
      client: "Private Client"
    },
    {
      id: 5,
      title: "Healthcare Clinic",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      description: "Modern medical clinic designed for optimal patient care with specialized treatment rooms and advanced technology.",
      location: "Westside Medical District",
      year: 2022,
      client: "Valley Health Partners"
    },
    {
      id: 6,
      title: "Historic Building Restoration",
      category: "Renovation",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      description: "Careful restoration of a 120-year-old landmark building, preserving historical features while updating infrastructure.",
      location: "Old Town District",
      year: 2023,
      client: "Heritage Preservation Society"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === filter);

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-gray-200">
              Explore our portfolio of completed projects showcasing our expertise,
              craftsmanship, and commitment to excellence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              className={filter === "all" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("all")}
            >
              All Projects
            </Button>
            <Button 
              variant={filter === "residential" ? "default" : "outline"}
              className={filter === "residential" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("residential")}
            >
              Residential
            </Button>
            <Button 
              variant={filter === "commercial" ? "default" : "outline"}
              className={filter === "commercial" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("commercial")}
            >
              Commercial
            </Button>
            <Button 
              variant={filter === "renovation" ? "default" : "outline"}
              className={filter === "renovation" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("renovation")}
            >
              Renovation
            </Button>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16 bg-construction-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-none shadow-lg">
                <div className="h-64 overflow-hidden">
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
                  <p className="text-construction-gray mb-4">{project.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Location:</span>
                      <p className="text-construction-gray">{project.location}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Year:</span>
                      <p className="text-construction-gray">{project.year}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Client:</span>
                      <p className="text-construction-gray">{project.client}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-construction-navy hover:bg-construction-navy/90 w-full">
                    View Project Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-construction-navy mb-2">No projects found</h3>
              <p className="text-construction-gray">Please try another category filter</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Projects;
