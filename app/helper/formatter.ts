export function slugify(value: string): string {
  const cleanedString = value.replace(/[^a-zA-Z0-9 ]/g, "");

  const slug = cleanedString.replace(/\s+/g, "-").toLowerCase();

  return slug;
}
