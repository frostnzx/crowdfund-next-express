'use client'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/slices/authSlice';
import axios from "@/config/axios"; 
import { useRouter } from 'next/navigation';


export default function signout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSignout = async () => {
    try {
      dispatch(logOut({}));
      const response = await axios.post("/api/v1/auth/signout", {}, { withCredentials: true });
      if(response.status == 200) {
        console.log('sign-out successful');
      }
      router.push('/');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }
  return (
    <>
    <button onClick={handleSignout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">sign-out</button>
    </>
  )
}
