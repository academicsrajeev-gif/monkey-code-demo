-- ============================================================
-- DON BOSCO PUBLIC SCHOOL HATHAURA - DATABASE SCHEMA
-- Run this in Supabase SQL Editor after creating your project
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- STUDENTS
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

-- TEACHERS / STAFF
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

-- CLASSES
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  teacher_id UUID REFERENCES staff(id),
  is_active BOOLEAN DEFAULT true
);

-- SUBJECTS
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  teacher_id UUID REFERENCES staff(id),
  UNIQUE(name, class)
);

-- STUDENT ATTENDANCE
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'half-day', 'holiday')),
  marked_by UUID REFERENCES staff(id),
  remarks TEXT,
  UNIQUE(student_id, date)
);

-- TEACHER ATTENDANCE
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

-- FEE STRUCTURE
CREATE TABLE fee_structure (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class TEXT NOT NULL,
  fee_type TEXT NOT NULL CHECK (fee_type IN ('tuition', 'transport', 'activity', 'annual', 'exam', 'other')),
  amount DECIMAL(10,2) NOT NULL,
  term TEXT,
  academic_year TEXT NOT NULL DEFAULT '2025-26',
  UNIQUE(class, fee_type, term, academic_year)
);

-- FEE PAYMENTS
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

-- BADGES / GAMIFICATION
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL CHECK (badge_type IN ('perfect-week', 'perfect-month', 'star-performer', 'improvement', 'participation')),
  awarded_date DATE NOT NULL,
  reason TEXT,
  icon_url TEXT,
  UNIQUE(student_id, badge_type, awarded_date)
);

-- RESOURCES / LMS
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

-- NOTIFICATIONS LOG
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

-- SCHOOL EVENTS
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

-- PHOTO GALLERY
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

-- ANNOUNCEMENTS
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
-- INDEXES
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
-- ROW LEVEL SECURITY
-- ============================================================
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

-- Admin can see everything
CREATE POLICY "admin_all" ON students FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "admin_all_staff" ON staff FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Teachers see their assigned classes
CREATE POLICY "teacher_view_students" ON students FOR SELECT USING (
  auth.jwt() ->> 'role' = 'teacher'
  AND class = ANY(
    SELECT unnest(assigned_classes) FROM staff WHERE id = auth.uid()
  )
);

-- Parents see only their children
CREATE POLICY "parent_view_own" ON students FOR SELECT USING (
  auth.jwt() ->> 'role' = 'parent'
  AND parent_phone = (SELECT phone FROM parent_accounts WHERE id = auth.uid())
);

-- ============================================================
-- SEED DATA (Don Bosco School Hathaura)
-- ============================================================
INSERT INTO classes (name, display_order) VALUES
  ('Playgroup', 1),
  ('Nursery', 2),
  ('LKG', 3),
  ('UKG', 4),
  ('1', 5),
  ('2', 6),
  ('3', 7),
  ('4', 8),
  ('5', 9),
  ('6', 10);

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Get attendance percentage for a student
CREATE OR REPLACE FUNCTION get_attendance_percentage(p_student_id UUID, p_days INTEGER DEFAULT 30)
RETURNS DECIMAL AS $$
DECLARE
  total INTEGER;
  present INTEGER;
BEGIN
  SELECT COUNT(*) INTO total FROM attendance
  WHERE student_id = p_student_id
  AND date > CURRENT_DATE - p_days;
  
  SELECT COUNT(*) INTO present FROM attendance
  WHERE student_id = p_student_id
  AND status IN ('present', 'late')
  AND date > CURRENT_DATE - p_days;
  
  RETURN CASE WHEN total > 0 THEN ROUND((present::DECIMAL / total) * 100, 1) ELSE 0 END;
END;
$$ LANGUAGE plpgsql;

-- Get fee balance for a student
CREATE OR REPLACE FUNCTION get_fee_balance(p_student_id UUID)
RETURNS DECIMAL AS $$
BEGIN
  RETURN COALESCE(SUM(balance), 0) FROM fees
  WHERE student_id = p_student_id AND status IN ('pending', 'partial', 'overdue');
END;
$$ LANGUAGE plpgsql;
