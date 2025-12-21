import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext } from "../../../context/ContextApp";
import { plannerFilesApi } from "../services/PlannerService";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import {
  FEE_PLANNEER_CACHE_KEY,
  FEE_PLANNEER_CHILD_CACHE_KEY,
} from "../../../constants";
import type { BulkChildPayload } from "../model/PlannerModel";

const useUpdateMultipleChildren = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiErrorResponse, BulkChildPayload>({
    mutationFn: async ({ parentId, records, files }) => {
      if (records.length !== files.length) {
        throw {
          message: "Each record must have exactly one file",
        } as ApiErrorResponse;
      }

      const formData = new FormData();
      formData.append("parentId", String(parentId));
      formData.append("records", JSON.stringify(records));

      files.forEach((file) => {
        formData.append("files", file);
      });

      // Use PUT since backend expects PUT for bulk update
      return plannerFilesApi.putFile(formData);
    },

    onSuccess: (res) => {
      showToast(res.message || "Files updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: [FEE_PLANNEER_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [FEE_PLANNEER_CHILD_CACHE_KEY] });
    },

    onError: (err) => {
      const msg =
        err.errors?.[0]?.message ||
        err.message ||
        "Failed to update files";
      showToast(msg, "error");
    },
  });
};

export default useUpdateMultipleChildren;
