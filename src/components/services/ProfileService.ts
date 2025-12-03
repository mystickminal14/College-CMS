import APIClient from "../../services/apiClient";
import type { ProfileModel } from "../model/ProfileModel";

export const ProfileEndpoint=new APIClient<ProfileModel>('/profile')
