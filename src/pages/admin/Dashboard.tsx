
import { Building2, ListCheck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold text-construction-navy">ברוך הבא לפאנל הניהול</h1>
        <p className="mt-2 text-gray-600">
          נהל את הפרויקטים, השירותים וההמלצות שלך ממקום אחד.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link to="/admin/projects">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">פרויקטים</CardTitle>
              <Building2 className="h-5 w-5 text-construction-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                ניהול תיק פרויקטים בבנייה שלך.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/services">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">שירותים</CardTitle>
              <ListCheck className="h-5 w-5 text-construction-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                עדכן את השירותים והתיאורים שלך.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/testimonials">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">המלצות</CardTitle>
              <Users className="h-5 w-5 text-construction-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                ניהול המלצות וביקורות מלקוחות.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="p-6 bg-construction-light/50 rounded-lg">
        <h2 className="text-xl font-bold text-construction-navy mb-2">צריך עזרה?</h2>
        <p className="text-gray-600">
          צור קשר עם מנהל האתר לקבלת עזרה בשינויים מתקדמים באתר.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
