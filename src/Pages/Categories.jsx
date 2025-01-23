import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/operations/posterDetailsAPI';
import { FocusCards } from "../components/ui/Focus-card";
import { set } from 'mongoose';
import Spinner from '../components/Spinner';
import CategoriesSkeleton from '../components/common/skeleton/CategoriesSkeleton';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await getAllCategories();
                setCategories(res.data);

                const generatedCards = res.data.map((category) => ({
                    title: category.name,
                    categoryId: category._id,
                }));
                setCards(generatedCards);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);
    return (
        <div className='pt-24 p-6 bg-[#000000a2]'>
            {
            loading ? <div className='flex justify-center items-center'><CategoriesSkeleton/></div> : 
             <FocusCards cards={cards} />
            
            }
        </div>
    );
};

export default Categories;
