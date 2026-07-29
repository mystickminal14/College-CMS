import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Home, ArrowRight, Mail, Phone } from "lucide-react";
import Seo from "../../../context/seo";
import { APP_URL } from "../../../constants";
import logo from "../../../assets/lbef_five.webp";

/**
 * Generic thank-you page shown after a program enquiry form is submitted.
 *
 * Routed at `/:slug/thank-you` so each program form can redirect to its own
 * URL (e.g. `/bscit/thank-you`, `/bba/thank-you`). The `slug` is used only to
 * link the visitor back to the program page they came from.
 */
export default function ThankYouPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  return (
    <>
      <Seo
        title="Thank You | LBEF College Nepal"
        description="Thank you for your enquiry. Our admissions team will contact you shortly."
        url={slug ? `${APP_URL}/${slug}/thank-you` : `${APP_URL}/thank-you`}
      />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-16">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl"
        >
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 px-8 sm:px-12 py-12 text-center">
            {/* Logo */}
            <img
              src={logo}
              alt="LBEF College"
              className="h-12 sm:h-14 w-auto mx-auto mb-8 object-contain"
            />

            {/* Animated success ring */}
            <div className="relative mx-auto mb-7 h-24 w-24">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                className="absolute inset-0 rounded-full bg-green-100"
              />
              <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 16 }}
                className="absolute inset-2 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <Check className="h-10 w-10 text-white" strokeWidth={3} />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-3"
            >
              Thank You!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto"
            >
              Your journey to evolve begins here. Our admissions team will connect with you shortly and guide you through the next steps towards your future.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </button>
              {slug && (
                <Link
                  to={`/${slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
                >
                  View Program
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>

            {/* Contact strip */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-gray-500">
              <span className="font-medium text-gray-400 uppercase tracking-wider">
                Need help?
              </span>
              <a
                href="tel:+97715244070"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 transition"
              >
                <Phone className="h-3.5 w-3.5" />
                +977 9801110200
              </a>
              <a
                href="mailto:info@lbef.edu.np"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 transition"
              >
                <Mail className="h-3.5 w-3.5" />
                info@lbef.edu.np
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
