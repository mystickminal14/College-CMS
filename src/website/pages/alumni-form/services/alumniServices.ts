import APIClient from "../../../../services/apiClient";
import type { AlumniFormData } from "../models/alumniModel";

export const getAlumni = new APIClient<AlumniFormData>("/alumni-form");
export const alumniApiAll = new APIClient<AlumniFormData>("/alumni-form/all");
export const alumniDelete = new APIClient<AlumniFormData>("/alumni-form/delete");
export const alumniCreate = new APIClient<AlumniFormData>(
  "/alumni-form/create"
);
