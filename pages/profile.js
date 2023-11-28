import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Profile = () => {
    const router = useRouter();
    useEffect(()=>{
        {!localStorage.getItem('token') ? router.push('/') : ''}
    },[])

  return (
    <div>Profile</div>
  )
}

export default Profile