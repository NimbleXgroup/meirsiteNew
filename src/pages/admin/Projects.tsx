
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
import { Pen, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  id: string;
  created_at?: string;
  title: string;
  category: string | null;
  image: string | null;
  description: string | null;
  location: string | null;
  year: number | null;
  client: string | null;
};

type ProjectFormData = Omit<Project, 'id' | 'created_at'>;

const AdminProjects = () => {
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<ProjectFormData>({
    title: "",
    category: "מסחרי",
    image: "",
    description: "",
    location: "",
    year: new Date().getFullYear(),
    client: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: projects, isLoading, error: projectsError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching projects:", error);
        throw new Error(error.message);
      }
      return data || [];
    }
  });

  const addMutation = useMutation({
    mutationFn: async (projectToAdd: ProjectFormData) => {
      const { data, error } = await supabase.from('projects').insert(projectToAdd).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "פרויקט נוסף", description: `"${data.title}" נוסף בהצלחה.` });
      setIsAddDialogOpen(false);
      setNewProject({
        title: "", category: "מסחרי", image: "", description: "",
        location: "", year: new Date().getFullYear(), client: ""
      });
    },
    onError: (error) => {
      toast({ title: "שגיאה בהוספת פרויקט", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (projectToUpdate: Project) => {
      const { id, created_at, ...updateData } = projectToUpdate;
      const { data, error } = await supabase.from('projects').update(updateData).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "פרויקט עודכן", description: `"${data.title}" עודכן בהצלחה.` });
      setIsEditDialogOpen(false);
      setEditingProject(null);
    },
    onError: (error) => {
      toast({ title: "שגיאה בעדכון פרויקט", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "פרויקט נמחק", description: "הפרויקט נמחק בהצלחה." });
      setIsDeleteDialogOpen(false);
      setEditingProject(null);
    },
    onError: (error) => {
      toast({ title: "שגיאה במחיקת פרויקט", description: error.message, variant: "destructive" });
    }
  });

  const handleAddProject = () => {
    addMutation.mutate(newProject);
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;
    updateMutation.mutate(editingProject);
  };

  const handleDeleteProject = () => {
    if (!editingProject?.id) return;
    deleteMutation.mutate(editingProject.id);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-construction-navy">ניהול פרויקטים</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-construction-navy">
              <Plus className="w-4 h-4 ml-2" /> הוסף פרויקט
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>הוסף פרויקט חדש</DialogTitle>
              <DialogDescription>
                הוסף פרטים עבור פרויקט בנייה חדש להצגה באתר.
              </DialogDescription>
            </DialogHeader>
            {/* טופס הוספה */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">שם הפרויקט</label>
                  <Input 
                    id="title" 
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="שם הפרויקט"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">קטגוריה</label>
                  <Select 
                    value={newProject.category || ''}
                    onValueChange={(value) => setNewProject({...newProject, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="בחר קטגוריה" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="מסחרי">מסחרי</SelectItem>
                      <SelectItem value="מגורים">מגורים</SelectItem>
                      <SelectItem value="שיפוץ">שיפוץ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">תמונה</label>
                <Input 
                  id="image" 
                  value={newProject.image || ''}
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  placeholder="קישור לתמונה"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">תיאור</label>
                <Input 
                  id="description" 
                  value={newProject.description || ''}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="תיאור הפרויקט"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">מיקום</label>
                  <Input 
                    id="location" 
                    value={newProject.location || ''}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    placeholder="מיקום הפרויקט"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">שנה</label>
                  <Input 
                    id="year"
                    type="number"
                    value={newProject.year || ''}
                    onChange={(e) => setNewProject({...newProject, year: parseInt(e.target.value) || new Date().getFullYear()})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="client" className="text-sm font-medium">לקוח</label>
                <Input 
                  id="client" 
                  value={newProject.client || ''}
                  onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                  placeholder="שם הלקוח"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                ביטול
              </Button>
              <Button 
                className="bg-construction-navy"
                onClick={handleAddProject}
                disabled={!newProject.title || !newProject.image || !newProject.description || addMutation.isPending}
              >
                {addMutation.isPending ? 'מוסיף...' : 'הוסף פרויקט'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">שם הפרויקט</TableHead>
              <TableHead>קטגוריה</TableHead>
              <TableHead>מיקום</TableHead>
              <TableHead>שנה</TableHead>
              <TableHead className="text-right">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="text-right space-x-2">
                    <Skeleton className="h-8 w-8 inline-block" />
                    <Skeleton className="h-8 w-8 inline-block" />
                  </TableCell>
                </TableRow>
              ))
            ) : projectsError ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-red-500">
                  שגיאה בטעינת הפרויקטים: {projectsError.message}
                </TableCell>
              </TableRow>
            ) : (projects && projects.length > 0) ? (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.year}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingProject(project);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pen className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setEditingProject(project);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  לא נמצאו פרויקטים. הוסף פרויקט חדש כדי להתחיל.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ערוך פרויקט</DialogTitle>
            <DialogDescription>
              עדכן את פרטי הפרויקט שלך.
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-title" className="text-sm font-medium">שם הפרויקט</label>
                  <Input 
                    id="edit-title" 
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">קטגוריה</label>
                  <Select 
                    value={editingProject.category || ''}
                    onValueChange={(value) => setEditingProject({...editingProject, category: value})}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="מסחרי">מסחרי</SelectItem>
                      <SelectItem value="מגורים">מגורים</SelectItem>
                      <SelectItem value="שיפוץ">שיפוץ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium">תמונה</label>
                <Input 
                  id="edit-image" 
                  value={editingProject.image || ''}
                  onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">תיאור</label>
                <Input 
                  id="edit-description" 
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-location" className="text-sm font-medium">מיקום</label>
                  <Input 
                    id="edit-location" 
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-year" className="text-sm font-medium">שנה</label>
                  <Input 
                    id="edit-year"
                    type="number"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({...editingProject, year: parseInt(e.target.value) || new Date().getFullYear()})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-client" className="text-sm font-medium">לקוח</label>
                <Input 
                  id="edit-client" 
                  value={editingProject.client || ''}
                  onChange={(e) => setEditingProject({...editingProject, client: e.target.value})}
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
              onClick={handleUpdateProject}
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
            <DialogTitle>מחק פרויקט</DialogTitle>
            <DialogDescription>
              האם אתה בטוח שברצונך למחוק את הפרויקט הזה? פעולה זו אינה ניתנת לביטול.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              ביטול
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteProject}
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

export default AdminProjects;
