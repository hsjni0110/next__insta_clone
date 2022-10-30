import React, { Fragment } from 'react'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil';
import { Transition, Dialog } from '@headlessui/react';

type Props = {}

const Modal = (props: Props) => {

    const [open, setOpen] = useRecoilState(modalState)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          
         
        <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      </Transition.Child>
          
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="inline-block align-bottom bg-white rounded-lg px-4 pb-4 pt-5 text-left overflow-hidden
                shadow-xl transform transition-all sm:my-8 sm:algin-middle sm:max-w-sm sm:w-full sm:p-6">
                  <h1>hello</h1>
                </Dialog.Panel>
              </div>
      </Transition.Child>
            
        </div>
      </Dialog>

    </Transition.Root>
  )
}

export default Modal