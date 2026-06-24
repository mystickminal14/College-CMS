import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, Gift, Phone } from "lucide-react";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import HeroTitleWithGif from "../../../components/AnimatedTitleWithGif";
import MerittoWidget from "./MerittoWidget";

const REFERRAL_WIDGET_ID = "6a0910e7e86516929134ee7fda60761f";

export default function ReferralPage() {
  return (
    <>
      <Seo
        title="Student Referral | LBEF College Nepal"
        description="Refer your friends and relatives to join the programmes offered at LBEF Campus and earn referral rewards."
        url={`${APP_URL}/referral`}
      />

      <div className="min-h-screen bg-gray-50">
        <HeroTitleWithGif
          title="Student Referral"
          highlightedText="Referral"
          subtitle="Refer your friends and relatives to LBEF Campus and be rewarded when they join our programmes."
          badgeText="Referral Reward Programme"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-700 font-medium">Student Referral</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* ── Info column ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-900">LBEF</strong> is proud of its
                years of excellence, and to celebrate this achievement we are
                excited to announce our{" "}
                <strong className="text-gray-900">Student Referral Reward</strong>.
                Refer your friends and relatives to join the programmes offered at{" "}
                <strong className="text-gray-900">LBEF Campus</strong> and, after
                they join, we will reward both you and your friend as a token of
                our thanks.
              </p>

              <p className="text-gray-600 leading-relaxed">
                To be eligible for the referral bonus, you need to refer a
                candidate who hasn’t previously applied to or studied at our
                college. Please fill in the form to register your referral.
              </p>

              {/* Courses */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">
                    Admissions are ongoing for
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-gray-700 text-sm">
                      <strong>B.Sc. (Hons.) in Information Technology</strong> —
                      B.Sc.IT
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-gray-700 text-sm">
                      <strong>
                        M.Sc. in Information Technology Management
                      </strong>{" "}
                      — M.Sc.ITM (Morning / Evening)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Reward note */}
              <div className="flex items-start gap-3 bg-blue-50/60 border border-blue-100 rounded-2xl p-5">
                <Gift className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  Rewards are given to the referrer once each referred candidate
                  joins our programmes.
                </p>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  For more details about the Student Referral Reward, contact{" "}
                  <strong className="text-gray-900">
                    Ms. Samjhana Neupane
                  </strong>{" "}
                  (Admissions Officer) on{" "}
                  <a href="tel:9801110200" className="text-blue-600 hover:underline">
                    9801110200
                  </a>{" "}
                  /{" "}
                  <a href="tel:014444356" className="text-blue-600 hover:underline">
                    01-4444356
                  </a>{" "}
                  /{" "}
                  <a href="tel:014411805" className="text-blue-600 hover:underline">
                    01-4411805
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            {/* ── Widget column ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:sticky lg:top-24"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Refer a Student
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Fill in the form below to submit your referral.
              </p>
              <MerittoWidget widgetId={REFERRAL_WIDGET_ID} height="600px" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
