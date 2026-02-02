export interface Recognitions {
  id?: number;
  name?: string;
  description?: string;
   type?: RecogType;
  image?: string;
}
export type RecogType = "RECOGNITION" | "PERMISSION";
