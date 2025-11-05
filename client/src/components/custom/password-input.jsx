import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput type={showPassword ? 'text' : 'password'} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Eye /> : <EyeOff />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
