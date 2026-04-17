import { useState } from "react";
import { Edit, Trash2, Eye, Globe, Calendar } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "./utils/SearchBox";

import { PAGE_LIMIT } from "../../constants";
import type { Blog } from "./model/BlogsModel";
import useGetBlogs from "./hooks/useGetBlog";
import { BlogColumns } from "./utils/columns";
import PublishBlogModal from "./components/PublishBlogModal";
import DeleteBlogModal from "./components/DeleteBlogModel";
import RescheduleModal from "./components/ReScheduleModel";

const BlogsPage = () => {
  const navigate = useNavigate();

  // Pagination & filters
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Modal state
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [blogToPublish, setBlogToPublish] = useState<Blog | null>(null);
  const [blogToReschedule, setBlogToReschedule] = useState<Blog | null>(null);

  const handleSearch = debounce((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useGetBlogs({
    search: debouncedSearch,
    page,
    limit: PAGE_LIMIT,
    status: selectedStatus
      ? (selectedStatus as "DRAFT" | "PUBLISHED" | "SCHEDULED")
      : undefined,
  });

  const blogs = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  const tableActions: {
    icon: React.ReactNode | ((row: Blog) => React.ReactNode);
    tooltip: string | ((row: Blog) => string);
    onClick: (row: Blog) => void;
    color?: string;
    condition?: (row: Blog) => boolean;
  }[] = [
      // Edit blog content
      {
        icon: <Edit className="w-4 h-4" />,
        tooltip: "Edit Blog",
        onClick: (row: Blog) => navigate(`/app/media/blogs/edit/${row.id}`),
        color: "text-[#135EAB]",
      },
      // Preview (public view)
      {
        icon: <Eye className="w-4 h-4" />,
        tooltip: "Preview Blog",
        onClick: (row: Blog) => navigate(`/blogs/${row.slug}`),
        color: "text-blue-500",
      },
      {
        icon: <Globe className="w-4 h-4" />,
        tooltip: "Publish Now",
        onClick: (row: Blog) => setBlogToPublish(row),
        color: "text-green-600",
        condition: (row: Blog) => row.status !== "PUBLISHED",
      },
      // Reschedule — for DRAFT or SCHEDULED (not PUBLISHED)
      {
        icon: <Calendar className="w-4 h-4" />,
        tooltip: (row: Blog) =>
          row.status === "SCHEDULED" ? "Reschedule" : "Schedule",
        onClick: (row: Blog) => setBlogToReschedule(row),
        color: "text-indigo-500",
        condition: (row: Blog) => row.status !== "PUBLISHED",
      },
      // Delete
      {
        icon: <Trash2 className="w-4 h-4" />,
        tooltip: "Delete Blog",
        onClick: (row: Blog) => setBlogToDelete(row),
        color: "text-red-600",
      },
    ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox title="Blog Management" subtitle="Manage your Blogs" />

      {/* Filters & actions bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between my-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
          <SearchBox placeholder="Search Blog..." onSearch={handleSearch} />

          <select
            className="w-full md:w-auto px-4 py-3 pr-10 text-gray-900 dark:text-gray-100 text-sm
              bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700
              rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              hover:border-gray-400 cursor-pointer appearance-none transition duration-150"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>

          <button
            onClick={() => navigate("/app/media/blogs/add")}
            className="px-4 py-2 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c]
              flex items-center space-x-1 shadow hover:shadow-md transition-all duration-200 font-medium"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Blog</span>
          </button>
        </div>
      </div>

      <EnhancedTable
        data={blogs}
        columns={BlogColumns}
        actions={tableActions}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load blogs" : "No blogs found"}
      />

      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Modals */}
      {blogToDelete && (
        <DeleteBlogModal blog={blogToDelete} onClose={() => setBlogToDelete(null)} />
      )}
      {blogToPublish && (
        <PublishBlogModal blog={blogToPublish} onClose={() => setBlogToPublish(null)} />
      )}
      {blogToReschedule && (
        <RescheduleModal blog={blogToReschedule} onClose={() => setBlogToReschedule(null)} />
      )}
    </div>
  );
};

export default BlogsPage;