import React from 'react';
import { useState, useEffect } from 'react';


function AppliancesInpute({ state, companies, id, setShowDiv, appliance }) {
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
        }
    }, []);

    console.log("AppliancesInpute");
    const [productDetails, setProductDetails] = useState('');
    const [cost, setCost] = useState('');
    const [severalYearsInUse, setSeveralYearsInUse] = useState('');
    const [statuse, setStatuse] = useState('');
    const [model, setmodel] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    function req(e) {
        switch (state) {
            case "add":
                addAppliances(e)
                break;
            case "update":
                updatAppliances(id, e)
                break;
            default:
                break;
        }
    }
    async function addAppliances(e) {
        e.preventDefault();
        const fileData = new FormData();
        fileData.append('image', selectedImage);
        fileData.append('user_id', `${currentUser.user_id}`);
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
            console.log(data);
            setShowDiv(false);


        } catch (err) {
            console.log("err: " + err);

        }
        console.log("appliances added");
    }
    async function updatAppliances(id, e) {
        // e.preventDefault();
        const fileData = new FormData();
        fileData.append('image', selectedImage);
        fileData.append('user_id', `${currentUser.user_id}`);
        fileData.append('productDetails', productDetails);
        fileData.append('severalYearsInUse', severalYearsInUse);
        fileData.append('cost', cost);
        fileData.append('statuse', statuse);
        fileData.append('model', appliance.model);
        fileData.append("product_type" ,  appliance.product_type);
        try {
            const response = await fetch(`http://localhost:3300/api/appliances/${id}`, {
                method: 'PUT',
                body: fileData,
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setShowDiv(false);
            
        } catch (error) {
            
        }
       
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
        <div>
            <form className="add-car-form" onSubmit={e => { req(e) }}>
                <h2>{state} Appliance Details</h2>
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
                    pattern="[0-9]+" // מותיר רק מספרים (כולל 0)
                />
                <input
                    type="text"
                    id="several_years_in_use"
                    placeholder="Several Years in Use"
                    value={severalYearsInUse}
                    onChange={(e) => setSeveralYearsInUse(e.target.value)}
                    pattern="[0-9]+" // מותיר רק מספרים (כולל 0)

                />
                <input
                    type="text"
                    id="statuse"
                    placeholder="Status"
                    value={statuse}
                    onChange={(e) => setStatuse(e.target.value)}
                />
               { state!="update" &&<select className='selectCompany' id="company" value={model} onChange={(e) => setmodel(e.target.value)}>
                    {companies.map((company) => (
                        <option key={company.id}>{company.company}</option>
                    ))}
                </select>}
                <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} />
                <button className="submit-car-btn" type='submit'>Submit Appliance</button>
            </form>
        </div>

    );
}

export default AppliancesInpute;