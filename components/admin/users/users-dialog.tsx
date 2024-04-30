import { useDialog } from '@/components/ui/use-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';
import { EditUserForm } from './edit-user-form';

export function UserDialogs({ data }: any) {
  const editDialog = useDialog();
  const deleteDialog = useDialog();
  const { toast } = useToast();

  const handleUserDelete = async () => {
    const response = await fetch(`/api/user/${data.row.original.email}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast({
        title: 'User Deleted',
        description: 'User has been deleted successfully',
        variant: 'success',
      });
      deleteDialog.dismiss();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={editDialog.trigger}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={deleteDialog.trigger}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog {...editDialog.props}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to a users role here. Click save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <EditUserForm editDialog={editDialog} data={data} />
        </DialogContent>
      </Dialog>
      <Dialog {...deleteDialog.props}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure? This is IRREVERSIBLE!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={'destructive'} onClick={handleUserDelete}>
              Delete
            </Button>
            <Button onClick={deleteDialog.dismiss}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
