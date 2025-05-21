
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { Check } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "residential",
      title: "Residential Construction",
      description: "Building exceptional homes that bring your dreams to life with quality craftsmanship and attention to detail.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      features: [
        "Custom home design and building",
        "Room additions and expansions",
        "Luxury home construction",
        "Multi-family housing development",
        "Green building techniques",
        "Energy efficient home solutions"
      ]
    },
    {
      id: "commercial",
      title: "Commercial Building",
      description: "Creating functional, attractive commercial spaces designed to enhance your business operations and make a strong impression.",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      features: [
        "Office building construction",
        "Retail space development",
        "Industrial facility construction",
        "Restaurant and hospitality buildings",
        "Healthcare facility construction",
        "Educational institution building"
      ]
    },
    {
      id: "renovations",
      title: "Renovations & Remodeling",
      description: "Transforming existing spaces into beautiful, functional areas that better meet your current needs.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      features: [
        "Kitchen and bathroom remodeling",
        "Whole house renovations",
        "Historic building restoration",
        "Commercial space renovation",
        "Basement finishing",
        "Aging-in-place modifications"
      ]
    },
    {
      id: "concrete",
      title: "Concrete Work & Masonry",
      description: "Expert concrete and masonry services that provide durability, strength, and aesthetic appeal to your property.",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      features: [
        "Foundation installation",
        "Decorative concrete work",
        "Retaining walls and structures",
        "Brick and stone masonry",
        "Concrete repair and restoration",
        "Stamped and colored concrete"
      ]
    },
    {
      id: "management",
      title: "Project Management",
      description: "Comprehensive project oversight ensuring your construction project is completed on time, within budget, and to your specifications.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      features: [
        "Full construction management",
        "Budget development and control",
        "Schedule creation and monitoring",
        "Quality control procedures",
        "Subcontractor coordination",
        "Regulatory compliance management"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-200">
              Comprehensive construction solutions tailored to your specific needs, 
              delivered with expertise and precision.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services List */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-construction-light'}`}>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`order-2 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="rounded-lg overflow-hidden h-80">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className={`order-1 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <h2 className="text-3xl font-bold mb-4 text-construction-navy">{service.title}</h2>
                <p className="text-construction-gray mb-6">{service.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="text-construction-gold" size={18} />
                      <span className="text-construction-gray text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="/contact" 
                  className="inline-block bg-construction-navy text-white px-6 py-3 rounded-md hover:bg-construction-navy/90 transition-colors"
                >
                  Request This Service
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      <CTASection />
      <Footer />
    </>
  );
};

export default Services;
