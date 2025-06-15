
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types";
import AddServiceDialog from "@/components/admin/services/AddServiceDialog";
import ServiceListItem from "@/components/admin/services/ServiceListItem";

const AdminServices = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').order('title');
      if (error) throw new Error(error.message);
      return data || [];
    }
  });

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-construction-navy">ניהול שירותים</h1>
        <AddServiceDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          [...Array(2)].map((_, i) => (
            <Card key={i}><CardContent className="p-4"><Skeleton className="h-64 w-full" /></CardContent></Card>
          ))
        ) : error ? (
           <div className="col-span-2 text-center py-10 bg-red-50 rounded-lg text-red-500">
            <p>שגיאה בטעינת שירותים: {error.message}</p>
          </div>
        ) : services && services.length > 0 ? (
          services.map((service) => (
            <ServiceListItem key={service.id} service={service} />
          ))
        ) : (
          <div className="col-span-2 text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">לא נמצאו שירותים. הוסף שירות חדש כדי להתחיל.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminServices;
