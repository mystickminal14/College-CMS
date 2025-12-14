export interface CourseModel {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  semester: string;
  instructor: string;
  status: 'active' | 'inactive' | 'upcoming';
  enrolled: number;
  capacity: number;
  color?: string;
}