-- ============================================================
-- DON BOSCO PUBLIC SCHOOL HATHAURA - COMPLETE DATABASE SETUP
-- Run this ONCE in Supabase SQL Editor
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables & policies (safe to re-run)
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS fees CASCADE;
DROP TABLE IF EXISTS fee_structure CASCADE;
DROP TABLE IF EXISTS teacher_attendance CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- ============================================================
-- 1. TABLES
-- ============================================================

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admission_no VARCHAR(20) UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  class TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  dob DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  parent_name TEXT NOT NULL,
  parent_phone VARCHAR(15) NOT NULL,
  parent_email TEXT,
  alternate_phone VARCHAR(15),
  address TEXT,
  blood_group VARCHAR(5),
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_code VARCHAR(20) UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'admin', 'accountant', 'principal')),
  phone VARCHAR(15) NOT NULL,
  email TEXT UNIQUE,
  subject_specialization TEXT[],
  assigned_classes TEXT[],
  is_active BOOLEAN DEFAULT true,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  teacher_id UUID REFERENCES staff(id),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  teacher_id UUID REFERENCES staff(id),
  UNIQUE(name, class)
);

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'half-day', 'holiday')),
  marked_by UUID REFERENCES staff(id),
  remarks TEXT,
  UNIQUE(student_id, date)
);

CREATE TABLE teacher_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'leave', 'half-day')),
  remarks TEXT,
  UNIQUE(staff_id, date)
);

CREATE TABLE fee_structure (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class TEXT NOT NULL,
  fee_type TEXT NOT NULL CHECK (fee_type IN ('tuition', 'transport', 'activity', 'annual', 'exam', 'other')),
  amount DECIMAL(10,2) NOT NULL,
  term TEXT,
  academic_year TEXT NOT NULL DEFAULT '2025-26',
  UNIQUE(class, fee_type, term, academic_year)
);

CREATE TABLE fees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  fee_type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  fine DECIMAL(10,2) DEFAULT 0,
  balance DECIMAL(10,2) GENERATED ALWAYS AS (amount - COALESCE(paid_amount,0) - COALESCE(discount,0) + COALESCE(fine,0)) STORED,
  payment_mode TEXT CHECK (payment_mode IN ('cash', 'online', 'cheque', 'upi', 'bank-transfer')),
  transaction_ref TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'partial', 'overdue', 'waived')),
  recorded_by UUID REFERENCES staff(id),
  receipt_url TEXT,
  academic_year TEXT NOT NULL DEFAULT '2025-26',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL CHECK (badge_type IN ('perfect-week', 'perfect-month', 'star-performer', 'improvement', 'participation')),
  awarded_date DATE NOT NULL,
  reason TEXT,
  icon_url TEXT,
  UNIQUE(student_id, badge_type, awarded_date)
);

CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class TEXT NOT NULL,
  subject TEXT,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('worksheet', 'video', 'assignment', 'notice', 'study-material', 'link')),
  description TEXT,
  file_url TEXT,
  uploaded_by UUID REFERENCES staff(id),
  upload_date DATE DEFAULT CURRENT_DATE,
  due_date DATE
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('student', 'staff', 'class', 'all')),
  recipient_id UUID,
  class TEXT,
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'sms', 'email', 'push', 'in-app')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'read')),
  sent_at TIMESTAMP DEFAULT now(),
  read_at TIMESTAMP
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  end_time TIME,
  venue TEXT,
  is_holiday BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  google_calendar_id TEXT,
  created_by UUID REFERENCES staff(id),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  album TEXT,
  uploaded_by UUID REFERENCES staff(id),
  upload_date TIMESTAMP DEFAULT now(),
  is_public BOOLEAN DEFAULT true
);

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT 'all' CHECK (target IN ('all', 'parents', 'teachers', 'class')),
  class TEXT,
  created_by UUID REFERENCES staff(id),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  published_at TIMESTAMP
);

-- ============================================================
-- 2. USER PROFILES (links auth.users to staff/parents)
-- ============================================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'parent', 'principal', 'accountant')),
  staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  student_ids UUID[] DEFAULT '{}',
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, role, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'parent'),
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 3. INDEXES
-- ============================================================

CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_fees_student ON fees(student_id);
CREATE INDEX idx_fees_status ON fees(status);
CREATE INDEX idx_students_class ON students(class);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_resources_class ON resources(class);
CREATE INDEX idx_notifications_status ON notifications(status);

-- ============================================================
-- 4. RLS HELPERS
-- ============================================================

CREATE OR REPLACE FUNCTION current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION current_staff_id()
RETURNS UUID AS $$
  SELECT staff_id FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION current_student_ids()
RETURNS UUID[] AS $$
  SELECT student_ids FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

-- ============================================================
-- 5. ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structure ENABLE ROW LEVEL SECURITY;

-- STUDENTS
CREATE POLICY "admin_all_students" ON students
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));
CREATE POLICY "teacher_view_students" ON students
  FOR SELECT USING (
    current_user_role() = 'teacher'
    AND class = ANY(SELECT unnest(assigned_classes) FROM staff WHERE id = current_staff_id())
  );
CREATE POLICY "parent_view_own_children" ON students
  FOR SELECT USING (
    current_user_role() = 'parent'
    AND id = ANY(current_student_ids())
  );

-- STAFF
CREATE POLICY "admin_all_staff" ON staff
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));
CREATE POLICY "teacher_view_self" ON staff
  FOR SELECT USING (
    current_user_role() = 'teacher'
    AND id = current_staff_id()
  );

-- ATTENDANCE
CREATE POLICY "admin_all_attendance" ON attendance
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));
CREATE POLICY "teacher_manage_attendance" ON attendance
  FOR ALL USING (
    current_user_role() = 'teacher'
    AND student_id IN (
      SELECT id FROM students
      WHERE class = ANY(SELECT unnest(assigned_classes) FROM staff WHERE id = current_staff_id())
    )
  );
CREATE POLICY "parent_view_attendance" ON attendance
  FOR SELECT USING (
    current_user_role() = 'parent'
    AND student_id = ANY(current_student_ids())
  );

-- TEACHER ATTENDANCE
CREATE POLICY "admin_all_teacher_attendance" ON teacher_attendance
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));
CREATE POLICY "teacher_view_own_attendance" ON teacher_attendance
  FOR SELECT USING (
    current_user_role() = 'teacher'
    AND staff_id = current_staff_id()
  );

-- FEES
CREATE POLICY "admin_all_fees" ON fees
  FOR ALL USING (current_user_role() IN ('admin', 'principal', 'accountant'));
CREATE POLICY "parent_view_fees" ON fees
  FOR SELECT USING (
    current_user_role() = 'parent'
    AND student_id = ANY(current_student_ids())
  );

-- FEE STRUCTURE (public read)
CREATE POLICY "all_read_fee_structure" ON fee_structure
  FOR SELECT USING (true);
CREATE POLICY "admin_manage_fee_structure" ON fee_structure
  FOR ALL USING (current_user_role() IN ('admin', 'principal', 'accountant'));

-- BADGES
CREATE POLICY "admin_all_badges" ON badges
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));
CREATE POLICY "parent_view_badges" ON badges
  FOR SELECT USING (
    current_user_role() = 'parent'
    AND student_id = ANY(current_student_ids())
  );

-- RESOURCES
CREATE POLICY "all_read_resources" ON resources
  FOR SELECT USING (true);
CREATE POLICY "teacher_insert_resources" ON resources
  FOR INSERT WITH CHECK (current_user_role() IN ('teacher', 'admin', 'principal'));
CREATE POLICY "teacher_manage_resources" ON resources
  FOR ALL USING (current_user_role() IN ('teacher', 'admin', 'principal'));

-- EVENTS
CREATE POLICY "all_read_events" ON events
  FOR SELECT USING (true);
CREATE POLICY "admin_manage_events" ON events
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));

-- ANNOUNCEMENTS
CREATE POLICY "all_read_announcements" ON announcements
  FOR SELECT USING (is_published = true);
CREATE POLICY "admin_manage_announcements" ON announcements
  FOR ALL USING (current_user_role() IN ('admin', 'principal', 'teacher'));

-- GALLERY
CREATE POLICY "all_read_gallery" ON gallery
  FOR SELECT USING (is_public = true);
CREATE POLICY "admin_manage_gallery" ON gallery
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));

-- USER PROFILES (users see only their own)
CREATE POLICY "users_own_profile" ON user_profiles
  FOR SELECT USING (id = auth.uid());
CREATE POLICY "admin_all_profiles" ON user_profiles
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));

-- NOTIFICATIONS
CREATE POLICY "admin_all_notifications" ON notifications
  FOR ALL USING (current_user_role() IN ('admin', 'principal'));
CREATE POLICY "users_own_notifications" ON notifications
  FOR SELECT USING (
    (current_user_role() = 'teacher' AND recipient_id = current_staff_id()) OR
    (current_user_role() = 'parent' AND recipient_id = ANY(current_student_ids()))
  );

-- ============================================================
-- 6. SEED DATA
-- ============================================================

INSERT INTO classes (name, display_order) VALUES
  ('Playgroup', 1), ('Nursery', 2), ('LKG', 3), ('UKG', 4),
  ('1', 5), ('2', 6), ('3', 7), ('4', 8), ('5', 9), ('6', 10);

-- ============================================================
-- 7. HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION get_attendance_percentage(p_student_id UUID, p_days INTEGER DEFAULT 30)
RETURNS DECIMAL AS $$
DECLARE
  total INTEGER;
  present INTEGER;
BEGIN
  SELECT COUNT(*) INTO total FROM attendance
  WHERE student_id = p_student_id AND date > CURRENT_DATE - p_days;
  SELECT COUNT(*) INTO present FROM attendance
  WHERE student_id = p_student_id AND status IN ('present', 'late') AND date > CURRENT_DATE - p_days;
  RETURN CASE WHEN total > 0 THEN ROUND((present::DECIMAL / total) * 100, 1) ELSE 0 END;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_fee_balance(p_student_id UUID)
RETURNS DECIMAL AS $$
BEGIN
  RETURN COALESCE(SUM(balance), 0) FROM fees
  WHERE student_id = p_student_id AND status IN ('pending', 'partial', 'overdue');
END;
$$ LANGUAGE plpgsql;
