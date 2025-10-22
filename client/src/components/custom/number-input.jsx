import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function NumberInput({
  value = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  size,
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
    <div
      className={cn(
        'flex h-9 w-full items-center rounded-md border shadow-xs',
        size === 'sm' && 'h-8',
        className
      )}
    >
      <Button
        aria-label="decrement"
        type="button"
        variant="ghost"
        className={cn('h-full w-9 shrink-0 rounded-r-none bg-transparent', size === 'sm' && 'w-8')}
        onClick={handleDecrement}
        disabled={disabled || (min !== undefined && currentValue <= min)}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Input
        type="number"
        inputMode="numeric"
        value={currentValue}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="[appearance:textfield] rounded-none border-0 px-0 text-center shadow-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <Button
        aria-label="increment"
        type="button"
        variant="ghost"
        size={size === 'sm' ? 'sm' : 'icon'}
        className={cn('h-full w-9 shrink-0 rounded-l-none bg-transparent', size === 'sm' && 'w-8')}
        onClick={handleIncrement}
        disabled={disabled || (max !== undefined && currentValue >= max)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
