
import { Building2, ListCheck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-construction-navy">Welcome to the Admin Panel</h1>
        <p className="mt-2 text-gray-600">
          Manage your projects, services, and testimonials from one central location.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link to="/admin/projects">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Projects</CardTitle>
              <Building2 className="h-5 w-5 text-construction-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage your construction projects portfolio.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/services">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Services</CardTitle>
              <ListCheck className="h-5 w-5 text-construction-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Update your service offerings and descriptions.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/testimonials">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Testimonials</CardTitle>
              <Users className="h-5 w-5 text-construction-gold" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage client reviews and testimonials.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="p-6 bg-construction-light/50 rounded-lg">
        <h2 className="text-xl font-bold text-construction-navy mb-2">Need help?</h2>
        <p className="text-gray-600">
          Contact your web administrator for assistance with advanced website changes.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
