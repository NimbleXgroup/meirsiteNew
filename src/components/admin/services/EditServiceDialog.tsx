
import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types";

interface EditServiceDialogProps {
  service: Service;
  children: React.ReactNode;
}

const EditServiceDialog = ({ service, children }: EditServiceDialogProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service>(service);

  useEffect(() => {
    if (isOpen) {
      const features = service.features || [];
      const paddedFeatures = [...features, ...Array(Math.max(0, 6 - features.length)).fill('')];
      setEditingService({ ...service, features: paddedFeatures });
    }
  }, [isOpen, service]);

  const updateMutation = useMutation({
    mutationFn: async (serviceToUpdate: Service) => {
      const { data, error } = await supabase.from('services').update(serviceToUpdate).eq('id', serviceToUpdate.id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "שירות עודכן", description: `"${data.title}" עודכן בהצלחה.` });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({ title: "שגיאה בעדכון שירות", description: error.message, variant: "destructive" });
    }
  });

  const handleUpdateService = () => {
    if (!editingService) return;
    const cleanedFeatures = (editingService.features || []).filter(feature => feature && feature.trim() !== "");
    const updatedService = { ...editingService, features: cleanedFeatures };
    updateMutation.mutate(updatedService);
  };

  const updateFeature = (index: number, value: string) => {
    if (editingService) {
      const updatedFeatures = [...(editingService.features || [])];
      updatedFeatures[index] = value;
      setEditingService({ ...editingService, features: updatedFeatures as string[] });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
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
                onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">תיאור</label>
              <Textarea
                id="edit-description"
                value={editingService.description || ''}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>ביטול</Button>
          <Button className="bg-construction-navy" onClick={handleUpdateService} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'שומר...' : 'שמור שינויים'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceDialog;
