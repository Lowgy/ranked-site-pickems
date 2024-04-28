import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uuidToUsername(uuid: string) {
  const res = await fetch(`https://api.minetools.eu/uuid/${uuid}`);
  const data = await res.json();
  return data.name;
}
