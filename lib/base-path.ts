const normalizedBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  ""
);

export function assetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!normalizedBasePath) {
    return normalizedPath;
  }

  return `${normalizedBasePath}${normalizedPath}`;
}

