import React, { useEffect, useState } from 'react';

import styles from "./css/CategoryBlock.module.css"

const CategoryBlock = ({category}) => {
    const [className, setClassName] = useState("nazwa")

    useEffect(() => {        
        setClassName(category.name)
    })

    return (
        <div className={styles.categoryBlock}>
            <p>{className}</p>
        </div>
    );
}

export default CategoryBlock;
