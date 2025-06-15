
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Service = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  features: string[] | null;
};

type ServiceFormData = Omit<Service, 'id'>;

const AdminServices = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    id: "",
    title: "",
    description: "",
    image: "",
    features: ["", "", "", "", "", ""]
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').order('title');
      if (error) throw new Error(error.message);
      return data || [];
    }
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
      setNewService({ id: "", title: "", description: "", image: "", features: ["", "", "", "", "", ""] });
    },
    onError: (error) => {
      toast({ title: "שגיאה בהוספת שירות", description: error.message, variant: "destructive" });
    }
  });

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
  
  const updateFeature = (index: number, value: string, isNewService: boolean = false) => {
    if (isNewService) {
      const updatedFeatures = [...(newService.features || [])];
      updatedFeatures[index] = value;
      setNewService({ ...newService, features: updatedFeatures });
    } else if (editingService) {
      const updatedFeatures = [...(editingService.features || [])];
      updatedFeatures[index] = value;
      setEditingService({ ...editingService, features: updatedFeatures as string[] });
    }
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

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-construction-navy">ניהול שירותים</h1>
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
                  value={newService.image}
                  onChange={(e) => setNewService({...newService, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">תיאור</label>
                <Textarea 
                  id="description" 
                  value={newService.description}
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
                      onChange={(e) => updateFeature(index, e.target.value, true)}
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
      </div>

      {/* Services grid preview */}
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
            <Card key={service.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img src={service.image || '/placeholder.svg'} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{service.description}</p>
                
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingService({ ...service, features: [...(service.features || []), ...Array(6 - (service.features?.length || 0)).fill('')] });
                      setIsEditDialogOpen(true);
                    }}
                  >
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
          ))
        ) : (
          <div className="col-span-2 text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">לא נמצאו שירותים. הוסף שירות חדש כדי להתחיל.</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ערוך שירות</DialogTitle>
            <DialogDescription>
              עדכן את פרטי השירות.
            </DialogDescription>
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
                  <Input 
                    id="edit-id" 
                    value={editingService.id}
                    disabled
                  />
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
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`מאפיין ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingService(null); }}>
              ביטול
            </Button>
            <Button 
              className="bg-construction-navy"
              onClick={handleUpdateService}
              disabled={updateMutation.isPending}
            >
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
            <DialogDescription>
              האם למחוק את השירות הזה? לא ניתן לשחזר פעולה זו.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsDeleteDialogOpen(false); setEditingService(null); }}>
              ביטול
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteService}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'מוחק...' : 'מחק'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AdminServices;
