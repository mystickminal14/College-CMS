import React, { useState } from "react";
import { X, Loader2, Check, Plus } from "lucide-react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { FAQ } from "../model/FAQmodel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mutation: UseMutationResult<
    ApiResponse<FAQ>,
    ApiErrorResponse,
    { questions: string; answers: string }
  >;
}

const AddFaqModal: React.FC<Props> = ({ isOpen, onClose, mutation }) => {
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setQuestions("");
    setAnswers("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questions.trim() || !answers.trim()) return;
    mutation.mutate(
      { questions: questions.trim(), answers: answers.trim() },
      {
        onSuccess: () => {
          setQuestions("");
          setAnswers("");
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-blue-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Add FAQ</h2>
                <p className="text-white/80 text-sm mt-1">Create a new question & answer</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              disabled={mutation.isPending}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Question <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="e.g. What is your return policy?"
                disabled={mutation.isPending}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Answer <span className="text-red-500">*</span>
              </label>
              <textarea
                value={answers}
                onChange={(e) => setAnswers(e.target.value)}
                placeholder="Type the answer here..."
                rows={4}
                disabled={mutation.isPending}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none disabled:opacity-50"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex space-x-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                disabled={mutation.isPending}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending || !questions.trim() || !answers.trim()}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Add FAQ
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaqModal;