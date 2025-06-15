
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  id: string;
  title: string;
  category: string | null;
  image: string | null;
  location: string | null;
};

const ProjectsPreview = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, image, location')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  return (
    <section className="section-padding bg-white" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-construction-navy">הפרויקטים האחרונים שלנו</h2>
          <p className="text-construction-gray">
            העיפו מבט בכמה מהפרויקטים המרשימים שהשלמנו, המציגים את המומחיות, תשומת הלב לפרטים והמחויבות שלנו למצוינות.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-lg">
                <Skeleton className="h-60 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                   <Skeleton className="h-4 w-1/3" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
           <div className="text-center py-16 text-red-500">
             שגיאה בטעינת פרויקטים: {error.message}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <Card key={project.id} className="overflow-hidden border-none shadow-lg">
                <div className="h-60 overflow-hidden">
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
                  <p className="text-construction-gray flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {project.location}
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-construction-navy font-medium transition-colors">
                    צפה בפרטי הפרויקט ←
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link to="/projects">
            <Button className="bg-construction-navy hover:bg-construction-navy/90">
              לכל הפרויקטים
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
