
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types";

const AddServiceDialog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    id: "",
    title: "",
    description: "",
    image: "",
    features: Array(6).fill(""),
  });

  const addMutation = useMutation({
    mutationFn: async (serviceToAdd: Omit<Service, 'id'> & { id: string }) => {
      const { data, error } = await supabase.from('services').insert(serviceToAdd).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "שירות נוסף", description: `"${data.title}" נוסף בהצלחה.` });
      setIsAddDialogOpen(false);
      setNewService({ id: "", title: "", description: "", image: "", features: Array(6).fill("") });
    },
    onError: (error) => {
      toast({ title: "שגיאה בהוספת שירות", description: error.message, variant: "destructive" });
    }
  });

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...(newService.features || [])];
    updatedFeatures[index] = value;
    setNewService({ ...newService, features: updatedFeatures });
  };

  const handleAddService = () => {
    const cleanedFeatures = (newService.features || []).filter(feature => feature.trim() !== "");
    const serviceId = newService.id || newService.title?.toLowerCase().replace(/\s+/g, '-') || `service-${Date.now()}`;
    
    const serviceToAdd = { 
      ...newService, 
      id: serviceId,
      features: cleanedFeatures
    } as Omit<Service, 'id'> & { id: string };

    if (!serviceToAdd.title || !serviceToAdd.id) {
      toast({ title: "שגיאה", description: "כותרת ומזהה הם שדות חובה.", variant: "destructive" });
      return;
    }
    
    addMutation.mutate(serviceToAdd);
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-construction-navy">
          <Plus className="w-4 h-4 ml-2" /> הוסף שירות
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>הוסף שירות חדש</DialogTitle>
          <DialogDescription>
            הוסף שירות להצגה באתר.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">כותרת</label>
              <Input 
                id="title" 
                value={newService.title}
                onChange={(e) => setNewService({...newService, title: e.target.value})}
                placeholder="כותרת שירות"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="id" className="text-sm font-medium">מזהה (באנגלית)</label>
              <Input 
                id="id" 
                value={newService.id}
                onChange={(e) => setNewService({...newService, id: e.target.value})}
                placeholder="service-id"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">כתובת URL לתמונה</label>
            <Input 
              id="image" 
              value={newService.image || ''}
              onChange={(e) => setNewService({...newService, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">תיאור</label>
            <Textarea 
              id="description" 
              value={newService.description || ''}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              placeholder="תיאור שירות"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">מאפיינים (עד 6)</label>
            <div className="grid grid-cols-1 gap-2">
              {Array(6).fill(0).map((_, index) => (
                <Input
                  key={index}
                  value={newService.features?.[index] || ""}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`מאפיין ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            ביטול
          </Button>
          <Button 
            className="bg-construction-navy"
            onClick={handleAddService}
            disabled={!newService.title || !newService.id || addMutation.isPending}
          >
            {addMutation.isPending ? 'מוסיף...' : 'הוסף שירות'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
