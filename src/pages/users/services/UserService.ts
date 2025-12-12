import APIClient from "../../../services/apiClient";
import type { User } from "../model/UserModel";

const userApi = new APIClient<User>("/users");

export default userApi;
