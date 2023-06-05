import React from 'react'

const ImageHelper = ({product})=>{

    const imageURL = product ? product.image 
    : `https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80`

    return(
        <div className="rounded border border-success p-2">
            <img src={imageURL + "?raw=true"} 
            style={{maxHeight:"100%", maxWidth:"100%"}}
            className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;