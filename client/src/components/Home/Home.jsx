import Categories from "./Categories";
import Posts from "../Blogpost/Posts";

const Home = () => {
  return (
    <div>
      <div className="bg-cover">
        <img src="http://rhombusinfotech.com/blog/wp-content/themes/rhombus/images/blog-banner1.png" alt="bg-cover w-full h-[300px]" />
      </div>
    <div className="bg-slate-800 p-2">
      <div className="grid grid-cols-12 shadow-md h-[100vh]">
        <div className="col-span-2 shadow-lg bg-gray-700">
          <Categories />
        </div>
        <div className="col-span-10 flex flex-row flex-wrap">
          <Posts />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
