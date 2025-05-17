import { useEffect, useState } from 'react';
import categories_json from '../utils/categories.json';
import CategoryBlock from '../components/CategoryBlock';

import styles from "./css/Home.module.css";

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(
            categories_json.categories.map(category => {
                return <CategoryBlock key={category.id} category={category} />;
            })
        );
    }, []);

    return (
        <>
            <section className={styles.searchBarSection}>
                <h2 className={styles.searchBarHeading}>Wyszukaj produkty</h2>
                <input type="text" className={styles.searchBarInput} />
            </section>
            <section className={styles.categoriesContainer}>
                {categories}
            </section>
        </>
    );
};

export default Home;
