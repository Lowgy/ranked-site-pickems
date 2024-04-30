'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  role: z.enum(['admin', 'user']),
});

export function EditUserForm({ editDialog, data }: any) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, data.row.original.email);
    const response = await fetch(`/api/user/${data.row.original.email}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });
    if (response.ok) {
      editDialog.dismiss();
      toast({
        title: 'User Updated',
        description: 'User has been updated successfully',
        variant: 'success',
      });
      data.table.options.meta.fetchUsers();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role.." />
                  </SelectTrigger>
                  <SelectContent>
                    {['admin', 'user'].map((role) => (
                      <SelectItem key={role} {...field} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select the role for the user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mr-2">
          Save
        </Button>
        <Button type="button" onClick={editDialog.dismiss}>
          Cancel
        </Button>
      </form>
    </Form>
  );
}
