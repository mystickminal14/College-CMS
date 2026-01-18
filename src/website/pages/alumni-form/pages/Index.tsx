import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { EPrefix, EStudyMode, type AlumniFormData } from '../models/alumniModel';


/* =======================
   Types
======================= */
type FormErrors = Partial<Record<keyof AlumniFormData | 'submit', string>>;

/* =======================
   Component
======================= */
const AlumniFormPage: React.FC = () => {
  const [formData, setFormData] = useState<AlumniFormData>({
    collegeRollNo: '',
    UniRollNo: '',
    prefix: EPrefix.MR,
    fullName: '',
    degree: '',
    yearOfPassing: '',
    mode: EStudyMode.DAY,
    email: '',
    mobileNo: '',
    presentEmployer: '',
    designation: '',
    presentCountry: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /* =======================
     Handlers
  ======================= */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.collegeRollNo.trim())
      newErrors.collegeRollNo = 'College Roll No is required';

    if (!formData.UniRollNo.trim())
      newErrors.UniRollNo = 'University Roll No is required';

    if (!formData.fullName.trim())
      newErrors.fullName = 'Full Name is required';

    if (!formData.degree.trim())
      newErrors.degree = 'Degree is required';

    if (!formData.yearOfPassing.trim()) {
      newErrors.yearOfPassing = 'Year of Passing is required';
    } else if (!/^\d{4}$/.test(formData.yearOfPassing)) {
      newErrors.yearOfPassing = 'Enter a valid year (e.g., 2023)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Submitted:', formData);
      setSubmitSuccess(true);
      setErrors({});

      setTimeout(() => {
        setFormData({
          collegeRollNo: '',
          UniRollNo: '',
          prefix: EPrefix.MR,
          fullName: '',
          degree: '',
          yearOfPassing: '',
          mode: EStudyMode.DAY,
          email: '',
          mobileNo: '',
          presentEmployer: '',
          designation: '',
          presentCountry: '',
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch {
      setErrors({ submit: 'Failed to submit form. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      collegeRollNo: '',
      UniRollNo: '',
      prefix: EPrefix.MR,
      fullName: '',
      degree: '',
      yearOfPassing: '',
      mode: EStudyMode.DAY,
      email: '',
      mobileNo: '',
      presentEmployer: '',
      designation: '',
      presentCountry: '',
    });
    setErrors({});
    setSubmitSuccess(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Alumni Registration Form
          </h1>
          <p className="text-gray-600">
            Please fill in your details to register as an alumnus. All fields marked with * are required.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Registration submitted successfully! Thank you for registering as an alumnus.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">{errors.submit}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* College Roll No */}
              <div>
                <label htmlFor="collegeRollNo" className="block text-sm font-medium text-gray-700 mb-1">
                  College Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="collegeRollNo"
                  name="collegeRollNo"
                  value={formData.collegeRollNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.collegeRollNo ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter college roll number"
                />
                {errors.collegeRollNo && <p className="mt-1 text-sm text-red-600">{errors.collegeRollNo}</p>}
              </div>

              {/* University Roll No */}
              <div>
                <label htmlFor="UniRollNo" className="block text-sm font-medium text-gray-700 mb-1">
                  University Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="UniRollNo"
                  name="UniRollNo"
                  value={formData.UniRollNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.UniRollNo ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter university roll number"
                />
                {errors.UniRollNo && <p className="mt-1 text-sm text-red-600">{errors.UniRollNo}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Prefix */}
              <div>
                <label htmlFor="prefix" className="block text-sm font-medium text-gray-700 mb-1">
                  Prefix <span className="text-red-500">*</span>
                </label>
                <select
                  id="prefix"
                  name="prefix"
                  value={formData.prefix}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value={EPrefix.MR}>Mr.</option>
                  <option value={EPrefix.MS}>Ms.</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.fullName ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Degree */}
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.degree ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., B.Tech Computer Science"
                />
                {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree}</p>}
              </div>

              {/* Year of Passing */}
              <div>
                <label htmlFor="yearOfPassing" className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Passing <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="yearOfPassing"
                  name="yearOfPassing"
                  value={formData.yearOfPassing}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.yearOfPassing ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., 2023"
                  maxLength={4}
                />
                {errors.yearOfPassing && <p className="mt-1 text-sm text-red-600">{errors.yearOfPassing}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Study Mode */}
              <div>
                <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                  Study Mode <span className="text-red-500">*</span>
                </label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value={EStudyMode.MORNING}>Morning</option>
                  <option value={EStudyMode.DAY}>Day</option>
                  <option value={EStudyMode.EVENING}>Evening</option>
                  <option value={EStudyMode.WEEKEND}>Weekend</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Mobile No */}
              <div>
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.mobileNo ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobileNo && <p className="mt-1 text-sm text-red-600">{errors.mobileNo}</p>}
              </div>

              {/* Present Employer */}
              <div>
                <label htmlFor="presentEmployer" className="block text-sm font-medium text-gray-700 mb-1">
                  Present Employer (Optional)
                </label>
                <input
                  type="text"
                  id="presentEmployer"
                  name="presentEmployer"
                  value={formData.presentEmployer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your current employer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Designation */}
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                  Designation (Optional)
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your designation"
                />
              </div>

              {/* Present Country */}
              <div>
                <label htmlFor="presentCountry" className="block text-sm font-medium text-gray-700 mb-1">
                  Present Country (Optional)
                </label>
                <input
                  type="text"
                  id="presentCountry"
                  name="presentCountry"
                  value={formData.presentCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your current country"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg border border-gray-300 transition"
              >
                Reset Form
              </button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>By submitting this form, you agree to the alumni association terms and conditions.</p>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This form collects information for alumni records and networking purposes.</p>
          <p className="mt-1">All fields marked with <span className="text-red-500">*</span> are required.</p>
        </div>
      </div>
    </div>
  );
};

export default AlumniFormPage;