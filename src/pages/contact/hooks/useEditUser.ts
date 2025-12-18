import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import type { Contact } from "../model/ContactModel";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CONTACT_CACHE_KEY } from "../../../constants";
import { AppContext } from "../../../context/ContextApp";

const useEditContact = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useEditContact must be used inside AppContext");
  const { showToast } = appContext;

 return useMutation<ApiResponse<Contact>, ApiErrorResponse, Partial<Contact>>({
  mutationFn: (payload: Partial<Contact>) => {
    if (!payload.id) throw new Error("Contact ID is required");

    const { id, ...updateData } = payload;
    const apiClient = new APIClient<Partial<Contact>>(`/contact/${encodeURIComponent(id)}`);

    return apiClient.put(updateData); 
  },
  onSuccess: (res) => {
    showToast(res.message || "Contact updated successfully!", "success");
    queryClient.invalidateQueries({ queryKey: [CONTACT_CACHE_KEY] });
  },
  onError: (err) => {
    const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
    showToast(msg, "error");
  },
});

};

export default useEditContact;
