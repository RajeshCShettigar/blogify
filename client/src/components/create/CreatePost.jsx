import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [post, setPost] = useState({
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
  });
  const [file, setFile] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const { account } = useContext(DataContext);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const url =
    previewUrl ||
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'blogapp');
        data.append('cloud_name', 'dsajqm6yg');
        data.append('api_key', '672165449324335');
        data.append('api_secret', 'KeWR17HCPxbyRsvHzdSSx_sEHyQ');
        await axios
          .post('https://api.cloudinary.com/v1_1/dsajqm6yg/image/upload', data)
          .then((response) => {
            alert('success');
            console.log(response.data);
            const imageUrl = response.data.secure_url;
            setPost((prevPost) => ({
              ...prevPost,
              picture: imageUrl
            }));
          })
          .catch((error) => {
            alert('axios network error');
            console.log(error);
          });
      }
    };
    getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
  }, [file]);

  const savePost = async () => {
    console.log(post.picture);
    await API.createPost(post);
    navigate('/');
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-8 mx-8">
      <img src={url} alt="post" className="w-screen h-96 object-cover" />
      <div className="mt-10 flex flex-row">
        <label htmlFor="fileInput" className="cursor-pointer">
          <GrAddCircle className="h-8 w-8" />
        </label>
        <input type="file" id="fileInput" className="hidden" onChange={handleImageChange} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="flex-1 ml-5 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
      </div>

      <textarea
        rows={5}
        placeholder="Tell your story..."
        name="description"
        className="w-full border border-gray-300 mt-5 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleChange}
      />
      <div className="flex justify-center">
      <button
          onClick={savePost}
          className="mx-auto px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          Publish
        </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default CreatePost;
