
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "John Robinson",
      position: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "With over 25 years in construction, John founded ConstructPro with a vision to deliver exceptional quality and service."
    },
    {
      name: "Lisa Chen",
      position: "Chief Architect",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Lisa brings 15 years of architectural expertise, specializing in sustainable design and innovative structures."
    },
    {
      name: "Robert Garcia",
      position: "Operations Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Robert ensures every project runs smoothly, coordinating our expert teams and maintaining our high standards."
    },
    {
      name: "Maria Thompson",
      position: "Client Relations Director",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "Maria is dedicated to ensuring client satisfaction throughout the entire construction process."
    }
  ];

  const certifications = [
    "Licensed General Contractor",
    "LEED Certified Builder",
    "OSHA Safety Certified",
    "Energy Star Partner",
    "Better Business Bureau A+ Rating",
    "National Association of Home Builders Member",
    "American Institute of Constructors"
  ];

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ConstructPro</h1>
            <p className="text-xl text-gray-200">
              Building excellence through integrity, innovation, and exceptional craftsmanship since 2010.
            </p>
          </div>
        </div>
      </section>
      
      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-construction-navy">Our Story</h2>
              <p className="text-construction-gray mb-4">
                Founded in 2010 by John Robinson, ConstructPro began as a small residential construction 
                company with a vision to deliver exceptional quality and service to homeowners.
              </p>
              <p className="text-construction-gray mb-4">
                Over the years, we've grown into a full-service construction firm handling both residential 
                and commercial projects across the region. Our growth has been built on a foundation of 
                satisfied clients, quality workmanship, and a reputation for integrity.
              </p>
              <p className="text-construction-gray">
                Today, ConstructPro employs over 50 professionals and has completed more than 500 projects, 
                ranging from custom homes to large commercial developments. Throughout our growth, we've 
                remained committed to our founding principles of quality, value, and customer satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
                  alt="Construction site" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460574283810-2aab119d8511" 
                  alt="Building" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Construction team" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="py-16 bg-construction-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-construction-navy">Our Mission & Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-construction-navy">Our Mission</h3>
              <p className="text-construction-gray mb-4">
                To deliver exceptional construction services that exceed client expectations, 
                while maintaining the highest standards of quality, safety, and integrity in 
                everything we do.
              </p>
              <p className="text-construction-gray">
                We aim to build structures that stand the test of time and relationships with 
                clients that last a lifetime.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-construction-navy">Core Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Integrity</span>
                    <p className="text-construction-gray text-sm">Honesty and transparency in all our dealings</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Quality</span>
                    <p className="text-construction-gray text-sm">Unwavering commitment to exceptional craftsmanship</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Safety</span>
                    <p className="text-construction-gray text-sm">Prioritizing wellbeing on every job site</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Innovation</span>
                    <p className="text-construction-gray text-sm">Embracing new techniques and technologies</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Client Focus</span>
                    <p className="text-construction-gray text-sm">Delivering beyond expectations every time</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-construction-navy">Our Leadership Team</h2>
            <p className="text-construction-gray">
              Meet the experienced professionals who lead our company with expertise and passion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-construction-light p-6 rounded-lg text-center">
                <div className="mb-4 h-40 w-40 mx-auto rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-construction-navy">{member.name}</h3>
                <p className="text-construction-gold font-medium mb-3">{member.position}</p>
                <p className="text-construction-gray text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="py-16 bg-construction-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-construction-navy">Our Certifications</h2>
            <p className="text-construction-gray">
              We maintain the highest industry standards with these professional certifications and memberships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((certification, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg flex items-center gap-3 shadow-sm"
              >
                <div className="bg-construction-gold/20 p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
                <span className="text-construction-gray">{certification}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
