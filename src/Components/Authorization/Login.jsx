import React, {useState} from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// Schemas
import { LoginSchema } from "../../assets/utils/validationSchemas/loginSchema";

// Images
import loginImage from "../../assets/images/loginImage.png";

// Logos
import BillBridgeLogo from "../../assets/logos/BillBridgeLogo";

export default function Login({handleLogin}) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // For validation demo only
      console.log('Valid form data:', values);
      setSubmitted(true);
      handleLogin()
      
      
      // When ready to implement Redux:
      // const resultAction = await dispatch(loginUser(values));
      // if (loginUser.fulfilled.match(resultAction)) {
      //   navigate('/dashboard');
      // }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl overflow-hidden bg-white">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginImage}
            alt="AI Invoice Automation"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center mx-10">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <BillBridgeLogo className="h-8 w-auto" />
              <h1 className="text-2xl font-semibold text-gray-800">
                BillBridge AI
              </h1>
            </div>
            <h2 className="mt-4 text-xl font-semibold">
              Welcome Back to BillBridge AI
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Automate your invoice operations with ease. <br /> Sign in to continue.
            </p>
          </div>

          {submitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
              Form validation successful! (API integration pending)
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`mt-1 w-full px-4 py-2 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`mt-1 w-full px-4 py-2 border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  className="form-checkbox" 
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                />
                <span>Remember for 30 days</span>
              </label>
              <a href="#" className="text-[#1B61AD] hover:underline">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#1B61AD] text-white font-semibold rounded-md hover:bg-white border border-[#1B61AD] hover:text-[#1B61AD] transition"
            >
              Log In to Dashboard
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-[#744ccc] font-semibold hover:underline" onClick={() => navigate("/signup")}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}