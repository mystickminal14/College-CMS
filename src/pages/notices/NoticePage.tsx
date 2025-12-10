import { useState } from 'react';
import EnhancedTable from '../../template/EnhancedTable';
import type { NoticeModel } from './model/NoticeModel';
import LayoutTemplate from '../../template/ModuleTemplete';
import NoticeCardView from './NoticeCardView';
import NoticeModal from './NoticeModal';
import { mockNotices } from './NoticeData';

const NoticesPage = () => {
    const [notices, setNotices] = useState<NoticeModel[]>(mockNotices);
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState<NoticeModel | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Custom handlers
    const handleAddNotice = () => {
        setSelectedNotice(null);
        setIsEditMode(false);
        setShowModal(true);
    };

    const handleEditNotice = (notice: NoticeModel) => {
        setSelectedNotice(notice);
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleDeleteNotice = (id: string) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
            setNotices(notices.filter(notice => notice.id !== id));
        }
    };

    const handleSaveNotice = (noticeData: Partial<NoticeModel>) => {
        if (isEditMode && selectedNotice) {
            setNotices(
                notices.map(n =>
                    n.id === selectedNotice.id ? { ...n, ...noticeData } : n
                )
            );
        } else {
            const newNotice: NoticeModel = {
                id: Date.now().toString(),
                ...noticeData,
            } as NoticeModel;
            setNotices([...notices, newNotice]);
        }
        setShowModal(false);
    };

    const handleViewNotice = (notice: NoticeModel) => {
        console.log('Viewing notice:', notice);
    };

    const noticeColumns = [
        { label: 'Title', accessor: 'title' as keyof NoticeModel },
        {
            label: 'Description',
            accessor: 'description' as keyof NoticeModel,
            render: (row: NoticeModel) => (
                <div className="max-w-xs">
                    <p className="text-sm text-slate-500 dark:text-slate-300 truncate">
                        {row.description}
                    </p>
                </div>
            )
        },
        {
            label: 'Category',
            accessor: 'category' as keyof NoticeModel,
            render: (row: NoticeModel) => {
                const colors = {
                    announcement: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
                    event: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
                    academic: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
                    urgent: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
                    general: 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300'
                };
                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[row.category]}`}>
                        {row.category}
                    </span>
                );
            }
        },
        {
            label: 'Priority',
            accessor: 'priority' as keyof NoticeModel,
            render: (row: NoticeModel) => {
                const colors = {
                    critical: 'bg-red-500 text-white',
                    high: 'bg-orange-500 text-white',
                    medium: 'bg-yellow-500 text-white',
                    low: 'bg-blue-500 text-white'
                };
                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[row.priority]}`}>
                        {row.priority}
                    </span>
                );
            }
        },
        {
            label: 'Date',
            accessor: 'publishedDate' as keyof NoticeModel,
            render: (row: NoticeModel) => (
                <div>
                    <div className="font-medium">{new Date(row.publishedDate).toLocaleDateString()}</div>
                    {row.expiryDate && (
                        <div className="text-xs text-slate-500">Exp: {new Date(row.expiryDate).toLocaleDateString()}</div>
                    )}
                </div>
            )
        },
        { label: 'Author', accessor: 'author' as keyof NoticeModel },
        {
            label: 'Status',
            accessor: 'isPublished' as keyof NoticeModel,
            render: (row: NoticeModel) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.isPublished
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300'
                    }`}>
                    {row.isPublished ? 'Published' : 'Draft'}
                </span>
            )
        },
        {
            label: 'Views',
            accessor: 'views' as keyof NoticeModel,
            render: (row: NoticeModel) => (
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{row.views}</span>
                </div>
            )
        }
    ];

    const tableActions = [
        {
            icon: <span>📝</span>,
            tooltip: 'Edit Notice',
            onClick: (row: NoticeModel) => handleEditNotice(row),
            color: "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30"
        },
        {
            icon: <span>🗑️</span>,
            tooltip: 'Delete Notice',
            onClick: (row: NoticeModel) => handleDeleteNotice(row.id),
            color: "text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
        }
    ];


    return (
        <LayoutTemplate
            title="Notice Management"
            description="Manage and publish notices, announcements, and alerts"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onAddClick={handleAddNotice}
            addButtonText="Create Notice"

            // Table Content
            tableContent={
                <EnhancedTable
                    data={notices}
                    columns={noticeColumns}
                    actions={tableActions}
                    onRowClick={handleViewNotice}
                    emptyMessage="No notices found. Create your first notice!"
                />
            }

            // Card Content
            cardContent={
                <NoticeCardView
                    data={notices}
                    onAddNew={handleAddNotice}
                    onEdit={handleEditNotice}
                    onDelete={handleDeleteNotice}
                    onView={handleViewNotice}
                />
            }

            // Modal Content
            modalContent={
                <NoticeModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveNotice}
                    data={selectedNotice || undefined}
                    isEdit={isEditMode}
                />
            }



        />
    );
};

export default NoticesPage;