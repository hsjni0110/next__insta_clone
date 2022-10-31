import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

type Props = {}




const Posts = (props: Props) => {

    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "posts"), orderBy('timestamp', 'desc')), snapshot => {
                setPosts(snapshot.docs);
            }
        )
    }, [db])


    return (
        <div>
            {posts.map((post: any) => (
                <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} />
            ))}
        </div>
    )
}

export default Posts