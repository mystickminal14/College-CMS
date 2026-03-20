import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiResponse } from "../../../services/apiTypes";
import { HERO_SECTION_CACHE_KEY } from "../../../constants";
import HeroSectionApi from "../services/HeroSectionFIles";
import type { HeroSectionImage } from "../model/HeroModel";

interface HeroQueryProps {
  page?: number;
  limit?: number;
}

const useGetHeroImages = ({ page = 1, limit = 10 }: HeroQueryProps) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));

  return useQuery<ApiResponse<HeroSectionImage[]>, ApiErrorResponse>({
    queryKey: [HERO_SECTION_CACHE_KEY, page, limit],
    queryFn: () => HeroSectionApi.getAll(`?${params.toString()}`),
  });
};

export default useGetHeroImages;