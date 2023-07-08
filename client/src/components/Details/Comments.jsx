import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import Comment from './Comment';

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async(e) => {
        await API.newComment(comment);
        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <div className="container flex flex-col">
            <div className="flex items-center mb-1 shadow-sm p-4">
                <img src={url} alt="dp" className="w-12 h-12 rounded-full mr-3 mt-4"/>   
                <textarea
                    className="w-full border border-gray-300 mt-5 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <button 
                    className=" bg-blue-500 rounded-md px-8 py-2 ml-2 mx-auto text-xl mt-4 hover:bg-blue-600"
                    onClick={(e) => addComment(e)}
                >Post</button>             
            </div>
            <div>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </div>
        </div>
    )
}

export default Comments;