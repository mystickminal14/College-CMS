export interface ProfileModel {
  student_id?: number;
  stu_firstname?: string;
  stu_middlename?: string;
  stu_lastname?: string;
  stu_gender?: string;
  student_status?: string;
  stu_roll_no?: string;
  stu_univ_roll_no?: string;
  stu_mobile?: string;
  stu_email?: string;
  stu_profile_path?: string;
  stu_photo?: string;
  stu_res_city?: string;
  stu_res_country?: string;
  collegereg_id?: number;
  course_name?: string;
  course_short_name?: string;
  semester_name?: string;
  session_name?: string;
  stu_father_name?: string;
  stu_mother_name?: string;
  stu_gur_name?: string;
  stu_gur_mobile?: string;
  stu_gur_email?: string;
  stu_wifi_access?: string;
  subjects?: Subject[];
}

export interface Subject {
  subject_id?: number;
  subject_code?: string;
  subject_name?: string;
  subject_short_name?: string;
}
