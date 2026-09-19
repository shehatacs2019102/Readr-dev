export const genres = ["Fiction", "Sci-fi", "Non-fiction", "Fantasy"] as const;
export type Genre = (typeof genres)[number];
