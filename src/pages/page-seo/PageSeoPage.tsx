import { useState } from "react";
import { Edit } from "lucide-react";
import { debounce } from "lodash";

import { PAGE_LIMIT } from "../../constants";
import TitleBox from "../../components/layout/TitleBox";
import EnhancedTable from "../../template/EnhancedTable";
import Pagination from "../../utils/Pagination";
import SearchBox from "../users/utils/SearchBox";

import { PageSeoColumns } from "./columns";
import EditPageSeoModal from "./components/EditPageSeoModal";
import useGetPageSeo from "./hooks/useGetPageSeo";
import {
  PAGE_SEO_TYPE_LABELS,
  type PageSeo,
  type PageSeoState,
  type PageSeoType,
} from "./model/PageSeoModel";

const selectClass =
  "px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer";

const PageSeoPage = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<PageSeoType | "">("");
  const [state, setState] = useState<PageSeoState | "">("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [pageToEdit, setPageToEdit] = useState<PageSeo | null>(null);

  const { data, isLoading, isError } = useGetPageSeo({ search, type, state, page, limit });

  const handleSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className="space-y-4">
      <TitleBox
        title="Page SEO"
        subtitle="Edit the meta title, description and sharing image of each website page."
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:items-center">
        <SearchBox placeholder="Search pages..." onSearch={handleSearch} />

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as PageSeoType | "");
            setPage(1);
          }}
          className={selectClass}
        >
          <option value="">All types</option>
          {Object.entries(PAGE_SEO_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value as PageSeoState | "");
            setPage(1);
          }}
          className={selectClass}
        >
          <option value="">Custom and default</option>
          <option value="CUSTOM">Custom</option>
          <option value="DEFAULT">Default</option>
        </select>
      </div>

      <EnhancedTable
        data={data?.data ?? []}
        columns={PageSeoColumns}
        actions={[
          {
            icon: <Edit className="w-4 h-4" />,
            tooltip: "Edit SEO",
            onClick: setPageToEdit,
            color: "text-[#135EAB]",
          },
        ]}
        loading={isLoading}
        emptyMessage={isError ? "Failed to load pages" : "No pages found"}
        total={data?.pagination?.total ?? 0}
      />

      <Pagination
        page={page}
        hasNextPage={data?.pagination?.hasNextPage ?? false}
        totalPages={data?.pagination?.totalPages ?? 1}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={(newLimit: number) => {
          setLimit(newLimit);
          setPage(1);
        }}
        total={data?.pagination?.total ?? 0}
      />

      {pageToEdit && (
        <EditPageSeoModal
          key={pageToEdit.path}
          page={pageToEdit}
          onClose={() => setPageToEdit(null)}
        />
      )}
    </div>
  );
};

export default PageSeoPage;
