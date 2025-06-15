
-- PROJECTS TABLE
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  year INT,
  client TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- PROJECT IMAGES TABLE (for multiple images per project)
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- USER ROLES TABLE
CREATE TYPE public.user_role_type AS ENUM ('manager', 'foreman', 'worker');
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role public.user_role_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(email)
);

-- END OF DAY REPORTS
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  foreman_id UUID REFERENCES auth.users(id),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- REPORT IMAGES TABLE
CREATE TABLE public.report_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_images ENABLE ROW LEVEL SECURITY;

-- PROJECTS RLS
CREATE POLICY "Managers and foremen can view projects" ON public.projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
        AND role IN ('manager', 'foreman')
    )
  );
CREATE POLICY "Managers can insert projects" ON public.projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );
CREATE POLICY "Managers can update projects" ON public.projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );
CREATE POLICY "Managers can delete projects" ON public.projects
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );

-- PROJECT IMAGES: Split the MODIFY policies for manager to insert, update, delete
CREATE POLICY "Managers and foremen can view project images" ON public.project_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('manager', 'foreman')
    )
  );
CREATE POLICY "Managers can insert project images" ON public.project_images
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );
CREATE POLICY "Managers can update project images" ON public.project_images
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );
CREATE POLICY "Managers can delete project images" ON public.project_images
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );

-- USER ROLES
CREATE POLICY "Managers can insert user roles" ON public.user_roles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );
CREATE POLICY "Users can select their user_roles" ON public.user_roles
  FOR SELECT
  USING (user_id = auth.uid());

-- REPORTS
CREATE POLICY "Foremen can insert reports" ON public.reports
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'foreman'
    )
  );
CREATE POLICY "Managers and foremen can select reports" ON public.reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('manager', 'foreman')
    )
  );
CREATE POLICY "Managers can delete reports" ON public.reports
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'manager'
    )
  );

-- REPORT IMAGES
CREATE POLICY "Foremen can insert report images" ON public.report_images
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'foreman'
    )
  );
CREATE POLICY "Managers and foremen can select report images" ON public.report_images
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('manager', 'foreman')
    )
  );

-- CREATE STORAGE BUCKETS
insert into storage.buckets (id, name, public) values
  ('project-images', 'project-images', true),
  ('report-images', 'report-images', true)
  ON CONFLICT DO NOTHING;

