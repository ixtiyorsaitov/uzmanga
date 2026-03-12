import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, any>>,
  allValues: T,
): Partial<T> {
  const dirtyValues = Object.keys(dirtyFields).reduce((acc, key) => {
    const fieldKey = key as keyof T;

    if (dirtyFields[fieldKey]) {
      acc[fieldKey] = allValues[fieldKey];
    }

    return acc;
  }, {} as Partial<T>);

  return dirtyValues;
}
