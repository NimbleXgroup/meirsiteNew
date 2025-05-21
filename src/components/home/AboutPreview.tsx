
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AboutPreview = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team Members" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-construction-navy">
              Building Excellence Since 2010
            </h2>
            <p className="text-construction-gray mb-6">
              At ConstructPro, we pride ourselves on delivering exceptional construction services, 
              from residential builds to commercial projects. Our team of skilled professionals 
              is dedicated to turning your vision into reality, with a focus on quality, timeliness, 
              and attention to detail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Check className="text-construction-gold" size={20} />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-construction-gold" size={20} />
                <span>Timely Project Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-construction-gold" size={20} />
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-construction-gold" size={20} />
                <span>100% Customer Satisfaction</span>
              </div>
            </div>
            <Link to="/about">
              <Button className="bg-construction-navy hover:bg-construction-navy/90">
                Learn More About Us
              </Button>
            </Link>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-construction-light p-6 rounded-lg text-center shadow-md">
                <div className="text-4xl font-bold text-construction-navy mb-2">{stat.value}</div>
                <div className="text-construction-gray">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
