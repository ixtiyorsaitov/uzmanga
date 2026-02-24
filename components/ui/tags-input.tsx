"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X as RemoveIcon } from "lucide-react";
import React from "react";

const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;
const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

interface TagsInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  minItems?: number;
}

interface TagsInputContextProps {
  value: string[];
  onValueChange: (value: any) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TagInputContext = React.createContext<TagsInputContextProps | null>(null);

export const TagsInput = React.forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      children,
      value,
      onValueChange,
      placeholder,
      maxItems,
      minItems,
      className,
      dir,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [inputValue, setInputValue] = React.useState("");
    const [disableInput, setDisableInput] = React.useState(false);
    const [disableButton, setDisableButton] = React.useState(false);

    // XATO QILUVCHI STATELAR OLIB TASHLANDI: isValueSelected va selectedValue

    const parseMinItems = minItems ?? 0;
    const parseMaxItems = maxItems ?? Infinity;

    const onValueChangeHandler = React.useCallback(
      (val: string) => {
        if (!value.includes(val) && value.length < parseMaxItems) {
          onValueChange([...value, val]);
        }
      },
      [value, parseMaxItems, onValueChange],
    );

    const RemoveValue = React.useCallback(
      (val: string) => {
        if (value.includes(val) && value.length > parseMinItems) {
          onValueChange(value.filter((item) => item !== val));
        }
      },
      [value, parseMinItems, onValueChange],
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const tags = e.clipboardData.getData("text").split(SPLITTER_REGEX);
        const newValue = [...value];
        tags.forEach((item) => {
          const parsedItem = item.replaceAll(FORMATTING_REGEX, "").trim();
          if (
            parsedItem.length > 0 &&
            !newValue.includes(parsedItem) &&
            newValue.length < parseMaxItems
          ) {
            newValue.push(parsedItem);
          }
        });
        onValueChange(newValue);
        setInputValue("");
      },
      [value, parseMaxItems, onValueChange],
    );

    React.useEffect(() => {
      const VerifyDisable = () => {
        setDisableButton(value.length - 1 < parseMinItems);
        setDisableInput(value.length + 1 > parseMaxItems);
      };
      VerifyDisable();
    }, [value, parseMinItems, parseMaxItems]);

    // ASYNC OLIB TASHLANDI - event loop ni buzmasligi uchun
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();

        const moveNext = () => {
          const nextIndex =
            activeIndex + 1 > value.length - 1 ? -1 : activeIndex + 1;
          setActiveIndex(nextIndex);
        };

        const movePrev = () => {
          const prevIndex =
            activeIndex - 1 < 0 ? value.length - 1 : activeIndex - 1;
          setActiveIndex(prevIndex);
        };

        const moveCurrent = () => {
          const newIndex =
            activeIndex - 1 <= 0
              ? value.length - 1 === 0
                ? -1
                : 0
              : activeIndex - 1;
          setActiveIndex(newIndex);
        };
        const target = e.currentTarget;

        switch (e.key) {
          case "ArrowLeft":
            if (dir === "rtl") {
              if (value.length > 0 && activeIndex !== -1) moveNext();
            } else {
              if (value.length > 0 && target.selectionStart === 0) movePrev();
            }
            break;

          case "ArrowRight":
            if (dir === "rtl") {
              if (value.length > 0 && target.selectionStart === 0) movePrev();
            } else {
              if (value.length > 0 && activeIndex !== -1) moveNext();
            }
            break;

          case "Backspace":
          case "Delete":
            if (value.length > 0) {
              if (activeIndex !== -1 && activeIndex < value.length) {
                RemoveValue(value[activeIndex]);
                moveCurrent();
              } else {
                const isFullySelected =
                  target.selectionStart === 0 &&
                  target.selectionEnd === target.value.length;
                if (target.value === "" || isFullySelected) {
                  RemoveValue(value[value.length - 1]);
                }
              }
            }
            break;

          case "Escape":
            const newIndex = activeIndex === -1 ? value.length - 1 : -1;
            setActiveIndex(newIndex);
            break;

          case "Enter":
            if (inputValue.trim() !== "") {
              e.preventDefault();
              onValueChangeHandler(inputValue.trim());
              setInputValue("");
            }
            break;
        }
      },
      [activeIndex, value, inputValue, RemoveValue, dir, onValueChangeHandler],
    );

    const mousePreventDefault = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    return (
      <TagInputContext.Provider
        value={{
          value,
          onValueChange,
          inputValue,
          setInputValue,
          activeIndex,
          setActiveIndex,
        }}
      >
        <div
          {...props}
          ref={ref}
          dir={dir}
          className={cn(
            "flex items-center flex-wrap gap-1 p-1 rounded-lg overflow-hidden",
            {
              "focus-within:ring-ring": activeIndex === -1,
            },
            className,
          )}
        >
          {value.map((item, index) => (
            <Badge
              tabIndex={activeIndex !== -1 ? 0 : activeIndex}
              key={item}
              aria-disabled={disableButton}
              data-active={activeIndex === index}
              className={cn(
                "relative px-1 rounded-full flex items-center gap-1 data-[active='true']:ring-2 data-[active='true']:ring-muted-foreground truncate aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
              )}
            >
              <span className="text-xs">{item}</span>
              <button
                type="button"
                aria-label={`Remove ${item} option`}
                aria-roledescription="button to remove option"
                disabled={disableButton}
                onMouseDown={mousePreventDefault}
                onClick={() => RemoveValue(item)}
                className="disabled:cursor-not-allowed"
              >
                <span className="sr-only">Remove {item} option</span>
                <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
              </button>
            </Badge>
          ))}
          <Input
            tabIndex={0}
            aria-label="input tag"
            disabled={disableInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onClick={() => setActiveIndex(-1)}
            className={cn(
              "border-none h-7 bg-transparent! flex-1 px-1",
              activeIndex !== -1 && "caret-transparent",
            )}
          />
        </div>
      </TagInputContext.Provider>
    );
  },
);

TagsInput.displayName = "TagsInput";
