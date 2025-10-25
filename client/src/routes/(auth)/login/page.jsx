import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/auth/context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { loginSchema } from './_lib/validators';

function Login() {
  const [isLoginPending, startLoginTransition] = useTransition();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = (data) => {
    startLoginTransition(async () => {
      try {
        await login(data, { redirectTo: '/parts' }); // TODO: redirect to dashboard
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 400) {
          form.setError('username', {
            type: 'manual',
            message: 'Incorrect username or password',
          });
          form.setError('password', {
            type: 'manual',
            message: 'Incorrect username or password',
          });
        } else {
          throw err;
        }
      }
    });
  };

  return (
    <div className="h-svh p-4 flex items-center justify-center">
      <Card className="w-full sm:w-[300px]">
        <CardHeader className="justify-center text-center">
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Please enter your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoginPending}>
                {isLoginPending && <Loader aria-hidden="true" className="animate-spin" />}
                Log in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
