import APIClient from "../../../services/apiClient";
import type { HeroSectionImage } from "../model/HeroModel";

const HeroSectionApi = new APIClient<HeroSectionImage>("/hero_section_image");

export default HeroSectionApi;