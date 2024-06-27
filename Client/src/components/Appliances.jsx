import React from 'react';
import Nav from './Nav';
import AllAppliances from './AllAppliances';

import { useState, useEffect } from 'react';
import '../style/product.css'

function Appliances() {
    console.log("Appliances");
    const [addAppliancesDiv, setAppliancesDiv] = useState(false);
    const [productDetails, setProductDetails] = useState('');
    const [cost, setCost] = useState('');
    const [severalYearsInUse, setSeveralYearsInUse] = useState('');
    const [statuse, setStatuse] = useState('');
    const [model, setmodel] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.stringify(JSON.parse(sessionStorage.getItem('currentUser')).user_id));
        }
    }, []);

    async function addAppliances(e) {
        e.preventDefault();
        const fileData = new FormData();
        fileData.append('image', selectedImage);
        fileData.append('user_id', `${currentUser}`);
        fileData.append('productDetails', productDetails);
        fileData.append('severalYearsInUse', severalYearsInUse);
        fileData.append('cost', cost);
        fileData.append('statuse', statuse);
        fileData.append('model', model);
        try {
            const response = await fetch("http://localhost:3300/api/appliances", {
                method: 'POST',
                body: fileData,
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }
            const data = await response.json();
            // console.log(data);
            setAppliancesDiv(!addAppliancesDiv);

        } catch (err) {
            console.log("err: " + err);

        }

        console.log("appliances added");


    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.type !== "image/png") {
            alert('Please select a image file');
            return;
        }
        setSelectedImage(file);
    };

    return (
        <>
            <Nav />
            <div className="home-container">
                {currentUser != "" && <button className="add-car-btn" onClick={() => setAppliancesDiv(!addAppliancesDiv)}>
                    + Add Appliance
                </button>}
                {addAppliancesDiv && (
                    <form className="add-car-form" onSubmit={addAppliances}>
                        <h2>Add Appliance Details</h2>
                        {/* Appliance details input fields */}
                        <input
                            type="text"
                            id="product_details"
                            placeholder="Product Details"
                            value={productDetails}
                            onChange={(e) => setProductDetails(e.target.value)}
                        />
                        <input
                            type="text"
                            id="cost"
                            placeholder="Enter cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
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
                            onChange={(e) => setStatuse(e.target.value)}
                        />
                        <input
                            type="text"
                            id="model"
                            placeholder="Model"
                            value={model}
                            onChange={(e) => setmodel(e.target.value)}
                        />
                        <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} />
                        <button className="submit-car-btn" type='submit'>Submit Appliance</button>
                    </form>
                )}
            </div>
            <AllAppliances addAppliancesDiv={addAppliancesDiv}/>
        </>

    );
}

export default Appliances;