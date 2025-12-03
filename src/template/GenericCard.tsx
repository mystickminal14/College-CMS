import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface GenericCardProps<T> {
  data: T;
  titleKey: keyof T;
  subtitleKey?: keyof T;
  descriptionKey?: keyof T;
  badgeKey?: keyof T;
  badgeColor?: (value: any) => string;
  color?: string;
  onAction?: (action: string, data: T) => void;
  additionalContent?: (data: T) => React.ReactNode;
}

const GenericCard = <T,>({
  data,
  titleKey,
  subtitleKey,
  descriptionKey,
  badgeKey,
  badgeColor,
  color = '#3B82F6',
  onAction,
  additionalContent
}: GenericCardProps<T>) => {
  const title = data[titleKey] as string;
  const subtitle = subtitleKey ? data[subtitleKey] as string : '';
  const description = descriptionKey ? data[descriptionKey] as string : '';
  const badge = badgeKey ? data[badgeKey] : null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction?.('view', data);
            }}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <FaEye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction?.('edit', data);
            }}
            className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
          >
            <FaEdit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction?.('delete', data);
            }}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
          >
            <FaTrash className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
          {description}
        </p>
      )}

      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            badgeColor ? badgeColor(badge) : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
          }`}>
            {badge.toString()}
          </span>
        </div>
      )}

      {/* Additional Content */}
      {additionalContent && additionalContent(data)}

      {/* Color indicator */}
      <div className="h-1 w-full rounded-full mt-4" style={{ backgroundColor: color }} />
    </div>
  );
};

export default GenericCard;