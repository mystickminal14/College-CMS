import React, { useState, useEffect } from 'react';
import type { NoticeModel } from './model/NoticeModel';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<NoticeModel>) => void;
  data?: NoticeModel;
  isEdit: boolean;
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  data,
  isEdit
}) => {
  const [formData, setFormData] = useState<Partial<NoticeModel>>({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium',
    publishedDate: new Date().toISOString().split('T')[0],
    author: '',
    department: '',
    audience: 'all',
    isPublished: true,
    views: 0,
    color: '#3B82F6'
  });

  const [attachments, setAttachments] = useState<string[]>([]);
  const [newAttachment, setNewAttachment] = useState('');

  useEffect(() => {
    if (data) {
      setFormData(data);
      setAttachments(data.attachments || []);
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'general',
        priority: 'medium',
        publishedDate: new Date().toISOString().split('T')[0],
        author: '',
        department: '',
        audience: 'all',
        isPublished: true,
        views: 0,
        color: '#3B82F6'
      });
      setAttachments([]);
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      attachments: attachments.length > 0 ? attachments : undefined
    });
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setAttachments([...attachments, newAttachment.trim()]);
      setNewAttachment('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isEdit ? 'Edit Notice' : 'Create New Notice'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                    required
                    placeholder="Enter notice title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || 'general'}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="event">Event</option>
                    <option value="academic">Academic</option>
                    <option value="general">General</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority || 'medium'}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                    required
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                    placeholder="Optional department"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishedDate || ''}
                    onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate || ''}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Audience
                  </label>
                  <select
                    value={formData.audience || 'all'}
                    onChange={(e) => setFormData({...formData, audience: e.target.value as any})}
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  >
                    <option value="all">All</option>
                    <option value="students">Students</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={formData.isPublished === true}
                        onChange={() => setFormData({...formData, isPublished: true})}
                        className="mr-2"
                      />
                      <span className="text-sm">Published</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={formData.isPublished === false}
                        onChange={() => setFormData({...formData, isPublished: false})}
                        className="mr-2"
                      />
                      <span className="text-sm">Draft</span>
                    </label>
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
                      className="w-10 h-10 cursor-pointer rounded"
                    />
                    <input
                      type="text"
                      value={formData.color || '#3B82F6'}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                rows={4}
                required
                placeholder="Enter notice description"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Attachments
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newAttachment}
                  onChange={(e) => setNewAttachment(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700"
                  placeholder="Enter file name or URL"
                />
                <button
                  type="button"
                  onClick={handleAddAttachment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Add
                </button>
              </div>
              
              {attachments.length > 0 && (
                <div className="space-y-2 mt-2">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-2 rounded">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{attachment}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
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
                {isEdit ? 'Update Notice' : 'Create Notice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;