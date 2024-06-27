import React from 'react';
import Nav from './Nav';
import { useState ,useEffect } from 'react';
import '../style/product.css'

function Furniture() {
    const [cost, setCost] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [severalYearsInUse, setSeveralYearsInUse] = useState('');
    const [statuse, setStatuse] = useState('');
    const [addFurnitureU, setAddFurniture] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.stringify(JSON.parse(sessionStorage.getItem('currentUser')).user_id));
    }} , []);
    async function addFurniture() {
        setAddFurniture(!addFurnitureU)
    }
    console.log("Furniture");
    return (<><Nav />
<div className="home-container">
    
     { currentUser != "" && <button className="add-car-btn" onClick={addFurniture}>
        + Add Furniture
      </button>}
      {addFurnitureU && (
        <div className="add-car-form">
          <h2>Add Furniture Details</h2>
          {/* Furniture details input fields */}
          <input
            type="text"
            id="cost"
            placeholder="Enter cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <input
            type="text"
            id="product_details"
            placeholder="Product Details"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
          <input
            type="text"
            id="several_years_in_use"
            placeholder="Several Years in Use"
            value={severalYearsInUse}
            onChange={(e) => setSeveralYearsInUse(e.target.value)}
          />
          <input
            type="text"
            id="statuse"
            placeholder="Status"
            value={statuse}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button className="submit-car-btn">Submit Furniture</button>
        </div>
      )}
    </div>
    </>
    );
}

export default Furniture;