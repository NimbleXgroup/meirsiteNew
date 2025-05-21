
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesPreview = () => {
  const services = [
    {
      title: "Residential Construction",
      description: "Custom homes and residential structures built to exceptional standards.",
      icon: "🏠",
      link: "/services#residential"
    },
    {
      title: "Commercial Building",
      description: "Office spaces, retail buildings, and industrial facilities designed for your business needs.",
      icon: "🏢",
      link: "/services#commercial"
    },
    {
      title: "Renovations & Remodeling",
      description: "Transform your existing space with our expert renovation services.",
      icon: "🔨",
      link: "/services#renovations"
    },
    {
      title: "Project Management",
      description: "End-to-end project coordination ensuring timely and budget-friendly delivery.",
      icon: "📋",
      link: "/services#management"
    }
  ];

  return (
    <section className="section-padding bg-construction-light">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-construction-navy">Our Services</h2>
          <p className="text-construction-gray">
            We offer comprehensive construction solutions for both residential and commercial projects, 
            delivering excellence at every stage of the building process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-construction-navy">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-construction-gray">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={service.link} className="text-construction-navy font-medium hover:text-construction-gold transition-colors">
                  Learn More →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button className="bg-construction-navy hover:bg-construction-navy/90">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
