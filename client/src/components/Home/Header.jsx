import { Link,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import {MdLogout,MdInfoOutline,MdContactSupport} from "react-icons/md";
import {CgProfile,CgHomeAlt} from "react-icons/cg";

const Header = () => {
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const logout = async () => navigate('/account');       
    return (
        <div className="shadow-sm flex flex-row justify-center border-b-2 border-pink-600 bg-slate-700">
        <header className="text-slate-100 p-2 font-shantell">
        <div className="flex justify-center ">
          <Link to='/' className="px-6 py-2  no-underline flex text-xl items-center justify-center hover:text-pink-600 "><CgHomeAlt/>Home</Link>
          <Link to='/about' className="px-6 py-2  no-underline flex text-xl items-center justify-center hover:text-pink-600"><MdInfoOutline/>About</Link>
          <Link to='/contact' className="px-6 py-2  no-underline flex text-xl items-center justify-center hover:text-pink-600"><MdContactSupport/>Contact</Link>
          <p className="px-6 py-2  no-underline flex text-xl items-center justify-center hover:text-pink-600"><CgProfile/>{account.username}</p>
          <Link to='/account' onClick={() => logout()} className="py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-pink-600 md:border-1 md:rounded-full md:p-2 md:px-4 flex text-xl items-center justify-center" ><MdLogout/>Logout</Link>
        </div>
      </header>
      </div>
    )
}

export default Header;