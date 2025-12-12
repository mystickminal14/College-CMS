// import { useEffect } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { PROFILE_CACHE_KEY } from "../../constants";
// import { ProfileEndpoint } from "../services/ProfileService";
// import type { ProfileModel } from "../model/ProfileModel";
// import { useNavigate } from "react-router-dom";

// export const useGetProfile = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const query = useQuery<ProfileModel, Error>({
//     queryKey: [PROFILE_CACHE_KEY],
//     queryFn: async () => {
//       try {
//         const res = await ProfileEndpoint.get();
//         return res;
//       } catch (err: any) {
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("stu_wifi_access");
//           queryClient.clear(); // Clears all cached data and errors
//           navigate("/", { replace: true });
//         }
//         throw err;
//       }
//     },
//     retry: false,
//   });

//   useEffect(() => {
//     if (query.data?.stu_wifi_access) {
//       localStorage.setItem("stu_wifi_access", query.data.stu_wifi_access);
//     }
//   }, [query.data]);

//   return query;
// };
