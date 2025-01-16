import React, { useState, useEffect } from 'react';


const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async (filter = '') => {
    const response = await fetch(`http://localhost:2200/api/category${filter}`);
    const data = await response.json();
    setCategories(data)
  }
 useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.length === 0 ? (
          <li>No categories found</li>
        ) : (
          categories.map((category) => <li key={category.id}>{category.name}</li>)
        )}
      </ul>
    </div>
  );
};

export default CategoryFilter;
