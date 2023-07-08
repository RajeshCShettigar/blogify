import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'Rajesh',
    categories: 'Tech',
    createdDate: new Date()
}
const Update = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');

    const { id } = useParams();

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "blogapp");
                data.append("cloud_name", "dsajqm6yg");
                data.append('api_key','672165449324335');
                data.append('api_secret','KeWR17HCPxbyRsvHzdSSx_sEHyQ');
               await axios.post('https://api.cloudinary.com/v1_1/dsajqm6yg/image/upload', data)
               .then((response)=>{
                alert("success");
                console.log(response);
                post.picture=response.data["secure_url"];
                setImageURL(response.data["secure_url"]);
               }).catch((error)=>{
                console.log(error);
                alert("Failed to update");
               });
            }
        }
        getImage();
    }, [file])
    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    return (
        <div className="m-36 shadow-md bg-gray-100">
            <img className="w-[100%] h-[50vh] object-cover" src={post.picture || url} alt="post" />
            <div className="flex flex-row mt-3">
                <label htmlFor="fileInput">
                    <IoMdAddCircle color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <input onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" className="flex-1 mr-4 text-2xl" />
                <button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</button>
            </div>
            <input
                className="w-full mt-12 shadow-sm p-2 border-blue-500 border-1"
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            />
        </div>
    )
}

export default Update;