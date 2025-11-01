import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export function NumberInput({
  value = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className,
}) {
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = onChange ? value : internalValue;
  const setValue = onChange ?? setInternalValue;

  const handleIncrement = () => {
    const newValue = max !== undefined ? Math.min(currentValue + step, max) : currentValue + step;
    setValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = min !== undefined ? Math.max(currentValue - step, min) : currentValue - step;
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setValue(min ?? 0);
      return;
    }

    const numValue = Number.parseInt(inputValue, 10);
    if (!isNaN(numValue)) {
      let newValue = min !== undefined ? Math.max(numValue, min) : numValue;
      newValue = max !== undefined ? Math.min(numValue, max) : numValue;
      setValue(newValue);
    }
  };

  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <InputGroupButton
          aria-label="decrement"
          type="button"
          size="icon-xs"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && currentValue <= min)}
        >
          <Minus />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput
        type="number"
        inputMode="numeric"
        value={currentValue}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="text-center"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="increment"
          type="button"
          size="icon-xs"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && currentValue >= max)}
        >
          <Plus />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
