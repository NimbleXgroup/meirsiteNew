
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, Trash2 } from "lucide-react";
import { Service } from "@/types";
import EditServiceDialog from "./EditServiceDialog";
import DeleteServiceDialog from "./DeleteServiceDialog";

interface ServiceListItemProps {
  service: Service;
}

const ServiceListItem = ({ service }: ServiceListItemProps) => {
  return (
    <>
      <Card className="overflow-hidden">
        <div className="h-40 overflow-hidden">
          <img src={service.image || '/placeholder.svg'} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{service.description}</p>
          
          <div className="flex justify-end gap-2">
            <EditServiceDialog service={service}>
              <Button size="sm" variant="outline">
                <Pen className="h-4 w-4 ml-2" /> ערוך
              </Button>
            </EditServiceDialog>
            <DeleteServiceDialog service={service}>
               <Button
                size="sm"
                variant="outline"
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 ml-2" /> מחק
              </Button>
            </DeleteServiceDialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceListItem;
