import { useState } from "react";
import TitleBox from "../../components/layout/TitleBox";
import { PAGE_LIMIT } from "../../constants";
import Pagination from "../../utils/Pagination";
import { useAddFaq, useGetFaqs, useUpdateFaq } from "./hooks/FAqHooks";
import type { FAQ } from "./model/FAQmodel";
import FaqAccordionView from "./components/Faqaccordionview";
import ChangeFaqOrderModal from "./components/ChangeFAqMOdel";
import ToggleFaqStatusModal from "./components/ToggleFaqModel";
import UpdateFaqModal from "./components/UpdateFAqModel";
import DeleteFaqModal from "./components/DeleteFAqModel";
import AddFaqModal from "./components/AddFAqModel";

const FaqPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_LIMIT);

  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const { data, isLoading, isError } = useGetFaqs({ page, limit });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const faqs = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const hasNextPage = data?.pagination?.hasNextPage ?? false;
  const total = data?.pagination?.total ?? 0;

  const enabledCount = faqs.filter((f) => f.status === "ENABLED").length;

  const addMutation = useAddFaq();
  const updateMutation = useUpdateFaq();

  const handleEdit = (faq: FAQ) => {
    setSelectedFaq(faq);
    setShowUpdateModal(true);
  };

  const handleToggle = (faq: FAQ) => {
    setSelectedFaq(faq);
    setShowToggleModal(true);
  };

  const handleDelete = (faq: FAQ) => {
    setSelectedFaq(faq);
    setShowDeleteModal(true);
  };

  const handleChangeOrder = (faq: FAQ) => {
    setSelectedFaq(faq);
    setShowOrderModal(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-0 md:p-2">
      <TitleBox
        title="FAQ"
        subtitle="Manage frequently asked questions"
      />

      {/* ── Toolbar ── */}
      <div className="flex justify-between items-center my-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
            {enabledCount} Enabled
          </span>
          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
            {total} Total
          </span>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          disabled={addMutation.isPending}
          className="px-6 py-3 bg-[#1a7cd3] text-white rounded-lg hover:bg-[#0f4a8c] shadow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Add FAQ</span>
        </button>
      </div>

      {/* ── Accordion ── */}
      <FaqAccordionView
        faqs={faqs}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onChangeOrder={handleChangeOrder}
      />

      <Pagination
        hasNextPage={hasNextPage}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        total={total}
      />

      {/* ── Modals ── */}
      <AddFaqModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mutation={addMutation}
      />

      <UpdateFaqModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        faq={selectedFaq}
        mutation={updateMutation}
      />

      <ToggleFaqStatusModal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        faq={selectedFaq}
      />

      <ChangeFaqOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        faq={selectedFaq}
        totalFaqs={total}
      />

      <DeleteFaqModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        faq={selectedFaq}
      />
    </div>
  );
};

export default FaqPage;