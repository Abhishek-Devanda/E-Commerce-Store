import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

import PrimaryButton from '../components/PrimaryButton'
import InputField from '../components/InputField'
import PageHeading from '../components/PageHeading'

import { useUserStore } from '../stores/useUserStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, loading, } = useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }



  return (
    <div className=" flex flex-col justify-center items-center h-screen">

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} >
        <PageHeading textSize={"text-5xl sm:text-4xl"} mainHeading={"Login Your Account"} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} >
        <div className='bg-gray-800 mt-8 py-8 px-4 shadow sm:rounded-lg sm:px-10' >

          <form onSubmit={handleSubmit} className='space-y-4'>


            <InputField icon={Mail} labelText="Email" id="email" required type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value) }} />

            <InputField icon={Lock} labelText="Password" id="password" required type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value) }} />



            <PrimaryButton type="submit" loadingText={"Logging In..."} loadingState={loading} icon={LogIn} btnName={'Login'} />



            <p className='mt-8 text-center text-sm text-gray-400'>
              Don&apos;t have an account?{" "}
              <Link to='/signup' className='font-medium text-emerald-400 hover:text-emerald-300'>
                register here <ArrowRight className='inline h-4 w-4' />
              </Link>
            </p>

          </form>

        </div>

      </motion.div>
    </div>
  )
}

export default LoginPage
