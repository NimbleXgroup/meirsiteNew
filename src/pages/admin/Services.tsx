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

// Mock data - would come from API/database in a real app
const initialServices = [
  {
    id: "residential",
    title: "בנייה למגורים",
    description: "בניית בתים באיכות גבוהה שמגשימים לכם חלום, עם גימור קפדני ותשומת לב לכל פרט.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    features: [
      "תכנון ובניית בתים בהתאמה אישית",
      "הרחבות ושיפוצים",
      "בנייה יוקרתית",
      "פיתוח בנייני דירות",
      "טכניקות בנייה ירוקות",
      "פתרונות מגורים חסכוניים באנרגיה"
    ]
  },
  {
    id: "commercial",
    title: "בניינים מסחריים",
    description: "יצירת מרחבים מסחריים מעוצבים ופונקציונליים שמקדמים את העסק שלך.",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    features: [
      "בנייה למשרדים וחנויות",
      "פיתוח שטחי מסחר",
      "הקמת מפעלים",
      "מסעדות ומבני אירוח",
      "מרפאות",
      "מבני חינוך"
    ]
  },
];

type Service = typeof initialServices[0];

const AdminServices = () => {
  const [services, setServices] = useState(initialServices);
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
  const { toast } = useToast();

  // Function to update a single feature in the features array
  const updateFeature = (index: number, value: string, isNewService: boolean = false) => {
    if (isNewService) {
      const updatedFeatures = [...(newService.features || [])];
      updatedFeatures[index] = value;
      setNewService({ ...newService, features: updatedFeatures });
    } else if (editingService) {
      const updatedFeatures = [...editingService.features];
      updatedFeatures[index] = value;
      setEditingService({ ...editingService, features: updatedFeatures });
    }
  };

  // Function to handle adding a new service
  const handleAddService = () => {
    // Filter out empty features
    const cleanedFeatures = (newService.features || []).filter(feature => feature.trim() !== "");
    
    const serviceToAdd = { 
      ...newService, 
      id: newService.id || newService.title?.toLowerCase().replace(/\s+/g, '-') || `service-${Date.now()}`,
      features: cleanedFeatures
    } as Service;
    
    setServices([...services, serviceToAdd]);
    setIsAddDialogOpen(false);
    toast({
      title: "Service added",
      description: `${serviceToAdd.title} has been added successfully.`
    });
    
    // Reset form
    setNewService({
      id: "",
      title: "",
      description: "",
      image: "",
      features: ["", "", "", "", "", ""]
    });
  };

  // Function to handle updating a service
  const handleUpdateService = () => {
    if (!editingService) return;
    
    // Filter out empty features
    const cleanedFeatures = editingService.features.filter(feature => feature.trim() !== "");
    const updatedService = { ...editingService, features: cleanedFeatures };
    
    const updatedServices = services.map(s => 
      s.id === updatedService.id ? updatedService : s
    );
    
    setServices(updatedServices);
    setIsEditDialogOpen(false);
    toast({
      title: "Service updated",
      description: `${updatedService.title} has been updated successfully.`
    });
    setEditingService(null);
  };

  // Function to handle deleting a service
  const handleDeleteService = () => {
    if (!editingService) return;
    
    const updatedServices = services.filter(s => s.id !== editingService.id);
    setServices(updatedServices);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Service deleted",
      description: `${editingService.title} has been deleted successfully.`
    });
    setEditingService(null);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-construction-navy">ניהול שירותים</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-construction-navy">
              <Plus className="w-4 h-4 mr-2" /> הוסף שירות
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
                  <label htmlFor="id" className="text-sm font-medium">מזהה (אופציונלי)</label>
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
                disabled={!newService.title || !newService.description}
              >
                הוסף שירות
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services grid preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingService(service);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pen className="h-4 w-4 mr-2" /> ערוך
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
                  <Trash2 className="h-4 w-4 mr-2" /> מחק
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {services.length === 0 && (
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
                    disabled  // IDs shouldn't be editable after creation to avoid breaking links
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium">כתובת URL לתמונה</label>
                <Input 
                  id="edit-image" 
                  value={editingService.image}
                  onChange={(e) => setEditingService({...editingService, image: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">תיאור</label>
                <Textarea 
                  id="edit-description" 
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">מאפיינים</label>
                <div className="grid grid-cols-1 gap-2">
                  {editingService.features.map((feature, index) => (
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              ביטול
            </Button>
            <Button 
              className="bg-construction-navy"
              onClick={handleUpdateService}
            >
              שמור שינויים
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
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              ביטול
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteService}
            >
              מחק
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AdminServices;
