import Categories from "./Categories";
import Posts from "../Blogpost/Posts";

const Home = () => {
  return (
    <div className="container px-4 pt-16 bg-slate-800">
      <div className="grid grid-cols-12 gap-4 shadow-md h-[100vh]">
        <div className="col-span-2 shadow-lg bg-gray-700">
          <Categories />
        </div>
        <div className="col-span-10 flex flex-row flex-wrap">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
