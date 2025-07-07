import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // ovo sluzi da sprijeci reload stranice prilikom slanja forme
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Join our newsletter for exclusive updates, new arrivals, and special offers delivered straight to your inbox. </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        <button className='bg-gray-800 text-white text-xs px-10 py-4' type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
