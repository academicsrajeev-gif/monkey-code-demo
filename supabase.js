import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase = null
export const DEMO_MODE = !supabaseUrl || !supabaseAnonKey

if (!DEMO_MODE) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

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
    { id: '1', title: 'Annual Day 2024', category: 'Events', image_url: 'https://i.postimg.cc/DzYZ4tbB/prod-temp-4ee49e0f-a3df-41ec-b9d4-b2f28e8e23bb-51f62a284a8bb3e2102aa43dabf67cd0.webp' },
    { id: '2', title: 'Sports Meet', category: 'Sports', image_url: 'https://i.postimg.cc/zf3DN0Pg/prod-temp-4ee49e0f-a3df-41ec-b9d4-b2f28e8e23bb-96d4edf976f2ccb8c9119b9de4fbc170.webp' },
    { id: '3', title: 'Classroom Activities', category: 'Activities', image_url: 'https://i.postimg.cc/30R2SGhC/Screenshot-2026-07-30-at-3-47-51-AM.png' },
    { id: '4', title: 'School Garden', category: 'Campus', image_url: 'https://i.postimg.cc/5jN5Nhzx/Screenshot-2026-07-30-at-3-48-10-AM.png' },
    { id: '5', title: 'Art Exhibition', category: 'Activities', image_url: 'https://i.postimg.cc/QVxgx27x/Screenshot-2026-07-30-at-3-48-27-AM.png' },
    { id: '6', title: 'Yoga Day', category: 'Activities', image_url: 'https://i.postimg.cc/dDtRtbCw/Screenshot-2026-07-30-at-3-48-59-AM.png' },
  ]
}
