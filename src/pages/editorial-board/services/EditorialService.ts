import APIClient from "../../../services/apiClient";
import type { EditorialByHonorary, EditorialMember } from "../model/EditoralModel";

const EditorialApi = new APIClient<EditorialMember>("/editorial");
export const honoraryEditorial = new APIClient<EditorialByHonorary>("/editorial/honorary");

export default EditorialApi;
