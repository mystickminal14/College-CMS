import APIClient from "../../../services/apiClient";
import type { Club, ClubMember, ClubName } from "../model/ClubModel";

export const clubApi = new APIClient<Club>("/clubs");
export const clubNameApi = new APIClient<ClubName>("/clubs/name");
export const clubMemberApi = new APIClient<ClubMember>("/club-members");
