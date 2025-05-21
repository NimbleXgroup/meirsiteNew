
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Building2, Home, ListChecked, Users } from "lucide-react";

// For this demo, we'll use a simple password check for admin access
// In a real app, you would implement proper authentication with Supabase
const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password check (would be replaced with proper auth in production)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center text-construction-navy">
            ConstructPro Admin
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter password"
                required
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full p-3 text-white bg-construction-navy rounded-md hover:bg-construction-navy/90"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-construction-navy hover:underline">
              Return to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show admin interface if authenticated
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center p-4">
            <div className="text-xl font-bold">ConstructPro Admin</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <a href="/admin">
                        <Home />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Content</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Projects">
                      <a href="/admin/projects">
                        <Building2 />
                        <span>Projects</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Services">
                      <a href="/admin/services">
                        <ListChecked />
                        <span>Services</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Testimonials">
                      <a href="/admin/testimonials">
                        <Users />
                        <span>Testimonials</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="ml-4 text-xl font-semibold">Admin Panel</h1>
            </div>
            <div>
              <a 
                href="/"
                className="px-4 py-2 text-sm text-gray-600 hover:text-construction-navy"
              >
                View Website
              </a>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 ml-2 text-sm text-white bg-construction-navy rounded-md hover:bg-construction-navy/90"
              >
                Logout
              </button>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
