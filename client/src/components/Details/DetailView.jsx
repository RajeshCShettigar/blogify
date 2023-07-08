import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { MdEdit,MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './Comments';

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    const deleteBlog = async () => {  
        await API.deletePost(post._id);
        navigate('/')
    }

    return (
        <div className="mx-16 mt-8 md:mx-0 md:px-16 shadow-md">
            <div className="shadow-sm">
            <img src={post.picture || url} alt="post" className="w-screen h-96 object-cover"/>
            <div className="p-4">
            <div className="float-right">
                {   
                    account.username === post.username && 
                    <>  
                     <div className="flex flex-row">   <Link to={`/update/${post._id}`}>
                            <MdEdit color="primary" className="m-1 p-1 border border-gray-500 rounded-md text-blue-500 w-12 h-12"/>
                            </Link>
                        <MdDelete onClick={() => deleteBlog()} className="m-1 p-1 border border-gray-500 rounded-md text-red-500 w-12 h-12 cursor-pointer" />
                    </div>
                    </>
                }
            </div>
            <h3 className="text-3xl font-semibold text-center my-10">{post.title}</h3>

            <div className="text-gray-600 flex my-5">
                <Link to={`/?username=${post.username}`}>
                    <p className="text-xl font-semibold text-gray-800">Author: <span style={{fontWeight: 600}}>{post.username}</span></p>
                </Link>
                <p className="ml-auto">{new Date(post.createdDate).toDateString()}</p>
            </div>

            <p className="text-md font-semibold text-gray-800">{post.description}</p>
            </div>
            </div>
            <Comments post={post} />
        </div>
    )
}

export default DetailView;