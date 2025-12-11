import { useState, useEffect } from "react";
import { ArrowUp, X } from "lucide-react";
import { CategoryImg, Container } from "./";
import { airCrafts, endingSoonAuctions, liveAuctions, memorabilia, parts, soldAuctions, upcomingAuctions } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

function CategoryImagesSection({ closePopup }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/v1/admin/categories/public/with-images');

            if (response.data.success) {
                // Use all categories returned from the API
                const apiCategories = response.data.data.filter(cat =>
                    cat.name && cat.image // Ensure both name and image exist
                );

                if (apiCategories.length > 0) {
                    // Map all categories to the required format
                    const formattedCategories = apiCategories.map(cat => ({
                        title: cat.name,
                        image: cat.image,
                        slug: cat.slug,
                        isDynamic: true
                    }));
                    setCategories(formattedCategories);
                }
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchByCategory = (title) => {
        const params = new URLSearchParams();
        params.append('category', title);

        navigate(`/auctions?${params.toString()}`);
        closePopup('category');
    }

    const handleSearchByStatus = (title) => {
        const params = new URLSearchParams();
        params.append('status', title);

        navigate(`/auctions?${params.toString()}`);
        closePopup('category');
    }

    const statusImg = [
        {
            title: 'active',
            image: liveAuctions,
        },
        {
            title: 'sold',
            image: soldAuctions,
        },
        {
            title: 'approved',
            image: upcomingAuctions,
        }
    ];

    // Loading state
    if (loading) {
        return (
            <Container className="w-full min-h-screen h-full fixed inset-0 bg-black/70 z-50 overflow-y-scroll">
                <section className="max-h-[95%] overflow-y-scroll lg:overflow-y-auto w-[90%] self-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 md:p-10 sm:rounded-2xl">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="text-2xl font-semibold mb-7 text-primary">Explore By Categories</h2>
                        <X onClick={() => closePopup('category')} size={30} className="cursor-pointer" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-44 rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
                        ))}
                        <div onClick={() => { navigate('/auctions'); closePopup('category') }} className="group hover:scale-[101%] transition-all duration-200 relative h-44 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 cursor-pointer">
                            <p className="absolute bottom-5 left-5 text-primary">Explore All Auctions</p>
                            <ArrowUp className="absolute group-hover:top-4 group-hover:right-4 transition-all duration-200 top-5 right-5 text-primary rotate-45" strokeWidth={1.5} size={30} />
                        </div>
                    </div>

                    {/* Status section remains static */}
                    <h2 className="text-2xl font-semibold my-7 text-primary">Explore By Status</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {
                            statusImg.map(category => (
                                <CategoryImg key={category.title} title={category.title} image={category.image} link={category.link} onClick={handleSearchByStatus} />
                            ))
                        }
                        <div onClick={() => { navigate('/auctions'); closePopup('category') }} className="group hover:scale-[101%] transition-all duration-200 relative h-44 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 cursor-pointer">
                            <p className="absolute bottom-5 left-5 text-primary">Explore All Auctions</p>
                            <ArrowUp className="absolute group-hover:top-4 group-hover:right-4 transition-all duration-200 top-5 right-5 text-primary rotate-45" strokeWidth={1.5} size={30} />
                        </div>
                    </div>
                </section>
            </Container>
        );
    }

    return (
        <Container className="w-full min-h-screen h-full fixed inset-0 bg-black/70 z-50 overflow-y-scroll">
            <section className="max-h-[95%] overflow-y-scroll lg:overflow-y-auto w-[90%] self-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 md:p-10 sm:rounded-2xl">
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-2xl font-semibold mb-7 text-primary">Explore By Categories</h2>
                    <X onClick={() => closePopup('category')} size={30} className="cursor-pointer" />
                </div>

                {
                    categories && categories.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {
                                categories.map(category => (
                                    <CategoryImg
                                        key={category.title}
                                        title={category.title}
                                        slug={category.slug}
                                        image={category.image}
                                        link={category.link}
                                        onClick={handleSearchByCategory}
                                        // Add error handling for dynamic images
                                        onImageError={(e) => {
                                            if (category.isDynamic) {
                                                e.target.src = getStaticImageForCategory(category.title);
                                            }
                                        }}
                                    />
                                ))
                            }
                            <div onClick={() => { navigate('/auctions'); closePopup('category') }} className="group hover:scale-[101%] transition-all duration-200 relative h-44 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 cursor-pointer">
                                <p className="absolute bottom-5 left-5 text-primary">Explore All Auctions</p>
                                <ArrowUp className="absolute group-hover:top-4 group-hover:right-4 transition-all duration-200 top-5 right-5 text-primary rotate-45" strokeWidth={1.5} size={30} />
                            </div>
                        </div>
                    )
                }

                {/* Status section remains static */}
                <h2 className="text-2xl font-semibold my-7 text-primary">Explore By Status</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {
                        statusImg.map(category => (
                            <CategoryImg key={category.title} title={category.title} image={category.image} link={category.link} onClick={handleSearchByStatus} />
                        ))
                    }
                    <div onClick={() => { navigate('/auctions'); closePopup('category') }} className="group hover:scale-[101%] transition-all duration-200 relative h-44 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 cursor-pointer">
                        <p className="absolute bottom-5 left-5 text-primary">Explore All Auctions</p>
                        <ArrowUp className="absolute group-hover:top-4 group-hover:right-4 transition-all duration-200 top-5 right-5 text-primary rotate-45" strokeWidth={1.5} size={30} />
                    </div>
                </div>
            </section>
        </Container>
    );
}

// Helper function to get fallback image for categories
const getStaticImageForCategory = (categoryTitle) => {
    const categoryMap = {
        'Convertible': '/images/categories/convertible.png',
        'Electric': '/images/categories/electric.png',
        'SUV': '/images/categories/suv.png',
        'Sedan': '/images/categories/sedan.png',
        'Sports': '/images/categories/sports.png',
        'Luxury': '/images/categories/luxury.png',
        'Pickup': '/images/categories/pickup.png',
        'Hatchback': '/images/categories/hatchback.png',
        'Van': '/images/categories/van.png',
        'Aircraft': airCrafts, // Imported from assets
        'Engines & Parts': parts,
        'Memorabilia': memorabilia
    };

    return categoryMap[categoryTitle] || '/images/default-category.jpg';
}

export default CategoryImagesSection;