import { useState } from 'react';
import EnhancedTable from '../../template/EnhancedTable';
import CoursesCardView from './components/CourseCard';
import CourseModal from './components/CourseModal';
import type { CourseModel } from './model/CourseModel';
import { mockCourses } from './MockCourses';
import LayoutTemplate from '../../template/ModuleTemplete';

const CoursesPage = () => {
  const [courses, setCourses] = useState<CourseModel[]>(mockCourses);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseModel | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Your custom handlers
  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditCourse = (course: CourseModel) => {
    setSelectedCourse(course);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleSaveCourse = (courseData: Partial<CourseModel>) => {
    if (isEditMode && selectedCourse) {
      setCourses(
        courses.map(c =>
          c.id === selectedCourse.id ? { ...c, ...courseData } : c
        )
      );
    } else {
      const newCourse: CourseModel = {
        id: Date.now().toString(),
        ...courseData,
      } as CourseModel;
      setCourses([...courses, newCourse]);
    }
    setShowModal(false);
  };

  const courseColumns = [
    { label: 'Code', accessor: 'code' as keyof CourseModel },
    {
      label: 'Title',
      accessor: 'title' as keyof CourseModel,
      render: (row: CourseModel) => (
        <div>
          <div className="font-semibold">{row.title}</div>
          <p className="text-sm text-slate-500 dark:text-slate-300 truncate max-w-xs">
            {row.description}
          </p>
        </div>
      )
    },
    { label: 'Instructor', accessor: 'instructor' as keyof CourseModel },
    { label: 'Semester', accessor: 'semester' as keyof CourseModel },
    {
      label: 'Credits',
      accessor: 'credits' as keyof CourseModel,
      render: (row: CourseModel) => (
        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
          {row.credits} credits
        </span>
      )
    },
    {
      label: 'Status',
      accessor: 'status' as keyof CourseModel,
      render: (row: CourseModel) => {
        const colors = {
          active: 'bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300',
          inactive: 'bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-300',
          upcoming: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[row.status]}`}>
            {row.status}
          </span>
        );
      }
    }
  ];

  const tableActions = [
    {
      icon: <span>📝</span>,
      tooltip: 'Edit Course',
      onClick: (row: CourseModel) => handleEditCourse(row),
      color: "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
    },
    {
      icon: <span>🗑️</span>,
      tooltip: 'Delete Course',
      onClick: (row: CourseModel) => handleDeleteCourse(row.id),
      color: "text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
    }
  ];

  return (
    <LayoutTemplate
      title="Course Management"
      description="Manage and view all courses"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onAddClick={handleAddCourse}
      addButtonText="Add Course"
      
      // Table Content
      tableContent={
        <EnhancedTable
          data={courses}
          columns={courseColumns}
          actions={tableActions}
          onRowClick={(course) => console.log('View course:', course)}
        />
      }
      
      // Card Content
      cardContent={
        <CoursesCardView
          courses={courses}
          onAddNew={handleAddCourse}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          onView={(course) => console.log('View course:', course)}
        />
      }
      
      // Modal Content
      modalContent={
        <CourseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCourse}
          data={selectedCourse || undefined}
          isEdit={isEditMode}
        />
      }
      
    
    
    />
  );
};

export default CoursesPage;