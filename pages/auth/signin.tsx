import React from 'react'
import { getProviders, signIn as singInProvider } from 'next-auth/react';

type Props = {
    providers: any;
}

// browser....
const signIn = ({providers}: Props) => {
  return (
    <>
      {Object.values(providers).map((provider:any) => (
        <div key={provider.name}>
          <button onClick={() => singInProvider(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
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

