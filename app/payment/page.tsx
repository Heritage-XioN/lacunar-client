"use client"
import handlePayment from '@/actions/transactions';
import initializeTransaction from '@/actions/transactions';
import React from 'react'

const page = () => {
    async function processTransaction(){
      await handlePayment()
    }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="font-black text-lg">testing payment</h1>
      <button onClick={processTransaction} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">pay now</button>
    </div>
  )
}

export default page