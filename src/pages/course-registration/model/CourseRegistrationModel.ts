export interface CourseRegistration {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  courseName: string;
  message?: string | null;
  createdAt: string;
}
