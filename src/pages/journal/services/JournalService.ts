import APIClient from "../../../services/apiClient";
import type { CreateParentPayload, JournalDetailsPayload, Journals } from "../model/JournalModel";

const journalApi = new APIClient<CreateParentPayload>("/journal");
export const journalApiAll = new APIClient<CreateParentPayload>("/journal/all");
export const journalChildApi = new APIClient<CreateParentPayload>("/journal/child");
export const journalFilesApi = new APIClient<null>(
  "/journal/files"
);
export const journalChildrenApi = new APIClient<Journals>("/journal/child");
export const journalGet = new APIClient<Journals>("/journal");
export const journalsParent = new APIClient<Journals>("/journal/all");
export const journalDetails = new APIClient<JournalDetailsPayload>("/journal/details");

export default journalApi;
