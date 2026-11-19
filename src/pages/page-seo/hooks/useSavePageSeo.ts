import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../../../context/ContextApp";
import { PAGE_SEO_CACHE_KEY } from "../../../constants";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import type { PageSeo } from "../model/PageSeoModel";
import PageSeoApi from "../services/PageSeoApi";

const useSavePageSeo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(AppContext)!;

  return useMutation<ApiResponse<PageSeo>, ApiErrorResponse, FormData>({
    // postImage sends a multipart PUT to the endpoint.
    mutationFn: (formData) => PageSeoApi.postImage(formData),
    onSuccess: (res) => {
      showToast(res.message || "Page SEO saved", "success");
      queryClient.invalidateQueries({ queryKey: [PAGE_SEO_CACHE_KEY] });
    },
    onError: (err) => {
      showToast(err.errors?.[0]?.message || err.message || "Something went wrong!", "error");
    },
  });
};

export default useSavePageSeo;
