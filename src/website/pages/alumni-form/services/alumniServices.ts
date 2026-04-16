import APIClient from "../../holidays/baseUrl/baseUrl";
import type { AlumniFormData } from "../models/alumniModel";

export const getAlumni = new APIClient<AlumniFormData>("/alumni");
export const alumniApiAll = new APIClient<AlumniFormData>("/alumni");
export const alumniCreate = new APIClient<AlumniFormData>(
  "/alumni"
);
