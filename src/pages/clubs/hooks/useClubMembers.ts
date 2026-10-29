import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../../../context/ContextApp";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { CLUB_CACHE_KEY, CLUB_MEMBER_CACHE_KEY } from "../../../constants";
import APIClient from "../../../services/apiClient";
import { compressImage } from "../../../utils/ImageCompression";
import type { ClubMember, Status } from "../model/ClubModel";
import { clubMemberApi } from "../services/ClubService";
import { errorMessage } from "./useClubs";

export const useGetClubMembers = ({
  search = "",
  clubId,
  page = 1,
  limit = 10,
}: {
  search?: string;
  clubId?: number;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.append("search", search);
  if (clubId) params.append("clubId", String(clubId));

  return useQuery<ApiResponse<ClubMember[]>, ApiErrorResponse>({
    queryKey: [CLUB_MEMBER_CACHE_KEY, search, clubId, page, limit],
    queryFn: () => clubMemberApi.getAll(`?${params.toString()}`),
  });
};

const invalidate = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: [CLUB_MEMBER_CACHE_KEY] });
  // The clubs table shows a member count.
  queryClient.invalidateQueries({ queryKey: [CLUB_CACHE_KEY] });
};

export const useSaveClubMember = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  // Basic details only: the photo is uploaded afterwards with useUploadMemberPhoto.
  return useMutation<ApiResponse<ClubMember>, ApiErrorResponse, { member: ClubMember }>({
    mutationFn: async ({ member }) => {
      const fd = new FormData();
      fd.append("clubId", String(member.clubId));
      fd.append("name", member.name);
      fd.append("designation", member.designation);
      fd.append("isPresident", String(!!member.isPresident));
      fd.append("semester", member.semester ? String(member.semester) : "");
      fd.append("pastExperiences", member.pastExperiences ?? "");
      fd.append("linkedIn", member.linkedIn ?? "");
      if (member.order !== undefined) fd.append("order", String(member.order));

      return member.id ? clubMemberApi.putFile(fd, member.id) : clubMemberApi.postFile(fd);
    },
    onSuccess: (res) => {
      showToast(res.message || "Member saved successfully!", "success");
      invalidate(queryClient);
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};

export const useUploadMemberPhoto = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClubMember>, ApiErrorResponse, { id: number; image: File }>({
    mutationFn: async ({ id, image }) => {
      const fd = new FormData();
      fd.append("image", await compressImage(image));
      return clubMemberApi.putFile(fd, `image/${id}`);
    },
    onSuccess: (res) => {
      showToast(res.message || "Photo uploaded successfully!", "success");
      invalidate(queryClient);
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};

export const useDeleteClubMember = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClubMember>, ApiErrorResponse, number>({
    mutationFn: (id) => clubMemberApi.delete(id),
    onSuccess: (res) => {
      showToast(res.message || "Member deleted successfully!", "success");
      invalidate(queryClient);
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};

export const useToggleMemberStatus = () => {
  const { showToast } = useContext(AppContext)!;
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClubMember>, ApiErrorResponse, { id: number; status: Status }>({
    mutationFn: ({ id, status }) =>
      new APIClient<ClubMember>(`/club-members/toggle/status/${id}`).put({ status }),
    onSuccess: (res) => {
      showToast(res.message || "Status updated!", "success");
      invalidate(queryClient);
    },
    onError: (err) => showToast(errorMessage(err), "error"),
  });
};
