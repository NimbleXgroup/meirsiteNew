import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "John Robinson",
      position: "מייסד ומנכ\"ל",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "עם ניסיון של יותר מ-25 שנה בבנייה, ג'ון ייסד את ConstructPro עם חזון להציע איכות ושירות יוצאי דופן."
    },
    {
      name: "Lisa Chen",
      position: "אדריכלית ראשית",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "ליסה מביאה 15 שנות ניסיון באדריכלות, מומחית לעיצוב בר-קיימא ומבנים חדשניים."
    },
    {
      name: "Robert Garcia",
      position: "מנהל תפעול",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "רוברט מוודא שכל פרויקט מתנהל בצורה חלקה, בתיאום וצוותים מקצועיים בסטנדרט הגבוה ביותר."
    },
    {
      name: "Maria Thompson",
      position: "מנהלת קשרי לקוחות",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "מריה דואגת לשביעות רצון הלקוחות לכל אורך תהליך הבנייה."
    }
  ];

  const certifications = [
    "קבלן רשום",
    "בונה בתקן LEED",
    "הסמכת בטיחות OSHA",
    "שותף Energy Star",
    "דירוג A+ לשכת העסקים",
    "חבר התאחדות בוני הארץ",
    "חבר המכון האמריקאי לבנאים"
  ];

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">על קונסטרקטפרו</h1>
            <p className="text-xl text-gray-200">
              בונים באמינות, חדשנות ומקצועיות משנת 2010.
            </p>
          </div>
        </div>
      </section>
      
      {/* Company History */}
      <section className="py-16 bg-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-construction-navy">הסיפור שלנו</h2>
              <p className="text-construction-gray mb-4">
                קונסטרקטפרו נולדה בשנת 2010 על ידי ג'ון רובינסון, כחברת בניה קטנה בעלת חזון לאיכות ושירות ללקוחות פרטיים.
              </p>
              <p className="text-construction-gray mb-4">
                במהלך השנים צמחנו והפכנו לחברה מלאה המבצעת פרויקטים מגוונים למגורים ומסחר, הכל מבוסס על אמון לקוחות, עבודה איכותית ושקיפות.
              </p>
              <p className="text-construction-gray">
                כיום החברה מעסיקה מעל 50 אנשי מקצוע ומעל 500 פרויקטים שהושלמו, מבתים פרטיים ועד מבני ענק, מבלי לוותר על ערכי איכות, ערך ושירות.
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
      <section className="py-16 bg-construction-light" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-construction-navy">המשימה והערכים שלנו</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-construction-navy">המשימה שלנו</h3>
              <p className="text-construction-gray mb-4">
                לספק שירותי בנייה ברמה הגבוהה ביותר, עם שקיפות, דיוק, ואחריות ללקוח.
              </p>
              <p className="text-construction-gray">
                אנחנו כאן לבנות מבנים עמידים, וקשרי אמון לטווח ארוך עם לקוחותינו.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-construction-navy">ערכי ליבה</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">יושרה</span>
                    <p className="text-construction-gray text-sm">שקיפות ואמינות מול כל לקוח</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">איכות</span>
                    <p className="text-construction-gray text-sm">מחויבות לאיכות אומנותית חסרת פשרות</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">בטיחות</span>
                    <p className="text-construction-gray text-sm">הקפדה על בטיחות בכל אתר בניה</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">חדשנות</span>
                    <p className="text-construction-gray text-sm">שילוב טכנולוגיות ושיטות חדשות</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-construction-gold mt-1" size={20} />
                  <div>
                    <span className="font-semibold">מיקוד בלקוח</span>
                    <p className="text-construction-gray text-sm">תמיד לתת ערך מעבר למצופה</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-construction-navy">הנהלת החברה</h2>
            <p className="text-construction-gray">
              הכירו את צוות המומחים שמוביל אותנו.
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
      <section className="py-16 bg-construction-light" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-construction-navy">הסמכות ותעודות</h2>
            <p className="text-construction-gray">
              אנו עומדים בסטנדרטים הגבוהים ביותר עם מגוון הסמכות מקצועיות.
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
