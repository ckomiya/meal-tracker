"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { FoodItemOption } from "@/data/meals";

type FoodItemComboboxProps = {
  id: string;
  value: string;
  options: FoodItemOption[];
  onSelect: (option: FoodItemOption) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

export function FoodItemCombobox({
  id,
  value,
  options,
  onSelect,
  onValueChange,
  placeholder,
}: FoodItemComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start font-normal"
        >
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
          />
          <CommandList>
            <CommandEmpty>Sin coincidencias. Se creará un nuevo alimento.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {option.name} ({option.calories} kcal)
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
