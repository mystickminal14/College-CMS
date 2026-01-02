import { motion } from "framer-motion";
import { useState } from "react";
import decoration from "../../../assets/decoration.png";
import { fadeUp } from "../../comp/animation";

const PaymentModes = () => {
  const [activeTab, setActiveTab] = useState("IT");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const ITBankAccounts = [
    { bank: "Prabhu Bank Ltd., Babarmahal", account: "0010154212400017", holder: "LBEF Vidyapeeth Pvt. Ltd." },
    { bank: "NMB Bank, Babarmahal", account: "0010016840500011", holder: "LBEF Vidyapeeth" }
  ];

  const MBABankAccounts = [
    { bank: "Nabil Bank, Maitidevi", account: "3601017500705", holder: "College for Professional Studies Pvt. Ltd." },
    { bank: "Prabhu Bank Ltd., Babarmahal", account: "3517087016900028", holder: "College for Professional Studies Pvt. Ltd." },
    { bank: "Nepal SBI Bank, Teku", account: "19225240200025", holder: "College for Professional Studies Pvt. Ltd." },
    { bank: "Sunrise Bank, Gairidhara", account: "00210341247017", holder: "College for Professional Studies Pvt. Ltd." }
  ];

  const MobileWalletsMBA = [
    { name: "ESewa", color: "from-emerald-500 to-green-500", search: "College for Professional Studies, Maitidevi" },
    { name: "Khalti", color: "from-purple-500 to-pink-500", search: "College for Professional Studies, Maitidevi" }
  ];

  const contactNumber = "9801110200";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50/30">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto sm:px-6 lg:px-8 py-4 md:py-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-6 px-6 py-3 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm"
          >
            <span className="w-2 h-2 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 font-semibold text-sm">
              Secure Payment Gateway
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">Payment </span>
            <span className="relative inline-block ml-2">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 relative z-10">
                Modes
              </span>
              <motion.img
               initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src={decoration}
                alt="Decoration"
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-full h-2 md:h-3"
              />
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose your convenient payment method from the options below. 
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 mb-8 lg:hidden">
        <div className="flex rounded-2xl bg-white p-1 shadow-lg border border-gray-200 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("IT")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "IT"
                ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            IT Programs
          </button>
          <button
            onClick={() => setActiveTab("MBA")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "MBA"
                ? "bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            MBA Program
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="hidden lg:grid grid-cols-2 gap-8 mb-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px 0px" }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 hover:shadow-3xl transition-shadow duration-300 h-auto"
            >
              <ProgramCard 
                type="IT" 
                accounts={ITBankAccounts} 
                onCopy={handleCopy} 
                copiedIndex={copiedIndex}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px 0px" }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100 hover:shadow-3xl transition-shadow duration-300 h-auto"
            >
              <ProgramCard 
                type="MBA" 
                accounts={MBABankAccounts} 
                onCopy={handleCopy} 
                copiedIndex={copiedIndex}
                mobileWallets={MobileWalletsMBA}
              />
            </motion.div>
          </div>

          <div className="lg:hidden space-y-6">
            {activeTab === "IT" ? (
              <motion.div
                key="IT"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-2xl p-6 border border-blue-100"
              >
                <ProgramCard 
                  type="IT" 
                  accounts={ITBankAccounts} 
                  onCopy={handleCopy} 
                  copiedIndex={copiedIndex}
                  isMobile={true}
                />
              </motion.div>
            ) : (
              <motion.div
                key="MBA"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl shadow-2xl p-6 border border-emerald-100"
              >
                <ProgramCard 
                  type="MBA" 
                  accounts={MBABankAccounts} 
                  onCopy={handleCopy} 
                  copiedIndex={copiedIndex}
                  mobileWallets={MobileWalletsMBA}
                  isMobile={true}
                />
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px" }}
            className="bg-linear-to-r from-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 shadow-lg border border-amber-200 mt-8"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Important Notice</h3>
                <div className="space-y-2 text-amber-800">
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span>Please ensure you use the correct payment details based on your program.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span>Payments made to incorrect accounts may cause delays in processing.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span>Always include your student ID in the payment reference.</span>
                  </p>
                </div>
                <div className="mt-4 p-4 bg-white/50 rounded-xl border border-amber-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-sm text-amber-700 font-medium">
                      📞 Need help? Contact accounts office:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg font-mono text-sm">
                        {contactNumber}
                      </code>
                      <button
                        onClick={() => handleCopy(contactNumber, 999)}
                        className="text-amber-600 hover:text-amber-800 transition-colors text-sm font-medium"
                      >
                        {copiedIndex === 999 ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProgramCard = ({ 
  type, 
  accounts, 
  onCopy, 
  copiedIndex, 
  mobileWallets = [],
  isMobile = false 
}: {
  type: string;
  accounts: Array<{ bank: string; account: string; holder?: string }>;
  onCopy: (text: string, index: number) => void;
  copiedIndex: number | null;
  mobileWallets?: Array<{ name: string; color: string; search: string }>;
  isMobile?: boolean;
}) => {
  const isIT = type === "IT";
  const color = isIT ? "blue" : "emerald";
  const linearFrom = isIT ? "from-blue-600 to-indigo-600" : "from-emerald-600 to-green-600";
  const bgLinear = isIT ? "from-blue-50/50 to-indigo-50/50" : "from-emerald-50/50 to-green-50/50";
  const borderColor = isIT ? "border-blue-200" : "border-emerald-200";
  const hoverBorder = isIT ? "group-hover:border-blue-300" : "group-hover:border-emerald-300";
  const textColor = isIT ? "text-blue-700" : "text-emerald-700";
  const iconColor = isIT ? "text-blue-600" : "text-emerald-600";
  const iconBg = isIT ? "from-blue-100 to-indigo-100" : "from-emerald-100 to-green-100";
  const title = isIT ? "For Students of B.Sc.(IT), BBM and M.Sc.(ITM)" : "For Students of MBA";
  const payableTo = isIT ? "LBEF Vidyapeeth Pvt. Ltd." : "College for Professional Studies Pvt. Ltd.";
  const mobileWalletSearch = isIT ? "LBEF Vidyapeeth, Maitidevi" : "College for Professional Studies, Maitidevi";
  const eSewaColor = isIT ? "from-blue-500 to-indigo-500" : "from-emerald-500 to-green-500";

  const paddingClass = isMobile ? "p-4" : "p-5";
  const accountPadding = isMobile ? "p-3" : "p-4";
  const iconSize = isMobile ? "w-10 h-10" : "w-12 h-12";
  const iconSvgSize = isMobile ? "w-5 h-5" : "w-6 h-6";
  const walletIconSize = isMobile ? "w-8 h-8" : "w-10 h-10";
  const titleSize = isMobile ? "text-xl" : "text-2xl";
  const headingSize = isMobile ? "text-lg" : "text-lg";
  const textSize = isMobile ? "text-sm" : "text-base";
  const codeSize = isMobile ? "text-xs" : "text-sm";
  const spaceClass = isMobile ? "space-y-6" : "space-y-8";

  return (
    <div className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconSize} rounded-xl bg-linear-to-br ${iconBg} flex items-center justify-center`}>
          <svg className={`${iconSvgSize} ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isIT ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            )}
          </svg>
        </div>
        <h2 className={`${titleSize} font-bold text-gray-800`}>
          {title}
        </h2>
      </div>
      
      <div className={spaceClass}>
        {/* Cash Payment */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
            <h3 className={`${headingSize} font-semibold text-transparent bg-clip-text bg-linear-to-r ${linearFrom}`}>
              Cash Payment
            </h3>
          </div>
          <div className={`bg-linear-to-r ${bgLinear} ${paddingClass} rounded-2xl border ${borderColor} ${hoverBorder} transition-colors`}>
            <p className="text-gray-700 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400`}></span>
              Payments may be made in cash during office hours at the designated counter only.
            </p>
          </div>
        </div>
        
        {/* Cheques */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
            <h3 className={`${headingSize} font-semibold text-transparent bg-clip-text bg-linear-to-r ${linearFrom}`}>
              Cheques
            </h3>
          </div>
          <div className={`bg-linear-to-r ${bgLinear} ${paddingClass} rounded-2xl border ${borderColor} ${hoverBorder} transition-colors`}>
            <p className="text-gray-700">
              Cheques can be deposited at the designated counter during office hours.
            </p>
            <div className={`mt-3 p-3 bg-white/80 rounded-lg border ${borderColor}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-600">Payable to:</p>
                  <p className={`font-semibold ${textColor}`}>{payableTo}</p>
                </div>
                <button
                  onClick={() => onCopy(payableTo, isIT ? 100 : 101)}
                  className={`text-${color}-500 hover:text-${color}-700 transition-colors text-sm font-medium ${isMobile ? 'mt-2 w-full px-3 py-1.5 bg-white border rounded-lg' : ''}`}
                >
                  {copiedIndex === (isIT ? 100 : 101) ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bank Accounts */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
            <h3 className={`${headingSize} font-semibold text-transparent bg-clip-text bg-linear-to-r ${linearFrom}`}>
              Bank Direct Deposit / Cheque / Transfer
            </h3>
          </div>
          <p className="text-gray-600 mb-4">Following are the accounts:</p>
          <div className="space-y-4">
            {accounts.map((account, index) => (
              <div key={index} className={`bg-linear-to-r ${bgLinear} ${accountPadding} rounded-2xl border ${borderColor} ${hoverBorder} transition-colors`}>
                <div className="mb-2">
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <svg className={`w-4 h-4 text-${color}-500`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    {account.bank}
                  </p>
                  
                  {/* Account Number */}
                  <div className={`mt-2 ${textSize}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-gray-600 mb-1 sm:mb-0">Account:</span>
                      <code className={`bg-white px-2 py-1 rounded ${textColor} font-mono ${codeSize} border break-all w-full block`}>
                        {account.account}
                      </code>
                      {!isMobile && (
                        <button
                          onClick={() => onCopy(account.account, isIT ? index : 10 + index)}
                          className={`text-${color}-500 hover:text-${color}-700 transition-colors ${codeSize}`}
                        >
                          {copiedIndex === (isIT ? index : 10 + index) ? "✓ Copied" : "Copy"}
                        </button>
                      )}
                    </div>
                    {isMobile && (
                      <button
                        onClick={() => onCopy(account.account, isIT ? index : 10 + index)}
                        className={`mt-2 text-${color}-500 hover:text-${color}-700 transition-colors ${codeSize} font-medium w-full px-3 py-1.5 bg-white border border-${color}-200 rounded-lg hover:bg-${color}-50`}
                      >
                        {copiedIndex === (isIT ? index : 10 + index) ? "✓ Account Copied" : "Copy Account"}
                      </button>
                    )}
                  </div>
                  
                  {/* Account Holder */}
                  {account.holder && (
                    <div className={`mt-3 ${textSize}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-gray-600 mb-1 sm:mb-0">Holder:</span>
                        <code className={`bg-white px-2 py-1 rounded text-gray-800 font-mono ${codeSize} border break-all w-full block`}>
                          {account.holder}
                        </code>
                        {!isMobile && (
                          <button
                            onClick={() => onCopy(account.holder!, isIT ? 50 + index : 60 + index)}
                            className={`text-${color}-500 hover:text-${color}-700 transition-colors ${codeSize}`}
                          >
                            {copiedIndex === (isIT ? 50 + index : 60 + index) ? "✓ Copied" : "Copy"}
                          </button>
                        )}
                      </div>
                      {isMobile && (
                        <button
                          onClick={() => onCopy(account.holder!, isIT ? 50 + index : 60 + index)}
                          className={`mt-2 text-${color}-500 hover:text-${color}-700 transition-colors ${codeSize} font-medium w-full px-3 py-1.5 bg-white border border-${color}-200 rounded-lg hover:bg-${color}-50`}
                        >
                          {copiedIndex === (isIT ? 50 + index : 60 + index) ? "✓ Holder Copied" : "Copy Holder"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Wallet */}
        <div className="group">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
            <h3 className={`${headingSize} font-semibold text-transparent bg-clip-text bg-linear-to-r ${linearFrom}`}>
              Mobile Wallet
            </h3>
          </div>
          <div className={`bg-linear-to-r ${bgLinear} ${paddingClass} rounded-2xl border ${borderColor} ${hoverBorder} transition-colors`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`${walletIconSize} rounded-xl bg-linear-to-br ${eSewaColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">eS</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">ESewa</p>
                  <p className={`text-gray-600 ${codeSize}`}>
                    Search: <span className="font-semibold">{mobileWalletSearch}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => onCopy(mobileWalletSearch, isIT ? 200 : 201)}
                className={`mt-3 sm:mt-0 text-${color}-500 hover:text-${color}-700 transition-colors ${codeSize} ${isMobile ? 'font-medium w-full px-3 py-1.5 bg-white border rounded-lg' : ''}`}
              >
                {copiedIndex === (isIT ? 200 : 201) ? "✓ Search Copied" : "Copy Search"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Mobile Wallets for MBA */}
        {!isIT && mobileWallets.length > 0 && (
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <h3 className={`${headingSize} font-semibold text-emerald-700`}>
                Other Payment Methods
              </h3>
            </div>
            <div className="space-y-3">
              {mobileWallets.map((wallet, index) => (
                <div key={index} className={`bg-linear-to-r from-emerald-50/50 to-green-50/50 ${accountPadding} rounded-2xl border border-emerald-200 group-hover:border-emerald-300 transition-colors`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8  rounded-lg bg-linear-to-br ${wallet.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-xs">{wallet.name.charAt(0)}{wallet.name.charAt(1)}</span>
                      </div>
                      <div>
                        <p className={`text-sm font-medium text-gray-800`}>{wallet.name}</p>
                        <p className={`text-gray-600 ${codeSize}`}>
                          Search: <span className="font-semibold">{wallet.search}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onCopy(wallet.search, 300 + index)}
                      className={`mt-3 sm:mt-0 text-emerald-500 hover:text-emerald-700 transition-colors text-sm ${isMobile ? 'font-medium w-full px-3 py-1.5 bg-white border rounded-lg' : ''}`}
                    >
                      {copiedIndex === (300 + index) ? "✓ Search Copied" : "Copy Search"}
                    </button>
                  </div>
                </div>
              ))}
              
              {/* IPS Connect for MBA */}
              <div className={`bg-linear-to-r from-emerald-50/50 to-green-50/50 ${accountPadding} rounded-2xl border border-emerald-200 group-hover:border-emerald-300 transition-colors`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">IP</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">IPS Connect</p>
                      <p className={`text-gray-600 ${codeSize}`}>
                        Search: <span className="font-semibold">College for Prof Studies Pvt Ltd, Maitidevi</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onCopy("College for Prof Studies Pvt Ltd, Maitidevi", 400)}
                    className={`mt-3 sm:mt-0 text-emerald-500 hover:text-emerald-700 transition-colors text-sm ${isMobile ? 'font-medium w-full px-3 py-1.5 bg-white border rounded-lg' : ''}`}
                  >
                    {copiedIndex === 400 ? "✓ Search Copied" : "Copy Search"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModes;