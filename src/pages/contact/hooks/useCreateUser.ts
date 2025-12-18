import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import type { Contact } from "../model/ContactModel";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import contactApi from "../services/UserService";
import { CONTACT_CACHE_KEY } from "../../../constants";


const useCreateContact = () => {
  const appContext = useContext(AppContext);
  const queryClient=useQueryClient();
  if (!appContext) {
    throw new Error("useCreateContact must be used within AppContext provider");
  }
  const { showToast } = appContext;

  return useMutation<ApiResponse<Contact>, ApiErrorResponse, Contact>({
    mutationFn: (contact) => contactApi.post(contact),

    onSuccess: (res) => {
      showToast(res.message || "Contact added successfully!", "success");
     queryClient.invalidateQueries({ queryKey: [CONTACT_CACHE_KEY] });
       

    },

    onError: (err) => {
        let errorMsg='';
      if (err.errors && err.errors.length > 0) {
       errorMsg=err.errors[0].message; // show first validation error
      } else {
         errorMsg=err.message || "Something went wrong!";
      }
      showToast(errorMsg, "error");
    },
  });
};

export default useCreateContact;
