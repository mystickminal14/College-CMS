import React, { useState, useEffect } from 'react';
import type { CourseModel } from '../model/CourseModel';

// Update the interface to accept 'data' not 'course'
interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<CourseModel>) => void;
  data?: CourseModel;  // Changed from 'course' to 'data'
  isEdit: boolean;
}

const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  data,  // Changed from 'course' to 'data'
  isEdit
}) => {
  const [formData, setFormData] = useState<Partial<CourseModel>>({
    code: '',
    title: '',
    description: '',
    credits: 3,
    semester: 'Fall 2024',
    instructor: '',
    status: 'active',
    enrolled: 0,
    capacity: 50,
    color: '#3B82F6'
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        code: '',
        title: '',
        description: '',
        credits: 3,
        semester: 'Fall 2024',
        instructor: '',
        status: 'active',
        enrolled: 0,
        capacity: 50,
        color: '#3B82F6'
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {isEdit ? 'Edit Course' : 'Add New Course'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Course Code *
              </label>
              <input
                type="text"
                value={formData.code || ''}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  value={formData.credits || 3}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  min="1"
                  max="6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Semester
                </label>
                <select
                  value={formData.semester || 'Fall 2024'}
                  onChange={(e) => setFormData({...formData, semester: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                >
                  <option>Fall 2024</option>
                  <option>Spring 2024</option>
                  <option>Summer 2024</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Instructor *
              </label>
              <input
                type="text"
                value={formData.instructor || ''}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Enrolled
                </label>
                <input
                  type="number"
                  value={formData.enrolled || 0}
                  onChange={(e) => setFormData({...formData, enrolled: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  value={formData.capacity || 50}
                  onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={formData.color || '#3B82F6'}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-10 h-10 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color || '#3B82F6'}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEdit ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;