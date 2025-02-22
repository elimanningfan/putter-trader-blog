export interface Post {
  id: string;
  title: string;
  feature_image: string | null;
  excerpt: string;
  slug: string;
  html: string | null;
}

export interface Page {
  id: string;
  title: string;
  feature_image: string | null;
  excerpt: string;
  slug: string;
  html: string | null;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
