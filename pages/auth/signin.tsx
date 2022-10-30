import React from 'react'
import { getProviders, signIn as singInProvider } from 'next-auth/react';
import Header from '../../components/Header';

type Props = {
    providers: any;
}

// browser....
const signIn = ({providers}: Props) => {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-36 px-14 text-center'>
        <img className='w-80' src='https://links.papareact.com/ocw' alt=''/>
        <p className='font-xs italic'>This is Not Real App, It is built for educational purpose only</p>
      <div className='mt-40'>
      {Object.values(providers).map((provider:any) => (
        <div key={provider.name}>
          <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => singInProvider(provider.id, { callbackUrl: '/'})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
      </div>
    </>
  )
}

// server...
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signIn

