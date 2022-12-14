import Image from 'next/image';
import React from 'react'
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon, HomeIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

type Props = {}

const Header = (props: Props) => {

    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);

    const router = useRouter();

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>

            <div className='flex justify-between max-w-6xl items-center mx-5 xl:mx-auto'>
                {/* Left */}
                <div onClick={() => router.push('/')} className='relative hidden lg:inline-grid w-24 h-10 cursor-pointer'>
                    <Image src="https://links.papareact.com/ocw" width="100" height="20" alt='' className='object-contain' />
                </div>

                <div onClick={() => router.push('/')} className='relative w-30 lg:hidden flex-shrink-0 cursor-pointer'>
                    <Image src="https://links.papareact.com/jjm" width="100" height="20" alt='' className='object-contain' />
                </div>
                {/* Middle = Search Input field*/}

                <div className='relative mt-1 p-3 rounded-md'>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input className="bg-gray-50 w-full pl-10 block sm:text-samll border-gray-300 rounded-md focus:ring-black focus:border-black" type="text" placeholder='Search' />
                </div>

                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>

                    <HomeIcon onClick={() => router.push('/')} className='navBtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />

                    {session ? (
                        <>                
                        <div className='relative navBtn'>
                            <PaperAirplaneIcon className='navBtn rotate-45' />
                            <div className='absolute -top-2 -right-2 text-sm w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'>3</div>
                        </div>

                            <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                            <UserGroupIcon className='navBtn' />
                            <HeartIcon className='navBtn' />

                            <img
                                referrerPolicy="no-referrer"
                                src={session?.user?.image}
                                alt="profile pic"
                                className='h-10 w-10 rounded-full cursor-pointer'
                                onClick={signOut}
                            />
                        </>

                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Header;