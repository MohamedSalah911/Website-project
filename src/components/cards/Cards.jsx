import './Cards.css';

function Cards() {

    function getProductPic() {
        return "https://via.placeholder.com/190";
    }

    function getPrice() {
        return "90$";
    }

    function addToCart() {
        
    }

    function explore() {
        
    }



    
    return(
        <div className="card">
            <img className="card-image" src={getProductPic()}></img>
            <h2 className="card-title">Shirt</h2>
            <p className="card-text">Shirts {getPrice()}</p>
            <button className='add-to-btn' onClick={addToCart()}>Add to Cart</button>
            <button className='explore-btn' onClick={explore()}>Explore</button>
        </div>
    );
}

export default Cards;