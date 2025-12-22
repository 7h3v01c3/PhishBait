import * as yaml from "js-yaml";

export async function fetchYaml<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load ${path} (${res.status})`);
  }

  const text = await res.text();
  const parsed = yaml.load(text);
  return parsed as T;
}


