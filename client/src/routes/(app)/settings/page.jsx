import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

import { ChangePasswordForm } from './_components/change-password-form';
import { ChangeTheme } from './_components/change-theme';

function Settings() {
  return (
    <SidebarInset>
      <header className="p-4 sticky h-14 top-0 flex items-center z-2 bg-background border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="ml-2 mr-4" />
        Settings
      </header>
      <div className="p-4 space-y-6">
        <ChangeTheme />
        <ChangePasswordForm />
      </div>
    </SidebarInset>
  );
}

export default Settings;
