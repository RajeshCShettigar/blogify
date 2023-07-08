import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category : category || '' });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);
    return (
        <>
            {
                posts?.length ? posts.map((post) => (
                    <div className="lg:w-1/4 sm:w-1/3 w-full" key={post._id}>
                        <Link to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </div>
                )) : <div className="text-slate-300 mx-8 my-10 text-lg">
                        No data is available for selected category
                    </div>
            }
        </>
    )
}

export default Posts;