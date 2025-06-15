import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { Check } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "residential",
      title: "בנייה למגורים",
      description: "בניית בתים פרטיים ויחידות יוקרה ברמת גימור גבוהה ואיכות בלתי מתפשרת.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      features: [
        "תכנון ובניית בתים מותאמים אישית",
        "הרחבות ותוספות בניה",
        "בנייה למגורי יוקרה",
        "פיתוח בנייני דירות",
        "טכניקות בניה ירוקות",
        "פתרונות דיור חסכוני באנרגיה"
      ]
    },
    {
      id: "commercial",
      title: "בניינים מסחריים",
      description: "הקמה ותכנון של מבני משרדים, מסחר ותעשייה מעוצבים ומוקפדים עבורכם.",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      features: [
        "בנייה למשרדים",
        "פיתוח שטחי מסחר",
        "הקמת מפעלים",
        "מסעדות ומבני אירוח",
        "מרפאות ומבני בריאות",
        "מבני חינוך"
      ]
    },
    {
      id: "renovations",
      title: "שיפוצים וחידושים",
      description: "הפיכת חללים קיימים למודרניים, פרקטיים ונעימים לשימוש ביום-יום.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      features: [
        "שיפוץ מטבחים וחדרי רחצה",
        "שיפוצים כלליים לבית",
        "שימור מבנים היסטוריים",
        "שיפוץ חללים מסחריים",
        "חידוש מרתפים",
        "התאמות נגישות"
      ]
    },
    {
      id: "concrete",
      title: "בטון ועבודות אבן",
      description: "ביצוע מקצועי בעבודות בטון ואבן לחוזק, עמידות, ומראה יוקרתי.",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      features: [
        "יציקת יסודות",
        "בטון דקורטיבי",
        "קירות ותמיכות",
        "עבודות בנייה באבן ובלבנים",
        "שיקום ושיפוץ בטון",
        "בטון מוטבע וצבעוני"
      ]
    },
    {
      id: "management",
      title: "ניהול פרויקטים",
      description: "ליווי וניהול מלא של הפרויקט עד לשלב המפתח, בזמן ובתקציב.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      features: [
        "ניהול פרויקטים מקיף",
        "גיבוש ובקרת תקציב",
        "תכנון וליווי לוחות זמנים",
        "בקרת איכות",
        "תיאום קבלני משנה",
        "עמידה בתקנות ובתקנים"
      ]
    }
  ];

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
      {/* Services List */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-construction-light'}`} dir="rtl">
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
                  בקש הצעת מחיר
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
