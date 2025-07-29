import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { ArrowRight, Fingerprint } from 'lucide-react';

const AuthContainer = ({ isLoginView, toggleView }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ease-in-out">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Fingerprint className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 ml-2">SecureID</h1>
          </div>
          <button
            onClick={toggleView}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-all duration-300 font-medium"
          >
            {isLoginView ? 'Create account' : 'Sign in'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isLoginView ? 'Welcome back' : 'Create an account'}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {isLoginView 
            ? 'Enter your credentials to access your account' 
            : 'Fill out the form to start your journey with us'}
        </p>

        <div className="transition-opacity duration-300 ease-in-out">
          {isLoginView ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;