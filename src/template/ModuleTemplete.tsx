import React from 'react';
import { FaTable, FaThLarge, FaPlus } from 'react-icons/fa';
import TitleBox from '../components/layout/TitleBox';

interface LayoutTemplateProps {
  title: string;
  description: string;
  viewMode?: 'table' | 'card';
  onViewModeChange?: (mode: 'table' | 'card') => void;
  onAddClick?: () => void;
  tableContent?: React.ReactNode;
  cardContent?: React.ReactNode;
  modalContent?: React.ReactNode;
  toolbarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  addButtonText?: string;
  showViewToggle?: boolean;
  showAddButton?: boolean;
}

const LayoutTemplate: React.FC<LayoutTemplateProps> = ({
  title,
  description,
  viewMode = 'table',
  onViewModeChange,
  onAddClick,
  tableContent,
  cardContent,
  modalContent,
  toolbarContent,
  headerContent,
  footerContent,
  addButtonText = 'Add New',
  showViewToggle = true,
  showAddButton = true
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TitleBox
        title={title}
        subtitle={description}
      />

      {headerContent}

      {/* Toolbar */}
      <div className="flex justify-between items-center pt-4 px-4 mb-6">
        <div className="flex items-center space-x-4">
          {showViewToggle && (
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => onViewModeChange?.('table')}
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FaTable className="w-4 h-4" />
                <span>Table</span>
              </button>
              <button
                onClick={() => onViewModeChange?.('card')}
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 transition-colors ${
                  viewMode === 'card'
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FaThLarge className="w-4 h-4" />
                <span>Cards</span>
              </button>
            </div>
          )}
          
          {toolbarContent}
        </div>

        {showAddButton && onAddClick && (
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>{addButtonText}</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-4">
        {viewMode === 'table' && tableContent}
        {viewMode === 'card' && cardContent}
      </div>

      {/* Modal */}
      {modalContent}

      {footerContent}
    </div>
  );
};

export default LayoutTemplate;