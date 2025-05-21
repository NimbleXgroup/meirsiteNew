
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Johnson",
      position: "Homeowner",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      testimonial: "ConstructPro built our dream home with impeccable attention to detail. Their team was professional, communicative, and delivered exactly what was promised - on time and within budget."
    },
    {
      id: 2,
      name: "Sarah Thompson",
      position: "Business Owner",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      testimonial: "We hired ConstructPro for our office renovation and were impressed by their professionalism. They minimized disruption to our operations and the result exceeded our expectations!"
    },
    {
      id: 3,
      name: "David Wilson",
      position: "Real Estate Developer",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      testimonial: "As someone who has worked with many construction companies, I can say that ConstructPro stands out. Their project management is excellent and they consistently deliver quality results."
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Homeowner",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      testimonial: "The renovation of our kitchen and bathroom was handled with such care and precision. ConstructPro's team was respectful of our home and the craftsmanship is outstanding."
    }
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-construction-navy text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-300">
            Don't just take our word for it. Here's what our satisfied clients have to say about
            their experience working with ConstructPro.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <Card className="bg-white/10 backdrop-blur-sm border-none">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                            <p className="text-gray-300">{testimonial.position}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} fill="#D4AF37" className="text-construction-gold" size={20} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-200 italic">"{testimonial.testimonial}"</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prev}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </button>
            <button
              onClick={next}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
