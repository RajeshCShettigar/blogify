import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { API } from '../../service/api';
import { DataContext } from "../../context/DataProvider";

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext)
    const removeComment = async () => {
       await API.deleteComment(comment._id);
       setToggle(prev => !prev);
    }
    return (
        <div className="bg-gray-800 text-slate-100 p-4 mb-2">
            <div className="mb-[5px] flex">
                <h5 className="font-semibold text-base mr-20">{comment.name}</h5>
                <p className="text-sm text-gray-100">{new Date(comment.date).toDateString()}</p>
                { comment.name === account.username && <MdDelete onClick={() => removeComment()} className="ml-auto"/> }
            </div>
            <p className="text-gray-300">{comment.comments}</p>
        </div>
    )
}

export default Comment;