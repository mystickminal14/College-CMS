import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CLUB_CACHE_KEY, CLUB_MEMBER_CACHE_KEY, CLUB_NAME_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import { compressImage } from "../../../utils/ImageCompression";
import type { Club, ClubName, Status } from "../model/ClubModel";
import { clubApi, clubNameApi } from "../services/ClubService";

export const errorMessage = (err: ApiErrorResponse) =>
  err.errors?.[0]?.message || err.message || "Something went wrong!";

export const useGetClubs = ({ search = "", page = 1, limit = 10 }) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.append("search", search);

  return useQuery<ApiResponse<Club[]>, ApiErrorResponse>({
    queryKey: [CLUB_CACHE_KEY, search, page, limit],
    queryFn: () => clubApi.getAll(`?${params.toString()}`),
  });
};

export const useGetClubNames = ({ refetchOnMount }: { refetchOnMount?: "always" } = {}) =>
  useQuery<ApiResponse<ClubName[]>, ApiErrorResponse>({
    queryKey: [CLUB_NAME_CACHE_KEY],
    queryFn: () => clubNameApi.getAll(),
    refetchOnMount,
  });

export const useSaveClub = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Club>, ApiErrorResponse, { club: Club; image: File | null }>({
    mutationFn: async ({ club, image }) => {
      const fd = new FormData();
      fd.append("name", club.name);
      fd.append("mission", club.mission ?? "");
      fd.append("vision", club.vision ?? "");
      fd.append("joinFormUrl", club.joinFormUrl ?? "");
      if (club.order !== undefined) fd.append("order", String(club.order));
      if (image) fd.append("image", await compressImage(image));

      return club.id ? clubApi.putFile(fd, club.id) : clubApi.postFile(fd);
    },
    onSuccess: (res) => {
      showToast(res.message || "Club saved successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLUB_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLUB_NAME_CACHE_KEY] });
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};

export const useUploadClubImage = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Club>, ApiErrorResponse, { id: number; image: File }>({
    mutationFn: async ({ id, image }) => {
      const fd = new FormData();
      fd.append("image", await compressImage(image));
      return clubApi.putFile(fd, `image/${id}`);
    },
    onSuccess: (res) => {
      showToast(res.message || "Image updated successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLUB_CACHE_KEY] });
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};

export const useDeleteClub = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Club>, ApiErrorResponse, number>({
    mutationFn: (id) => clubApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Club deleted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [CLUB_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLUB_NAME_CACHE_KEY] });
      queryClient.invalidateQueries({ queryKey: [CLUB_MEMBER_CACHE_KEY] });
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};

export const useToggleClubStatus = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Club>, ApiErrorResponse, { id: number; status: Status }>({
    mutationFn: ({ id, status }) =>
      new APIClient<Club>(`/clubs/toggle/status/${id}`).put({ status }),
    onSuccess: (res) => {
      showToast(res.message || "Status updated!", "success");
      queryClient.invalidateQueries({ queryKey: [CLUB_CACHE_KEY] });
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};
