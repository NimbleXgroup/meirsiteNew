
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types";

interface ServiceListItemProps {
  service: Service;
}

const ServiceListItem = ({ service }: ServiceListItemProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const updateMutation = useMutation({
    mutationFn: async (serviceToUpdate: Service) => {
      const { data, error } = await supabase.from('services').update(serviceToUpdate).eq('id', serviceToUpdate.id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "שירות עודכן", description: `"${data.title}" עודכן בהצלחה.` });
      setIsEditDialogOpen(false);
      setEditingService(null);
    },
    onError: (error) => {
      toast({ title: "שגיאה בעדכון שירות", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase.from('services').delete().eq('id', serviceId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "שירות נמחק", description: "השירות נמחק בהצלחה." });
      setIsDeleteDialogOpen(false);
      setEditingService(null);
    },
    onError: (error) => {
      toast({ title: "שגיאה במחיקת שירות", description: error.message, variant: "destructive" });
    }
  });
  
  const handleUpdateService = () => {
    if (!editingService) return;
    const cleanedFeatures = (editingService.features || []).filter(feature => feature && feature.trim() !== "");
    const updatedService = { ...editingService, features: cleanedFeatures };
    updateMutation.mutate(updatedService);
  };

  const handleDeleteService = () => {
    if (!editingService?.id) return;
    deleteMutation.mutate(editingService.id);
  };
  
  const updateFeature = (index: number, value: string) => {
    if (editingService) {
      const updatedFeatures = [...(editingService.features || [])];
      updatedFeatures[index] = value;
      setEditingService({ ...editingService, features: updatedFeatures as string[] });
    }
  };

  const openEditDialog = () => {
    const features = service.features || [];
    const paddedFeatures = [...features, ...Array(Math.max(0, 6 - features.length)).fill('')];
    setEditingService({ ...service, features: paddedFeatures });
    setIsEditDialogOpen(true);
  };

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
            <Button size="sm" variant="outline" onClick={openEditDialog}>
              <Pen className="h-4 w-4 ml-2" /> ערוך
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-600"
              onClick={() => {
                setEditingService(service);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 ml-2" /> מחק
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ערוך שירות</DialogTitle>
            <DialogDescription>עדכן את פרטי השירות.</DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-title" className="text-sm font-medium">כותרת</label>
                  <Input 
                    id="edit-title" 
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-id" className="text-sm font-medium">מזהה</label>
                  <Input id="edit-id" value={editingService.id} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium">כתובת URL לתמונה</label>
                <Input 
                  id="edit-image" 
                  value={editingService.image || ''}
                  onChange={(e) => setEditingService({...editingService, image: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">תיאור</label>
                <Textarea 
                  id="edit-description" 
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">מאפיינים (עד 6)</label>
                <div className="grid grid-cols-1 gap-2">
                  {(editingService.features || []).map((feature, index) => (
                    <Input
                      key={index}
                      value={feature || ''}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`מאפיין ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingService(null); }}>ביטול</Button>
            <Button className="bg-construction-navy" onClick={handleUpdateService} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'שומר...' : 'שמור שינויים'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>מחק שירות</DialogTitle>
            <DialogDescription>האם למחוק את השירות הזה? לא ניתן לשחזר פעולה זו.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsDeleteDialogOpen(false); setEditingService(null); }}>ביטול</Button>
            <Button variant="destructive" onClick={handleDeleteService} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'מוחק...' : 'מחק'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceListItem;
