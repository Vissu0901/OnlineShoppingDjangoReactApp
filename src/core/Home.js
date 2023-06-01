import React, {useState, useEffect} from 'react';
import { getProducts } from './helper/coreapicalls';
import Base from './Base';
import "../styles.css"
import Card from './Card';

export default function Home(){

    const [products, setProducts] = useState(null);
    const [error, setErrors] = useState(false);

    const loadAllProducts = ()=>{
        getProducts()
        .then(data =>{
            if(data.error){
                setErrors(data.error);
                console.log(error);
            } else {
                setProducts(data);
            }
        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    if(products == null){
        return(
            <div className='text-white'>loading...</div>
        )
    }

    return (
        <Base title='Home Page' description='Welcome to store'>
            <h1>Home Component</h1>
            <div className="row">
                {products.map((product, index)=>{
                    return (
                        <div key={index} className='col-4 mb-4'>
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    );
}