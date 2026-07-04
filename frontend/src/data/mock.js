export const mockUser = {
  id: 'EMP-00429-OX',
  name: 'Sarah Jenkins',
  role: 'Senior Product Designer',
  department: 'Product & Experience',
  manager: 'Alex Chen',
  email: 's.jenkins@enterprise.com',
  phone: '+44 7700 900123',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  joinDate: 'January 12, 2021',
  dob: 'October 14, 1992',
  nationality: 'United Kingdom',
  address: '221B Baker Street, Marylebone, London',
  maritalStatus: 'Single',
  bankName: 'HSBC Private Banking',
  accountNumber: '**** 4821',
  contractType: 'Full-Time',
  probation: 'Completed',
  workHours: '160h',
  leaveBalance: 14,
  tenure: '3.2 Years',
  performance: 'Exceeds',
  type: 'Employee', // or Admin
};

export const mockAnnouncements = [
  {
    id: 1,
    title: 'Annual Team Retreat 2024',
    desc: "Voting is now open for next year's destination. Choose...",
    author: 'HR DEPT',
    time: '2H AGO',
    icon: 'Megaphone',
    color: 'bg-purple-100 text-primary-DEFAULT'
  },
  {
    id: 2,
    title: 'New Health Benefits Package',
    desc: 'Please review the updated healthcare options in the...',
    author: 'ADMIN',
    time: '1D AGO',
    icon: 'HeartPulse',
    color: 'bg-blue-100 text-info'
  },
  {
    id: 3,
    title: 'Security Awareness Training',
    desc: 'A mandatory 15-minute training session has been assigned to...',
    author: 'IT SECURITY',
    time: '2D AGO',
    icon: 'Shield',
    color: 'bg-orange-100 text-warning'
  }
];

export const mockAttendanceLogs = [
  { id: 1, date: 'Oct 27, Fri', checkIn: '08:52 AM', checkOut: '06:45 PM', duration: '09h 53m', status: 'Overtime' },
  { id: 2, date: 'Oct 26, Thu', checkIn: '09:00 AM', checkOut: '06:05 PM', duration: '09h 05m', status: 'On Time' },
  { id: 3, date: 'Oct 25, Wed', checkIn: '09:22 AM', checkOut: '06:10 PM', duration: '08h 48m', status: 'Late' },
  { id: 4, date: 'Oct 24, Tue', checkIn: '08:58 AM', checkOut: '06:02 PM', duration: '09h 04m', status: 'On Time' },
  { id: 5, date: 'Oct 23, Mon', checkIn: '--:--', checkOut: '--:--', duration: '00h 00m', status: 'Paid Leave' },
  { id: 6, date: 'Oct 20, Fri', checkIn: '08:45 AM', checkOut: '07:30 PM', duration: '10h 45m', status: 'Overtime' },
];

export const mockEmployees = [
  { id: 1, name: 'Elena Rodriguez', role: 'Senior Product Designer', dept: 'Design', email: 'elena.r@corp.com', status: 'PRESENT', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024a' },
  { id: 2, name: 'Marcus Thorne', role: 'Lead Engineer', dept: 'Engineering', email: 'm.thorne@corp.com', status: 'ON LEAVE', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024b' },
  { id: 3, name: 'Alex Chen', role: 'HR Coordinator', dept: 'HR', email: 'a.chen@corp.com', status: 'ABSENT', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024c' },
  { id: 4, name: 'Maya Okafor', role: 'Operations Manager', dept: 'Operations', email: 'm.okafor@corp.com', status: 'PRESENT', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
];
