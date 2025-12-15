export interface LayoutModuleConfig<T> {
  name: string;
  description: string;
  columns: LayoutColumnConfig<T>[];
  cardView: React.ReactNode;
  modalComponent?: React.ComponentType<any>;
  defaultView?: 'table' | 'card';
  addButtonText?: string;
}

export interface LayoutColumnConfig<T> {
  label: string;
   accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface LayoutTemplateProps {
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