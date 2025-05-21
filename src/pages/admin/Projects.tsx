
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

// Mock data - would come from API/database in a real app
const initialProjects = [
  {
    id: 1,
    title: "Modern Office Building",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    description: "A 10-story modern office building with sustainable design elements and state-of-the-art facilities.",
    location: "Downtown Business District",
    year: 2023,
    client: "Tech Innovations Inc."
  },
  {
    id: 2,
    title: "Luxury Residential Complex",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "Premium residential complex featuring 45 luxury apartments with high-end finishes and amenities.",
    location: "Riverside Heights",
    year: 2022,
    client: "Riverside Developments LLC"
  },
];

type Project = typeof initialProjects[0];

const AdminProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    category: "Commercial",
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

  // Function to handle adding a new project
  const handleAddProject = () => {
    const id = Math.max(0, ...projects.map(p => p.id)) + 1;
    const projectToAdd = { ...newProject, id } as Project;
    setProjects([...projects, projectToAdd]);
    setIsAddDialogOpen(false);
    toast({
      title: "Project added",
      description: `${projectToAdd.title} has been added successfully.`
    });
    // Reset form
    setNewProject({
      title: "",
      category: "Commercial",
      image: "",
      description: "",
      location: "",
      year: new Date().getFullYear(),
      client: ""
    });
  };

  // Function to handle updating a project
  const handleUpdateProject = () => {
    if (!editingProject) return;
    
    const updatedProjects = projects.map(p => 
      p.id === editingProject.id ? editingProject : p
    );
    
    setProjects(updatedProjects);
    setIsEditDialogOpen(false);
    toast({
      title: "Project updated",
      description: `${editingProject.title} has been updated successfully.`
    });
    setEditingProject(null);
  };

  // Function to handle deleting a project
  const handleDeleteProject = () => {
    if (!editingProject) return;
    
    const updatedProjects = projects.filter(p => p.id !== editingProject.id);
    setProjects(updatedProjects);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Project deleted",
      description: `${editingProject.title} has been deleted successfully.`
    });
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-construction-navy">Manage Projects</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-construction-navy">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Add details for a new construction project to showcase on your website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input 
                    id="title" 
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="Project title"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select 
                    value={newProject.category}
                    onValueChange={(value) => setNewProject({...newProject, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Renovation">Renovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                <Input 
                  id="image" 
                  value={newProject.image}
                  onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Input 
                  id="description" 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Project description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">Location</label>
                  <Input 
                    id="location" 
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    placeholder="Project location"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">Year</label>
                  <Input 
                    id="year"
                    type="number"
                    value={newProject.year}
                    onChange={(e) => setNewProject({...newProject, year: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="client" className="text-sm font-medium">Client</label>
                <Input 
                  id="client" 
                  value={newProject.client}
                  onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                  placeholder="Client name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-construction-navy"
                onClick={handleAddProject}
                disabled={!newProject.title || !newProject.image || !newProject.description}
              >
                Add Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Project table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
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
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No projects found. Add a new project to get started.
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
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the details of your construction project.
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                  <Input 
                    id="edit-title" 
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
                  <Select 
                    value={editingProject.category}
                    onValueChange={(value) => setEditingProject({...editingProject, category: value})}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Renovation">Renovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium">Image URL</label>
                <Input 
                  id="edit-image" 
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                <Input 
                  id="edit-description" 
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-location" className="text-sm font-medium">Location</label>
                  <Input 
                    id="edit-location" 
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({...editingProject, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-year" className="text-sm font-medium">Year</label>
                  <Input 
                    id="edit-year"
                    type="number"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({...editingProject, year: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-client" className="text-sm font-medium">Client</label>
                <Input 
                  id="edit-client" 
                  value={editingProject.client}
                  onChange={(e) => setEditingProject({...editingProject, client: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-construction-navy"
              onClick={handleUpdateProject}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteProject}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
