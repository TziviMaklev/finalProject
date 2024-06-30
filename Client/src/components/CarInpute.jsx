import React from 'react';
import { useState, useEffect } from 'react';


function CarInpute({ state, companies, id, setShowDiv, car }) {
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
        }
    }, []);

    const [cost, setCost] = useState('');
    const [km, setKm] = useState('');
    const [statuse, setStatuse] = useState('');
    const [yearOfProduction, setYearOfProduction] = useState('');
    const [severalYearsInUse, setSeveralYearsInUse] = useState('');
    const [company, setCompany] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    function req(e) {
        switch (state) {
            case "add":
                addCar()
                break;
            case "update":
                updateCar(id, e)
                break;

            default:
                break;
        }
    }
    async function addCar() {
        const fileData = new FormData();
        fileData.append('image', selectedImage);
        fileData.append('user_id', `${currentUser.user_id}`);
        fileData.append('productDetails', productDetails);
        fileData.append('cost', cost);
        fileData.append('km', km);
        fileData.append('statuse', statuse);
        fileData.append('yearOfProduction', yearOfProduction);
        fileData.append('severalYearsInUse', severalYearsInUse);
        fileData.append('company', company);

        // Add other data as needed
        try {
            const response = await fetch(`http://localhost:3300/api/cars`, {
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
            console.log(err);

        }

        console.log("aadCar added");
    }
    async function updateCar(id, e) {
        const fileData = new FormData();
        fileData.append('image', selectedImage);
        fileData.append('user_id', car.user_id);
        fileData.append('productDetails', productDetails === "" ? car.product_details : productDetails);
        fileData.append('cost', cost === "" ? car.cost : cost);
        fileData.append('km', km === "" ? car.km : km);
        fileData.append('statuse', statuse === "" ? car.statuse : statuse);
        fileData.append('yearOfProduction', car.year_of_production);
        fileData.append('severalYearsInUse', severalYearsInUse === "" ? car.several_years_in_use : severalYearsInUse);
        fileData.append('company', car.company);
        fileData.append('product_type', car.product_type);

        try {
            const response = await fetch(`http://localhost:3300/api/cars/${id}`, {
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
            console.log(error);
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
        <form className="add-car-form" onSubmit={e => { req(e) }}>
            <h2>{state} Car Details</h2>
            {/* Car details input fields */}
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
                id="km"
                placeholder="km"
                value={km}
                onChange={(e) => setKm(e.target.value)}
            />
            <input
                type="text"
                id="statuse"
                placeholder="Status"
                value={statuse}
                onChange={(e) => setStatuse(e.target.value)}
            />
            {state != "update" && <input
                type="text"
                id="year_of_production"
                placeholder="Year of Production"
                value={yearOfProduction}
                onChange={(e) => setYearOfProduction(e.target.value)}
                pattern="[0-9]+" // מותיר רק מספרים (כולל 0)
            />}
            <input
                type="text"
                id="several_years_in_use"
                placeholder="Several Years in Use"
                value={severalYearsInUse}
                onChange={(e) => setSeveralYearsInUse(e.target.value)}
                pattern="[0-9]+" // מותיר רק מספרים (כולל 0)
            />
            {state != "update" && <select className='selectCompany' id="company" value={company} onChange={(e) => setCompany(e.target.value)}>
                {companies.map((company) => (
                    <option key={company.id}>{company.company}</option>
                ))}
            </select>}
            <input
                type="text"
                id="product_details"
                placeholder="Product Details"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
            />
            <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} />
            <button className="submit-car-btn" type='submit'>Submit Car</button>
        </form>

    );
}

export default CarInpute;