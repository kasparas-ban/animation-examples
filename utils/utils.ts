import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBrowser() {
  return navigator.userAgent.includes("Chrome")
    ? "Chrome"
    : navigator.userAgent.includes("Firefox")
    ? "Firefox"
    : navigator.userAgent.includes("Safari")
    ? "Safari"
    : "Other";
}

export function getDevice() {
  return /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
}

export const sleep = (seconds: number) => {
  let timeoutId: NodeJS.Timeout;
  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(resolve, seconds * 1000);
  });
  return { promise, cancel: () => clearTimeout(timeoutId) };
};
