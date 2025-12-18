import APIClient from "../../../services/apiClient";
import type { Contact } from "../model/ContactModel";

const contactApi = new APIClient<Contact>("/contact");

export default contactApi;
