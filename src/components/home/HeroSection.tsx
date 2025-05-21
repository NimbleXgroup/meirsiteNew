
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-image relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-white fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building Trust. <span className="text-construction-gold">Delivering Quality.</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Over 15 years of construction excellence in residential and commercial projects.
            We build more than structures - we build relationships based on integrity and quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button className="bg-construction-gold hover:bg-construction-gold/90 text-white text-lg px-8 py-6">
                Get a Free Quote
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                View Our Projects
              </Button>
            </Link>
            <Link to="/admin" className="ml-auto">
              <Button variant="ghost" className="text-white text-sm hover:bg-white/10">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
