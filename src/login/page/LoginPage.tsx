import { useState } from "react";
import appLogo from "../../assets/applogo.png";
import minal from "../../assets/full_form_lbef.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogin from "../hooks/useLogin";
import type { LoginUser } from "../model/LoginModel";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setData] = useState<LoginUser>({
    username: "",
    password: "",
  });
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full font-poppins min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Left login section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <div>
            <img
              src={appLogo}
              alt="App Logo"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain"
            />
          </div>

          <div className="w-full max-w-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 tracking-wide">
              Login
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              Enter your account details to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:border-blue-500 outline-none"
              />

              <div className="relative">
                <input
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:border-blue-500 outline-none pr-10"
                />
                <span
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>



              <button
                type="submit"
                disabled={loginMutation.isPending}
                className={`w-full p-2 rounded-lg font-semibold transition 
    ${loginMutation.isPending
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-2">
                Designed and Developed by <span className="font-semibold">Yaksha Soft</span>
              </p>

            </form>
          </div>
        </div>

        {/* Right image section */}
        <div
          className="hidden lg:block w-full lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${minal})` }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
