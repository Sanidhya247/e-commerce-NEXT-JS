import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Orders = () => {
    const router = useRouter();
    useEffect(()=>{
        {!localStorage.getItem('token') ? router.push('/') : ''}
    },[])
  return (
    <div>Orders</div>
  )
}

export default Orders