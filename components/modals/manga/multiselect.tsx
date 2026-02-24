"use client";

import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  useComboboxAnchor,
} from "@/components/ui/combobox";

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { _id: string; name: string }[];
  placeholder?: string;
  label?: string;
  isLoading?: boolean;
  maxVisible?: number;
}

export function MultiSelect({
  value = [],
  onChange,
  options,
  placeholder,
  isLoading = false,
  maxVisible = 2,
}: MultiSelectProps) {
  const anchor = useComboboxAnchor();

  const visibleIds = value.slice(0, maxVisible);
  const hiddenCount = value.length - maxVisible;

  return (
    <Combobox value={value} onValueChange={onChange} multiple>
      <ComboboxChips ref={anchor}>
        {visibleIds.map((id) => {
          const item = options.find((opt) => opt._id === id);
          return (
            <ComboboxChip key={id}>{item ? item.name : "..."}</ComboboxChip>
          );
        })}

        {hiddenCount > 0 && (
          <div className="bg-muted text-foreground flex h-5.5 items-center justify-center rounded-sm px-1.5 text-xs font-medium">
            +{hiddenCount}
          </div>
        )}

        <ComboboxChipsInput
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={isLoading}
        />
      </ComboboxChips>

      <ComboboxContent anchor={anchor} align="start" className="w-full">
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option._id} value={option._id}>
              {option.name}
            </ComboboxItem>
          ))}
          {!isLoading && options.length === 0 && (
            <ComboboxEmpty>Ma'lumot topilmadi</ComboboxEmpty>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
