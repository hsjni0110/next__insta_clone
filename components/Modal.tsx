import React, { Fragment, useRef, useState } from 'react'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil';
import { Transition, Dialog } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

type Props = {}

const Modal = (props: Props) => {

  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession<any>();
  const filePickerRef = useRef<any>();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef<any>();

  const addImageToPost = (e:any) => {
    const reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readEvent:any) => {
      setSelectedFile(readEvent.target.result);
    }

  }




  const uploadPost = async (e: any) => {
    if(loading) return;

    setLoading(true);

  
      const docRef = await addDoc(collection(db, 'posts'), {
        username: session?.user.username,
        caption: captionRef.current.value,
        profileImg: session?.user.image,
        timestamp: serverTimestamp()
      })
      
      console.log("New doc added with ID", docRef.id)

      const imageRef = ref(storage, `posts/${docRef.id}/image`)

      await uploadString(imageRef, selectedFile, "data_url").then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL
        })
      })
    
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  
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

            <div className="fixed inset-0 flex items-center justify-center p-4">

              <Dialog.Panel className="inline-block align-bottom bg-white rounded-lg px-4 pb-4 pt-5 text-left overflow-hidden
                shadow-xl transform transition-all sm:my-8 sm:algin-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {selectedFile? (
                    <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => setSelectedFile(null)} alt='' />
                  ):(
                    <div
                  onClick={() => filePickerRef.current.click()}
                  className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
                    <CameraIcon className='h-6 w-6 text-red-600' aria-hidden="true" />
                  </div>
                  )}


                  
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Upload a Photo
                    </Dialog.Title>
                  </div>

                  <div>
                    <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                  </div>

                  <div className='mt-2'>
                    <input ref={captionRef} className='border-none focus:ring-0 w-full text-center' type="text" placeholder='Please enter a caption...' />
                  </div>

                  <div className="mt-3 text-center sm:mt-5">
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4
                      py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:ouline-none focus:ring-2 fucus:ring-offset-2
                      focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                      onClick={uploadPost}
                    >
                      {loading? "Uploading..." : "Upload post"}
                    </button>
                  </div>
                </div>
                </div>
              </Dialog.Panel>

            </div>
          </Transition.Child>

        </div>
      </Dialog>

    </Transition.Root>
  )
}

export default Modal