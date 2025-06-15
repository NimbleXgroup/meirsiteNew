
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
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types";

interface DeleteServiceDialogProps {
  service: Service;
  children: React.ReactNode;
}

const DeleteServiceDialog = ({ service, children }: DeleteServiceDialogProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase.from('services').delete().eq('id', serviceId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: "שירות נמחק", description: "השירות נמחק בהצלחה." });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({ title: "שגיאה במחיקת שירות", description: error.message, variant: "destructive" });
    }
  });

  const handleDeleteService = () => {
    if (!service?.id) return;
    deleteMutation.mutate(service.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>מחק שירות</DialogTitle>
          <DialogDescription>
            האם למחוק את השירות "{service.title}"? לא ניתן לשחזר פעולה זו.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>ביטול</Button>
          <Button variant="destructive" onClick={handleDeleteService} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? 'מוחק...' : 'מחק'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServiceDialog;
