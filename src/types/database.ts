export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = "user" | "admin";
export type BlogPostStatus = "draft" | "published" | "archived";

type ProfileRow = {
  id: string;
  display_name: string | null;
  role: AppRole;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_markdown: string;
  cover_image_path: string | null;
  cover_image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: BlogPostStatus;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type Table<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<
        ProfileRow,
        { id: string; display_name?: string | null; role?: AppRole },
        { display_name?: string | null; role?: AppRole; updated_at?: string }
      >;
      blog_posts: Table<
        BlogPost,
        Omit<BlogPost, "id" | "created_at" | "updated_at"> & { id?: string },
        Partial<Omit<BlogPost, "id" | "created_at">>
      >;
      beta_submissions: Table<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>;
      contact_submissions: Table<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>;
      job_applications: Table<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>;
      form_rate_limits: Table<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      app_role: AppRole;
      blog_post_status: BlogPostStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
