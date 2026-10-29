import { useQuery } from "@tanstack/react-query";
import APIClient from "../../../../services/apiClient";
import type { ApiErrorResponse, ApiResponse } from "../../../../services/apiTypes";
import { PUBLIC_CLUB_CACHE_KEY } from "../../../../constants";
import type { PublicClubDetail, PublicClubMembers } from "../model/club-model";

const publicClubs = new APIClient<PublicClubDetail>("/clubs/public");
const publicClubDetail = new APIClient<PublicClubDetail>("/clubs/public");
const publicClubMembers = new APIClient<PublicClubMembers>("/clubs/public");

export const useGetPublicClubs = () =>
  useQuery<ApiResponse<PublicClubDetail[]>, ApiErrorResponse>({
    queryKey: [PUBLIC_CLUB_CACHE_KEY, "list"],
    queryFn: () => publicClubs.getAll(),
  });

export const useGetPublicClub = (slug?: string) =>
  useQuery<ApiResponse<PublicClubDetail>, ApiErrorResponse>({
    queryKey: [PUBLIC_CLUB_CACHE_KEY, "detail", slug],
    queryFn: () => publicClubDetail.get(encodeURIComponent(slug!)),
    enabled: !!slug,
    retry: false,
  });

export const useGetPublicClubMembers = (slug: string | undefined, page: number, limit: number) =>
  useQuery<ApiResponse<PublicClubMembers>, ApiErrorResponse>({
    queryKey: [PUBLIC_CLUB_CACHE_KEY, "members", slug, page, limit],
    queryFn: () =>
      publicClubMembers.get(`${encodeURIComponent(slug!)}/members?page=${page}&limit=${limit}`),
    enabled: !!slug,
    retry: false,
    placeholderData: (prev) => prev,
  });
