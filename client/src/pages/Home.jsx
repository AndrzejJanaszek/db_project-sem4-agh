import { useEffect, useState } from 'react';
import categories_json from '../utils/categories.json'
import CategoryBlock from '../components/CategoryBlock';

import "./css/Home.css"

const Home = () => {

    const [categories, setCategories] = useState("")

    useEffect(() => {
        console.log("categories_json.categories", categories_json.categories);

        setCategories(
            categories_json.categories.map(category => {
                console.log("asd");
                return <CategoryBlock category={category} />;
            })
        )
    },[])


    return (
        <main>
            <section className="search_bar-section">
                <h2>Wyszukaj produkty</h2>
                <input type="text" className='search_bar-input'/>
            </section>
            <section className="categoires_container">
                {/* <h2>Albo zobacz przygotowane przez nas kategorie</h2> */}
                {categories}
            </section>
        </main>
    );
}

export default Home;
