import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';
import { FaPlus } from 'react-icons/fa';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState('');
     const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
    return (
        <>
           <div className="flex flex-col items-start space-y-4 bg-gray-700">
      <Link to={`/create?category=${category || ''}`} className="text-decoration-none">
      <button className="flex items-center justify-center m-5 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md space-x-2 w-full">
          <FaPlus size={18} />
          Create Blog
        </button>
      </Link>

      <table className="rounded-lg w-full">
        <thead>
          <tr className="bg-pink-500 text-white">
            <th className="p-4">
                <Link to="/">All Categories</Link></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td
                className={`p-4 text-slate-300 ${
                  selectedCategory === category.type ? 'bg-gray-800' : ''
                }`}
                onClick={() => handleCategoryClick(category.type)}
              >
                <Link
                  to={`/?category=${category.type}`}
                  className={`text-decoration-none ${
                    selectedCategory === category.type ? 'text-blue-500' : ''
                  }`}
                >
                  {category.type}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    );
};

export default Categories;
