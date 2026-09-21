import React, { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

import useCreateVisitor from "../hooks/useCreateVisitor";
import type { Visitor } from "../model/VisitorModel";
import { VISIT_PURPOSES, findVisitPurpose, resolvePurpose } from "../data/visitPurposes";
import PersonToMeetInput from "./PersonToMeetInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (visitor: Visitor) => void;
}

const emptyForm = {
  name: "",
  phone: "",
  numberOfPerson: 1,
  purposeId: "",
  otherPurpose: "",
  personToMeet: "",
  note: "",
};

const AddVisitorModal: React.FC<Props> = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState(emptyForm);

  const selectedPurpose = findVisitPurpose(Number(form.purposeId));

  const createMutation = useCreateVisitor();

  useEffect(() => {
    if (isOpen) setForm(emptyForm);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Visitor = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      numberOfPerson: Number(form.numberOfPerson) || 1,
      // The API stores one free-text purpose, so "Other" submits the words the
      // visitor gave rather than the label "Other".
      purpose: resolvePurpose(Number(form.purposeId), form.otherPurpose),
      personToMeet: form.personToMeet.trim(),
      ...(form.note.trim() ? { note: form.note.trim() } : {}),
    };

    createMutation.mutate(payload, {
      onSuccess: (res) => {
        onClose();
        if (res.data) onCreated(res.data);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Visitor</h2>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Purpose *</label>
            <select
              value={form.purposeId}
              onChange={(e) => setForm((f) => ({ ...f, purposeId: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Purpose</option>
              {VISIT_PURPOSES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {selectedPurpose?.isOther && (
            <div>
              <label className="block text-sm font-medium mb-1">Please specify *</label>
              <input
                type="text"
                value={form.otherPurpose}
                onChange={(e) => setForm((f) => ({ ...f, otherPurpose: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg"
                maxLength={150}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number of Person</label>
            <input
              type="number"
              min={1}
              value={form.numberOfPerson}
              onChange={(e) => setForm((f) => ({ ...f, numberOfPerson: Number(e.target.value) }))}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Person to Meet *</label>
            <PersonToMeetInput
              value={form.personToMeet}
              onChange={(v) => setForm((f) => ({ ...f, personToMeet: v }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              maxLength={1000}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="w-full mt-4 flex justify-center items-center gap-2 px-4 py-2 bg-[#125DAA] hover:bg-[#0f4a8c] text-white rounded-lg disabled:opacity-60"
        >
          {createMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Register Visitor
        </button>
      </form>
    </div>
  );
};

export default AddVisitorModal;
