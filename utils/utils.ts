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
