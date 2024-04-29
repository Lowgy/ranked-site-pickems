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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Role
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-green-500 text-white hover:bg-green-600">
              Save changes
            </Button>
            <Button onClick={editDialog.dismiss}>Cancel</Button>
          </DialogFooter>
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
