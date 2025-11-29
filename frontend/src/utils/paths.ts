/**
 * Get a public asset path that respects the base URL
 * @param path - The path relative to the public folder (e.g., 'images/logo.png')
 * @returns The full path including base URL
 */
export const getAssetPath = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL;
  // Remove leading slash from path if present, as BASE_URL already includes trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

