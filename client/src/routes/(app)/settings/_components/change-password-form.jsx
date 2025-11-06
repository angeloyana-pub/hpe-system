import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { changePassword } from '@/auth/service';
import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { changePasswordSchema } from '../_lib/validators';

export function ChangePasswordForm() {
  const navigate = useNavigate();
  const [isChangePasswordPending, startChangePasswordTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleSubmit = (data) => {
    startChangePasswordTransition(async () => {
      try {
        await changePassword(data);
        toast.success('Successfully changed password! Please login again.');
        navigate('/login');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 400:
              form.setError('oldPassword', {
                type: 'manual',
                message: 'Incorrect password',
              });
              break;
            case 401:
              toast.error('Session expired, please login.');
              break;
          }
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <div className="leading-none font-semibold">Change Password</div>
        <div className="text-muted-foreground text-sm">Set new password for your account</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Old Password" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="New Password" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isChangePasswordPending}>
            {isChangePasswordPending && <Loader aria-hidden="true" className="animate-spin" />}
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
