
-- Add 'admin' role to the user_role_type enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = 'user_role_type'::regtype AND enumlabel = 'admin') THEN
        ALTER TYPE public.user_role_type ADD VALUE 'admin';
    END IF;
END$$;

-- Fix for projects table by adding missing columns
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS image TEXT;

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    features TEXT[]
);

-- Enable Row Level Security on both tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create a function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::public.user_role_type
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply RLS Policies for Projects
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin full access to projects" ON public.projects;
CREATE POLICY "Allow admin full access to projects" ON public.projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Apply RLS Policies for Services
DROP POLICY IF EXISTS "Allow public read access to services" ON public.services;
CREATE POLICY "Allow public read access to services" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin full access to services" ON public.services;
CREATE POLICY "Allow admin full access to services" ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
