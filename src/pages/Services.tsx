
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { Check, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Service = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  features: string[] | null;
};

const Services = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').order('title');
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  return (
    <>
      <Navbar />
      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">השירותים שלנו</h1>
            <p className="text-xl text-gray-200">
              פתרונות בניה מקיפים המותאמים אישית, ניתנים באחריות ומקצועיות.
            </p>
          </div>
        </div>
      </section>
      
      {isLoading ? (
        <div className="container mx-auto px-4 py-16 space-y-16">
          {[...Array(3)].map((_, index) => (
             <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`order-2 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Skeleton className="h-80 w-full rounded-lg" />
                </div>
                <div className={`order-1 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-12 w-40" />
                </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 text-red-500">
          שגיאה בטעינת שירותים: {error.message}
        </div>
      ) : (
        services?.map((service, index) => (
          <section key={service.id} id={service.id} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-construction-light'}`} dir="rtl">
            <div className="container mx-auto px-4">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`order-2 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-lg overflow-hidden h-80">
                    <img 
                      src={service.image || '/placeholder.svg'} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className={`order-1 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h2 className="text-3xl font-bold mb-4 text-construction-navy">{service.title}</h2>
                  <p className="text-construction-gray mb-6">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {service.features?.map((feature, i) => (
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
                    בקש הצעת מחיר
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
      
      <CTASection />
      <Footer />
    </>
  );
};

export default Services;
