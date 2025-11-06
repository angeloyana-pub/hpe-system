import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/context/theme-context';

export function ChangeTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <div className="leading-none font-semibold">Theme</div>
        <div className="text-muted-foreground text-sm">Change app theme</div>
      </div>
      <Select value={theme} onValueChange={(val) => setTheme(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
