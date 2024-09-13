import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, UserPlus, Calendar } from 'lucide-react';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import { useUserStore } from '../stores/useUserStore';
import moment from 'moment';

const UserProfile = () => {
  const { user, updateProfile, loading } = useUserStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (name !== user.name || email !== user.email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, user.name, user.email]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfile(name, email);
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:px-8">
      <motion.div 
        className='w-full max-w-lg' 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-800 mt-10 py-8 px-6 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={handleUpdateProfile} className='space-y-6'>
            <InputField 
              icon={User} 
              labelText="Full Name" 
              id="name" 
              type="text" 
              placeholder={user.name} 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />

            <InputField 
              icon={Mail} 
              labelText="Email" 
              id="email" 
              type="email" 
              placeholder={user.email} 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />

            <InputField 
              disabled={true} 
              labelText="Role" 
              id="role" 
              type="text" 
              placeholder={user.role.toUpperCase()} 
              value={''} 
              onChange={e => e.target.value} 
            />
            
            <InputField 
              disabled={true} 
              icon={Calendar} 
              labelText="Joined At" 
              id="joined" 
              type="text" 
              placeholder={moment(user.createdAt).format('DD-MM-YYYY LT')} 
              value={''} 
              onChange={e => e.target.value} 
            />

            <PrimaryButton 
              onClick={handleUpdateProfile} 
              disabled={disabled} 
              type="submit" 
              loadingText="Updating Profile..." 
              loadingState={loading} 
              icon={UserPlus} 
              btnName="Update Profile" 
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
