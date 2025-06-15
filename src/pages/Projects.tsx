
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  id: string;
  title: string;
  category: string | null;
  image: string | null;
  description: string | null;
  location: string | null;
  year: number | null;
  client: string | null;
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('year', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  const filteredProjects = filter === "all" 
    ? projects 
    : projects?.filter(project => project.category === filter);

  const categories = ["מגורים", "מסחרי", "שיפוץ"];

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">הפרויקטים שלנו</h1>
            <p className="text-xl text-gray-200">
              גלשו בפרויקטים שהשלמנו – מקצועיות, יצירתיות ומחויבות למצוינות.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              className={filter === "all" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("all")}
            >
              כל הפרויקטים
            </Button>
            {categories.map(category => (
              <Button 
                key={category}
                variant={filter === category ? "default" : "outline"}
                className={filter === category ? "bg-construction-navy" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16 bg-construction-light" dir="rtl">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-lg">
                  <Skeleton className="h-64 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-construction-navy mb-2">שגיאה בטעינת הפרויקטים</h3>
              <p className="text-construction-gray">{error.message}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects?.map((project) => (
                  <Card key={project.id} className="overflow-hidden border-none shadow-lg">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={project.image || '/placeholder.svg'} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl text-construction-navy">{project.title}</CardTitle>
                        {project.category &&
                          <span className="text-sm bg-construction-light px-3 py-1 rounded-full text-construction-navy">
                            {project.category}
                          </span>
                        }
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-construction-gray mb-4">{project.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-semibold">מיקום:</span>
                          <p className="text-construction-gray">{project.location}</p>
                        </div>
                        <div>
                          <span className="font-semibold">שנה:</span>
                          <p className="text-construction-gray">{project.year}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold">לקוח:</span>
                          <p className="text-construction-gray">{project.client}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-construction-navy hover:bg-construction-navy/90 w-full">
                        לצפייה בפרויקט
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredProjects?.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-construction-navy mb-2">לא נמצאו פרויקטים</h3>
                  <p className="text-construction-gray">נסו סינון קטגוריה אחר</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
