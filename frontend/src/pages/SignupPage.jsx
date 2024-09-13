import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import PageHeading from '../components/PageHeading';

import { useUserStore } from '../stores/useUserStore';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password, confirmPassword });
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white px-4 py-12 sm:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <PageHeading
          textSize="text-3xl sm:text-4xl md:text-5xl"
          mainHeading="Create Your Account"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gray-800 mt-8 py-8 px-6 sm:px-8 md:px-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={User}
            labelText="Full Name"
            id="name"
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            icon={Mail}
            labelText="Email"
            id="email"
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            icon={Lock}
            labelText="Password"
            id="password"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            icon={Lock}
            labelText="Confirm Password"
            id="confirmPassword"
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <PrimaryButton
            type="submit"
            loadingText="Creating Account..."
            loadingState={loading}
            icon={UserPlus}
            btnName="Create Account"
          />

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;
