import { useState, useEffect } from 'react';
import { Container } from '../components';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CategoryIconsSection = () => {
    const [categoryIcons, setCategoryIcons] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchByTitle = (categoryName) => {
        if (categoryName === 'Explore') {
            // window.location.href = '/auctions';
            navigate('/auctions');
        } else {
            // window.location.href = `/auctions?category=${encodeURIComponent(categoryName)}`;
            navigate(`/auctions?category=${encodeURIComponent(categoryName)}`);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/api/v1/admin/categories/public/active');
                if (response.data.success) {
                    setCategoryIcons(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                // Fallback to static data if API fails
                setCategoryIcons([
                    // Your original static categories or fallback
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Container className="mb-14">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-7">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="flex flex-col gap- items-center justify-center p-3 rounded-lg shadow-md max-h-28">
                            <div className="bg-gray-200 rounded-lg w-16 h-16 animate-pulse"></div>
                            <div className="bg-gray-200 h-5 w-20 rounded animate-pulse mt-2"></div>
                        </div>
                    ))}
                </div>
            </Container>
        );
    }

    return (
        <Container className="mb-14">
            <div className='mb-8'>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Categories
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-3">
                Choose Your Category — explore a wide range of verified vehicles, all in one place.
            </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-7">
                {
                    categoryIcons.map(categoryIcon => (
                        <div
                            onClick={() => handleSearchByTitle(categoryIcon?.slug || categoryIcon.name)}
                            key={categoryIcon.name}
                            className="flex flex-col gap- items-center justify-center p-3 rounded-lg shadow-md max-h-28 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        >
                            {categoryIcon.type && categoryIcon.type === 'img' ?
                                <img
                                    className="max-h-16"
                                    src={categoryIcon.icon}
                                    alt={categoryIcon.name}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `
                                            <div class="flex flex-col gap- items-center justify-center">
                                                <div class="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                                                    <span class="text-2xl font-bold text-gray-400">${categoryIcon.name.charAt(0)}</span>
                                                </div>
                                                <p class="text-base sm:text-lg font-medium">${categoryIcon.name}</p>
                                            </div>
                                        `;
                                    }}
                                /> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" className="w-16 h-16">
                                    <path fill="currentColor" d="M6.5,1A5.5,5.5,0,1,1,1,6.5,5.51,5.51,0,0,1,6.5,1m0-1A6.5,6.5,0,1,0,13,6.5,6.49,6.49,0,0,0,6.5,0Z" />
                                    <path fill="currentColor" d="M9.7,5.78V7.15a.07.07,0,0,1-.07.07H7.28V9.57a.07.07,0,0,1-.07.07H5.79a.07.07,0,0,1-.07-.07V7.22H3.37a.07.07,0,0,1-.07-.07V5.78a.1.1,0,0,1,.1-.1H5.72V3.33a.07.07,0,0,1,.07-.07H7.21a.07.07,0,0,1,.07.07V5.68H9.6A.1.1,0,0,1,9.7,5.78Z" />
                                </svg>
                            }
                            <p className="text-base sm:text-lg font-medium">{categoryIcon.name}</p>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default CategoryIconsSection;