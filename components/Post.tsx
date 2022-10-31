import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Moment from 'react-moment';

type Props = {
    username: string;
    userImg: string;
    img: string;
    caption: string;
    id: string;
}

const Post = ({ id, username, userImg, img, caption }: Props) => {

    const { data: session } = useSession();
    const [comment, setComment] = useState<any>([]);
    const [comments, setComments] = useState<any>([]);
    const [likes, setLikes] = useState<any>([]);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
            setComments(snapshot.docs);
        })
    }, [db])

    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot:any) => {
            setLikes(snapshot.docs)
        })
    }, [db])

    useEffect(() => {
        setHasLiked(likes.findIndex((like:any) => like.id === session?.user?.uid) !== -1)
    },[likes])

    const sendComment = async (e: any) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user.username,
            userImage: session?.user.image,
            timestamp: serverTimestamp(),
        })
    }

    const likePost = async () => {

        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
                username: session?.user.username
            })
        }
        
    };

    return (
        <div className='bg-white my-7 border rounded-md'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5' />
            </div>

            {/* img */}
            <img src={img} className="object-cover w-full" />

            {/* Button */}

            {session && (
                <div className='flex justify-between px-4 pt-4'>
                    <div className='flex space-x-4 '>
                        {
                            hasLiked? (
                                <HeartIcon fill="red" onClick={likePost} className='btn text-red-500' />
                            ) : (
                                <HeartIcon onClick={likePost} className='btn' />
                            )
                        }
                        
                        <ChatIcon className='btn' />
                        <PaperAirplaneIcon className='btn' />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            )}


            {/* Caption */}
            <p className='p-5 truncate'>
                {likes.length > 0  && (
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}

                <span className='font-bold mr-1'>{username}</span>
                {caption}
            </p>
            {/* Comments */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map((comment: any) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img src={comment.data().userImage} className='h-7 rounded-full' alt="" />
                            <p className='text-sm flex-1'>
                                <span className='font-bold'>{comment.data().username + " "}</span>
                                {comment.data().comment}
                            </p>

                            <Moment fromNow className='pr-5 text-xs'>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* Input box */}
            {session && (
                <form className='flex items-center p-4'>
                    <EmojiHappyIcon className='h-7' />
                    <input value={comment} onChange={(e: any) => setComment(e.target.value)} className='border-none flex-1 focus:ring-0 outline-none' placeholder='Add a comment...' type="text" />
                    <button type="submit" onClick={sendComment} className='font-bold text-blue-400'>Post</button>
                </form>
            )}


        </div>
    )
}

export default Post