import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import APIClient from "../../../services/apiClient";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { DOWNLOAD_CACHE_KEY } from "../../../constants"; // ✅ fixed
import type { Downloads } from "../model/handbookModel";
interface EditFilePayload {
  name: string;
  file?: File;
  link?: string;  id: number;

}
const useEditDownload = () => {
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  if (!appContext) throw new Error("useEditDownload must be used inside AppContext");

  const { showToast } = appContext;

  return useMutation<ApiResponse<Downloads>,
    ApiErrorResponse,
   EditFilePayload
  >({
    mutationFn: (payload) => {
      const { id, file, ...rest } = payload;

      const apiClient = new APIClient<Downloads>(`/downloads/${encodeURIComponent(id?.toString() || "")}`);

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        if (rest.name) formData.append("name", rest.name);
        if (rest.link) formData.append("link", rest.link);
        return apiClient.putFile(formData);
      }

      return apiClient.put(rest);
    },
    onSuccess: (res) => {
      showToast(res.message || "Download updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [DOWNLOAD_CACHE_KEY] }); // ✅ fixed
    },
    onError: (err) => {
      const msg = err.errors?.[0]?.message || err.message || "Something went wrong!";
      showToast(msg, "error");
    },
  });
};

export default useEditDownload;