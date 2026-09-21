import { useParams } from "react-router-dom";
import { CheckCircle2, Clock, LogOut, User, XCircle } from "lucide-react";

import useGetVisitorPass from "../../../pages/visitor-book/hooks/useGetVisitorPass";
import { VISITOR_IMAGE_URL } from "../../../constants";

const formatTime = (value: string | null) => {
  if (!value) return "--";
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });

const VisitorPassPage = () => {
  const { qrToken } = useParams<{ qrToken: string }>();
  const { data, isLoading, isError } = useGetVisitorPass(qrToken);
  const pass = data?.data;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-md overflow-hidden">
        <div className="bg-linear-to-r from-[#125DAA] to-[#1a7cd3] p-6 text-center">
          {pass?.photo ? (
            <img
              src={`${VISITOR_IMAGE_URL}/${pass.photo}`}
              alt={pass.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-2 border-white/70"
            />
          ) : (
            <User className="w-10 h-10 text-white mx-auto mb-2" />
          )}
          <h1 className="text-white text-xl font-bold">Visitor Pass</h1>
        </div>

        <div className="p-6">
          {isLoading && !pass && (
            <p className="text-center text-gray-500 py-8">Loading your pass...</p>
          )}

          {isError && !pass && (
            <div className="flex flex-col items-center text-center py-8 gap-2">
              <XCircle className="w-10 h-10 text-red-500" />
              <p className="text-gray-700 font-medium">Visitor pass not found</p>
              <p className="text-sm text-gray-500">
                This link may have expired or the QR code was invalid.
              </p>
            </div>
          )}

          {pass && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Pass Code</span>
                <span className="font-mono font-semibold text-gray-900">{pass.code}</span>
              </div>

              <div className="text-center py-2">
                <p className="text-2xl font-bold text-gray-900">{pass.name}</p>
                <p className="text-sm text-gray-500">{pass.purpose}</p>
              </div>

              <div
                className={`flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm ${
                  pass.status === "IN"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {pass.status === "IN" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Currently Inside
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" /> Checked Out
                  </>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Here to meet</span>
                  <span className="font-medium text-gray-900">{pass.personToMeet || "--"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Visitors</span>
                  <span className="font-medium text-gray-900">{pass.numberOfPerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{formatDate(pass.visitedDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> In / Out
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatTime(pass.inTime)} — {formatTime(pass.outTime)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center pt-2">
                Show this screen on arrival.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorPassPage;
