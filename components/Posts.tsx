import React from 'react'
import Post from './Post'

type Props = {}

const DUMMY_DATA = [
    {
        id: "123",
        username: "hihihi",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "Hi Nice TO Meet You, this is first post",
    },
    {
        id: "125",
        username: "hihihi",
        userImg: "https://links.papareact.com/3ke",
        img: "https://links.papareact.com/3ke",
        caption: "Hi Nice TO Meet You, this is first post",
    }
]


const Posts = (props: Props) => {
  return (
    <div>
        {DUMMY_DATA.map((post) => (
            <Post key={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
        ))}
    </div>
  )
}

export default Posts