import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
    file: null as File | null
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, serviceType: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, file });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Quote Request Sent",
        description: "Thank you! We'll contact you shortly to discuss your project.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
        file: null
      });
      
      // Reset file input
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-construction-navy text-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">צור קשר</h1>
            <p className="text-xl text-gray-200">
              יש לך שאלות או רוצה להקים פרויקט? פנה אלינו לייעוץ והצעת מחיר ללא התחייבות.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16 bg-white" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-construction-light p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-construction-navy">בקשת הצעת מחיר</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">שם מלא</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="ישראל ישראלי"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">דוא״ל</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="israel@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      placeholder="052-1234567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">סוג שירות</Label>
                    <Select value={formData.serviceType} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר שירות" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">בנייה למגורים</SelectItem>
                        <SelectItem value="commercial">בניינים מסחריים</SelectItem>
                        <SelectItem value="renovation">שיפוצים וחידושים</SelectItem>
                        <SelectItem value="concrete">עבודות בטון ואבן</SelectItem>
                        <SelectItem value="management">ניהול פרויקטים</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">פרטי פרויקט</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="פרט כמה שיותר על הפרויקט..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">העלה תוכניות (אופציונלי)</Label>
                  <Input 
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <p className="text-sm text-gray-500">קבצי PDF, DOC, או תמונה עד 10MB</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-construction-navy hover:bg-construction-navy/90"
                  disabled={loading}
                >
                  {loading ? "שולח..." : "שלח בקשה להצעת מחיר"}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-construction-navy">פרטי יצירת קשר</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-construction-navy p-3 rounded-full text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">המשרד</h3>
                    <p className="text-construction-gray">123 רחוב הבנייה</p>
                    <p className="text-construction-gray">עיר הבנייה, 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-construction-navy p-3 rounded-full text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">טלפון</h3>
                    <p className="text-construction-gray">052-1234567</p>
                    <p className="text-construction-gray">ימים א'-ה': 8:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-construction-navy p-3 rounded-full text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">דוא״ל</h3>
                    <p className="text-construction-gray">info@constructpro.com</p>
                    <p className="text-construction-gray">quotes@constructpro.com</p>
                  </div>
                </div>
              </div>
              
              {/* Google Map */}
              <div className="rounded-lg overflow-hidden h-80 shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-73.9876!3d40.7485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjYiTiA3M8KwNTknMTUuNCJX!5e0!3m2!1sen!2sus!4v1620123456789!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Contact;
