import React, { useEffect, useState } from 'react';

import "./css/CategoryBlock.css"

const CategoryBlock = ({category}) => {
    const [className, setClassName] = useState("nazwa")

    useEffect(() => {        
        setClassName(category.name)
    })

    return (
        <div className='category_block'>
            <p>{className}</p>
        </div>
    );
}

export default CategoryBlock;
