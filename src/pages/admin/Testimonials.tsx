import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Pen, Trash2, Plus, Quote } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for testimonials - would come from API/database in a real app
const initialTestimonials = [
  {
    id: 1,
    name: "יונתן לוי",
    company: "בני לוי ובניו",
    role: "לקוח פרטי",
    comment: "קונסטרקטפרו הגשימו לנו את החלום לבית חדש – שירות ברמה גבוהה, עמידה בלוחות זמנים ואיכות ללא פשרות.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "שרה כהן",
    company: "אס.אי ייעוץ",
    role: "מנהלת פרויקטים",
    comment: "צוות מקצועי ואמין – בזכותם זכינו לשיפוץ מדויק ומוקפד. ממליצה בחום!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

type Testimonial = typeof initialTestimonials[0];

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    company: "",
    role: "",
    comment: "",
    rating: 5,
    image: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Function to handle adding a new testimonial
  const handleAddTestimonial = () => {
    const id = Math.max(0, ...testimonials.map(t => t.id)) + 1;
    const testimonialToAdd = { ...newTestimonial, id } as Testimonial;
    setTestimonials([...testimonials, testimonialToAdd]);
    setIsAddDialogOpen(false);
    toast({
      title: "Testimonial added",
      description: `${testimonialToAdd.name}'s testimonial has been added successfully.`
    });
    // Reset form
    setNewTestimonial({
      name: "",
      company: "",
      role: "",
      comment: "",
      rating: 5,
      image: ""
    });
  };

  // Function to handle updating a testimonial
  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;
    
    const updatedTestimonials = testimonials.map(t => 
      t.id === editingTestimonial.id ? editingTestimonial : t
    );
    
    setTestimonials(updatedTestimonials);
    setIsEditDialogOpen(false);
    toast({
      title: "Testimonial updated",
      description: `${editingTestimonial.name}'s testimonial has been updated successfully.`
    });
    setEditingTestimonial(null);
  };

  // Function to handle deleting a testimonial
  const handleDeleteTestimonial = () => {
    if (!editingTestimonial) return;
    
    const updatedTestimonials = testimonials.filter(t => t.id !== editingTestimonial.id);
    setTestimonials(updatedTestimonials);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Testimonial deleted",
      description: `${editingTestimonial.name}'s testimonial has been deleted successfully.`
    });
    setEditingTestimonial(null);
  };

  // Function to render star rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-construction-gold fill-construction-gold' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-construction-navy">ניהול המלצות לקוחות</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-construction-navy">
              <Plus className="w-4 h-4 mr-2" /> הוסף המלצה
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>הוסף המלצה חדשה</DialogTitle>
              <DialogDescription>
                הוסף המלצה חדשה של לקוח לשימוש באתר.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">שם הלקוח</label>
                  <Input 
                    id="name" 
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                    placeholder="שם מלא"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">חברה (אופציונלי)</label>
                  <Input 
                    id="company" 
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({...newTestimonial, company: e.target.value})}
                    placeholder="שם החברה"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">תפקיד</label>
                  <Input 
                    id="role" 
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                    placeholder="תפקיד לדוגמה: לקוח, מנכ״ל"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium">דירוג</label>
                  <Select 
                    value={String(newTestimonial.rating)}
                    onValueChange={(value) => setNewTestimonial({...newTestimonial, rating: parseInt(value)})}
                  >
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="בחר דירוג" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 כוכבים</SelectItem>
                      <SelectItem value="4">4 כוכבים</SelectItem>
                      <SelectItem value="3">3 כוכבים</SelectItem>
                      <SelectItem value="2">2 כוכבים</SelectItem>
                      <SelectItem value="1">כוכב 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">תמונת פרופיל (אופציונלי)</label>
                <Input 
                  id="image" 
                  value={newTestimonial.image}
                  onChange={(e) => setNewTestimonial({...newTestimonial, image: e.target.value})}
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium">חוות דעת</label>
                <Textarea 
                  id="comment" 
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                  placeholder="מה הלקוח אמר על השירותים שלך..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                ביטול
              </Button>
              <Button 
                className="bg-construction-navy"
                onClick={handleAddTestimonial}
                disabled={!newTestimonial.name || !newTestimonial.comment}
              >
                הוסף המלצה
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative">
            <CardContent className="p-6">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-construction-gold/30" />
              
              <div className="flex items-center mb-4">
                {testimonial.image && (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.company && ` ב${testimonial.company}`}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingTestimonial(testimonial);
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
                    setEditingTestimonial(testimonial);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> מחק
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {testimonials.length === 0 && (
          <div className="col-span-2 text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">לא נמצאו המלצות. הוסף המלצה כדי להתחיל.</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ערוך המלצה</DialogTitle>
            <DialogDescription>
              עדכן את פרטי ההמלצה.
            </DialogDescription>
          </DialogHeader>
          {editingTestimonial && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">שם הלקוח</label>
                  <Input 
                    id="edit-name" 
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-company" className="text-sm font-medium">חברה</label>
                  <Input 
                    id="edit-company" 
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-role" className="text-sm font-medium">תפקיד</label>
                  <Input 
                    id="edit-role" 
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-rating" className="text-sm font-medium">דירוג</label>
                  <Select 
                    value={String(editingTestimonial.rating)}
                    onValueChange={(value) => setEditingTestimonial({...editingTestimonial, rating: parseInt(value)})}
                  >
                    <SelectTrigger id="edit-rating">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 כוכבים</SelectItem>
                      <SelectItem value="4">4 כוכבים</SelectItem>
                      <SelectItem value="3">3 כוכבים</SelectItem>
                      <SelectItem value="2">2 כוכבים</SelectItem>
                      <SelectItem value="1">כוכב 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium">תמונת פרופיל</label>
                <Input 
                  id="edit-image" 
                  value={editingTestimonial.image}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, image: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-comment" className="text-sm font-medium">חוות דעת</label>
                <Textarea 
                  id="edit-comment" 
                  value={editingTestimonial.comment}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, comment: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              ביטול
            </Button>
            <Button 
              className="bg-construction-navy"
              onClick={handleUpdateTestimonial}
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
            <DialogTitle>מחק המלצה</DialogTitle>
            <DialogDescription>
              האם ברצונך למחוק את ההמלצה? פעולה זו אינה ניתנת לביטול.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              ביטול
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteTestimonial}
            >
              מחק
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
