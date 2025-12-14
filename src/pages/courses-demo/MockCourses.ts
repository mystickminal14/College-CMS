// mockCourses.ts

import type { CourseModel } from "./model/CourseModel";

export const mockCourses: CourseModel[] = [
  {
    id: "1",
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of computer science and programming",
    credits: 3,
    semester: "Fall 2024",
    instructor: "Dr. Smith",
    status: "active",
    enrolled: 45,
    capacity: 50,
    color: "#3B82F6"
  },
  {
    id: "2",
    code: "MATH201",
    title: "Calculus II",
    description: "Advanced calculus topics including integration techniques",
    credits: 4,
    semester: "Fall 2024",
    instructor: "Prof. Johnson",
    status: "active",
    enrolled: 38,
    capacity: 40,
    color: "#10B981"
  },
  {
    id: "3",
    code: "PHY301",
    title: "Modern Physics",
    description: "Quantum mechanics and relativity",
    credits: 3,
    semester: "Spring 2024",
    instructor: "Dr. Williams",
    status: "active",
    enrolled: 28,
    capacity: 30,
    color: "#8B5CF6"
  },
  {
    id: "4",
    code: "ENG401",
    title: "Advanced English Literature",
    description: "Study of 20th century literature",
    credits: 3,
    semester: "Spring 2024",
    instructor: "Prof. Brown",
    status: "upcoming",
    enrolled: 0,
    capacity: 35,
    color: "#F59E0B"
  },
  {
    id: "5",
    code: "BIO202",
    title: "Molecular Biology",
    description: "Advanced study of cellular processes",
    credits: 4,
    semester: "Fall 2024",
    instructor: "Dr. Davis",
    status: "inactive",
    enrolled: 25,
    capacity: 30,
    color: "#EF4444"
  }
];