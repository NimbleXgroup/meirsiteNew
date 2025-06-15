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
      title: "בניין משרדים מודרני",
      category: "מסחרי",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      description: "בניין משרדים גבוה בעיצוב חדיש עם דגש על קיימות וטכנולוגיה מתקדמת.",
      location: "מרכז העסקים הראשי",
      year: 2023,
      client: "טק אינוביישנס"
    },
    {
      id: 2,
      title: "קומפלקס מגורים יוקרתי",
      category: "מגורים",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      description: "מתחם דירות יוקרתי הכולל 45 דירות מעוצבות וסטנדרט בניה גבוה במיוחד.",
      location: "ריברסייד",
      year: 2022,
      client: "ריברסייד נדל\"ן"
    },
    {
      id: 3,
      title: "שיפוץ ספריה ציבורית",
      category: "שיפוץ",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      description: "שדרוג הספריה העירונית תוך שמירה על אלמנטים היסטוריים.",
      location: "מרכז העיר",
      year: 2023,
      client: "עיריית ספרינגפילד"
    },
    {
      id: 4,
      title: "בית פרטי בהר",
      category: "מגורים",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      description: "בית יוקרה ייחודי שנבנה בטופוגרפיה מאתגרת עם נוף מהמם.",
      location: "נופי ההר",
      year: 2021,
      client: "לקוח פרטי"
    },
    {
      id: 5,
      title: "מרפאת בריאות",
      category: "מסחרי",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      description: "מרפאה מודרנית לאבחון וטיפול עם חדרי טיפול חדשניים.",
      location: "רובע הבריאות",
      year: 2022,
      client: "ואליי הלת'"
    },
    {
      id: 6,
      title: "שימור בניין היסטורי",
      category: "שיפוץ",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      description: "שימור ופיתוח מבנה היסטורי בן 120 שנה תוך עדכון התשתיות.",
      location: "העיר העתיקה",
      year: 2023,
      client: "עמותת שימור"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === filter);

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
            <Button 
              variant={filter === "residential" ? "default" : "outline"}
              className={filter === "residential" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("residential")}
            >
              מגורים
            </Button>
            <Button 
              variant={filter === "commercial" ? "default" : "outline"}
              className={filter === "commercial" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("commercial")}
            >
              מסחרי
            </Button>
            <Button 
              variant={filter === "renovation" ? "default" : "outline"}
              className={filter === "renovation" ? "bg-construction-navy" : ""}
              onClick={() => setFilter("renovation")}
            >
              שיפוץ
            </Button>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16 bg-construction-light" dir="rtl">
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
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-construction-navy mb-2">לא נמצאו פרויקטים</h3>
              <p className="text-construction-gray">נסו סינון קטגוריה אחר</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
