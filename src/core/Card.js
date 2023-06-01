import React from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

//todo
const isAuthenticated = true;

const Card = ({
  product,
  addtoCart = true,
  removeFromCard = false,
}) => {

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Default price";

  const addToCart = () => {
    if(isAuthenticated){
      addItemToCart(product, ()=>{});
      console.log("added to cart");
    } else {
      console.log("Login please");
    }
  };

  const getAredirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addToCart => {
    return(
      addToCart && (
        <button onClick={addToCart} className="btn btn-block btn-outline-success mt-2 mb-2">
                Add to Cart
            </button>
      )
    )
  };

  const showRemoveFromCart = removeFromCard => {
    return(
      removeFromCard && (
        <button onClick={() => {
          //todo
          removeItemFromCart(product.id, ()=>{});
          console.log("product removed from cart");
        }} className="btn btn-block btn-outline-danger mt-2 mb-2">
          Remove from Cart
        </button>
      )
    )
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product}/>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addToCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
