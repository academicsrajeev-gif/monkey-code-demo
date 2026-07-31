import { createClient } from '@supabase/supabase-js'

// ✅ Don Bosco Public School Hathaura - Correct Anon Key
const supabaseUrl = 'https://iqgrjvstclkkclwmmvmk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZ3JqdnN0Y2xra2Nsd21tdm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNDkwMzYsImV4cCI6MjEwMDkyNTAzNn0.t0T1dO_zoGJ_7QLpkP_Z6umT87g1ddirR3qsu53epjM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const DEMO_MODE = false

export const demoData = {
  students: [
    { id: '1', admission_no: 'DB2025001', full_name: 'Aarav Kumar', class: '3', section: 'A', parent_name: 'Mr. Rajesh Kumar', parent_phone: '9876543210', attendance_pct: 95, fee_balance: 0, badges: ['perfect-week', 'star-performer'] },
    { id: '2', admission_no: 'DB2025002', full_name: 'Priya Singh', class: '3', section: 'A', parent_name: 'Mrs. Anita Singh', parent_phone: '9876543211', attendance_pct: 100, fee_balance: 2500, badges: ['perfect-week', 'perfect-month'] },
    { id: '3', admission_no: 'DB2025003', full_name: 'Rohit Sharma', class: '5', section: 'A', parent_name: 'Mr. Suresh Sharma', parent_phone: '9876543212', attendance_pct: 88, fee_balance: 0, badges: ['improvement'] },
    { id: '4', admission_no: 'DB2025004', full_name: 'Ananya Patel', class: '2', section: 'A', parent_name: 'Mrs. Meena Patel', parent_phone: '9876543213', attendance_pct: 92, fee_balance: 0, badges: [] },
    { id: '5', admission_no: 'DB2025005', full_name: 'Arjun Verma', class: '4', section: 'A', parent_name: 'Mr. Vikram Verma', parent_phone: '9876543214', attendance_pct: 78, fee_balance: 1500, badges: [] },
  ],
  staff: [
    { id: '1', employee_code: 'T001', full_name: 'Mrs. Sunita Devi', role: 'teacher', assigned_classes: ['3', '4'], subject_specialization: ['Mathematics', 'Science'] },
    { id: '2', employee_code: 'T002', full_name: 'Mr. Amit Kumar', role: 'teacher', assigned_classes: ['5', '6'], subject_specialization: ['English', 'Social Studies'] },
    { id: '3', employee_code: 'T003', full_name: 'Ms. Priyanka Gupta', role: 'teacher', assigned_classes: ['1', '2'], subject_specialization: ['Hindi', 'EVS'] },
    { id: '4', employee_code: 'A001', full_name: 'Fr. Principal', role: 'principal', assigned_classes: [], subject_specialization: [] },
  ],
  events: [
    { id: '1', title: 'Annual Day Celebration', description: 'Cultural programs, dance, music and awards ceremony.', event_date: '2025-12-15', event_time: '10:00', venue: 'School Auditorium' },
    { id: '2', title: 'Sports Day', description: 'Annual sports meet with track events, races and team games.', event_date: '2025-11-20', event_time: '08:00', venue: 'School Ground' },
    { id: '3', title: 'Parent-Teacher Meeting', description: 'Quarterly progress review meeting.', event_date: '2025-09-10', event_time: '09:00', venue: 'School Hall' },
    { id: '4', title: 'Summer Vacation', description: 'School closed for summer break.', event_date: '2025-05-01', is_holiday: true },
    { id: '5', title: 'Republic Day Celebration', description: 'Flag hoisting and cultural program.', event_date: '2026-01-26', event_time: '08:30', venue: 'School Ground' },
    { id: '6', title: 'Diwali Break', description: 'School closed for Diwali.', event_date: '2025-10-20', is_holiday: true },
  ],
  resources: [
    { id: '1', class: '3', subject: 'Mathematics', title: 'Multiplication Worksheet', type: 'worksheet' },
    { id: '2', class: '3', subject: 'English', title: 'Grammar Practice', type: 'assignment' },
    { id: '3', class: '5', subject: 'Science', title: 'Solar System Video', type: 'video' },
  ],
  announcements: [
    { id: '1', title: 'School Reopening', content: 'School reopens on April 1st, 2025. All students to report in full uniform.', target: 'all', published_at: '2025-03-25' },
    { id: '2', title: 'Fee Payment Reminder', content: 'Second installment fees due by July 15th. Please pay via UPI or cash at the office.', target: 'parents', published_at: '2025-07-01' },
  ],
  gallery: [
    { id: '1', title: 'Annual Day 2024', category: 'Events', image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80' },
    { id: '2', title: 'Sports Meet', category: 'Sports', image_url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80' },
    { id: '3', title: 'Classroom Activities', category: 'Activities', image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80' },
    { id: '4', title: 'School Campus', category: 'Campus', image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80' },
    { id: '5', title: 'Art Exhibition', category: 'Activities', image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80' },
    { id: '6', title: 'Yoga Day', category: 'Activities', image_url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80' },
  ]
}
