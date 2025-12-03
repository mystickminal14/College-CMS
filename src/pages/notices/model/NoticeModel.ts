export interface NoticeModel {
  id: string;
  title: string;
  description: string;
  category: 'announcement' | 'event' | 'academic' | 'general' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'critical';
  publishedDate: string;
  expiryDate?: string;
  author: string;
  department?: string;
  audience: 'all' | 'students' | 'faculty' | 'staff';
  attachments?: string[];
  isPublished: boolean;
  views: number;
  color?: string;
}