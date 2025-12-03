import React from 'react';
import { FaPlus, FaEye, FaPaperclip, FaCalendarAlt, FaUser } from 'react-icons/fa';
import type { NoticeModel } from './model/NoticeModel';

interface NoticeCardViewProps {
  data: NoticeModel[];
  onAddNew: () => void;
  onEdit: (notice: NoticeModel) => void;
  onDelete: (id: string) => void;
  onView?: (notice: NoticeModel) => void;
}

const NoticeCardView: React.FC<NoticeCardViewProps> = ({
  data,
  onAddNew,
  onEdit,
  onDelete,
  onView
}) => {
  const getPriorityColor = (priority: NoticeModel['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: NoticeModel['category']) => {
    switch (category) {
      case 'announcement': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
      case 'event': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case 'academic': return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
      case 'urgent': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((notice) => (
        <div
          key={notice.id}
          className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onView?.(notice)}
        >
          {/* Priority indicator */}
          <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${getPriorityColor(notice.priority)}`} />
          
          <div className="ml-5">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                  {notice.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                    {notice.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    notice.isPublished 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300'
                  }`}>
                    {notice.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onEdit(notice)}
                  className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                >
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(notice.id)}
                  className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                >
                  <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
              {notice.description}
            </p>

            {/* Meta Information */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FaCalendarAlt className="w-3 h-3" />
                <span>Published: {new Date(notice.publishedDate).toLocaleDateString()}</span>
                {notice.expiryDate && (
                  <>
                    <span>•</span>
                    <span>Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FaUser className="w-3 h-3" />
                <span>{notice.author}</span>
                {notice.department && (
                  <>
                    <span>•</span>
                    <span>{notice.department}</span>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaEye className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400">{notice.views} views</span>
                </div>
                
                {notice.attachments && notice.attachments.length > 0 && (
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <FaPaperclip className="w-3 h-3" />
                    <span>{notice.attachments.length} file(s)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Audience */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Audience: <span className="font-semibold capitalize">{notice.audience}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Add New Notice Card */}
      <div
        onClick={onAddNew}
        className="cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 transition min-h-[300px] group"
      >
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 group-hover:bg-blue-700 transition">
          <FaPlus className="text-2xl" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 font-semibold text-center text-lg">
          Add New Notice
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
          Create and publish new notices
        </p>
      </div>
    </div>
  );
};

export default NoticeCardView;