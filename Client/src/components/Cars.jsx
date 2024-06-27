import React from 'react';
import Nav from './Nav';
import AllCars from './AllCars';
import { useState, useEffect } from 'react';
import '../style/product.css'

function Cars() {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
    }
  }, []);
  console.log(currentUser.user_id);
  const [cost, setCost] = useState('');
  const [km, setKm] = useState('');
  const [statuse, setStatuse] = useState('');
  const [yearOfProduction, setYearOfProduction] = useState('');
  const [severalYearsInUse, setSeveralYearsInUse] = useState('');
  const [company, setCompany] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [addCarDiv, setAddCarDiv] = useState(false);


  // async function addCar(e) {
  //   e.preventDefault();

  //   let car = {
  //     "user_id": currentUser,
  //     "productDetails": productDetails,
  //     "cost": cost,
  //     "km": km,
  //     'statuse': statuse,
  //     "yearOfProduction": yearOfProduction,
  //     "severalYearsInUse": severalYearsInUse,
  //     "company": company, 
  //     "image": selectedFile
  //   }
  //   try {
  //     const response = await fetch("http://localhost:3300/api/cars", {
  //       method: 'POST',
  //       body: JSON.stringify(car),
  //       headers: {
  //         'Content-Type': 'application/json; charset=UTF-8',
  //       },
  //     });
  //     if (!response.ok) {
  //       const errorResponse = await response.json();
  //       throw new Error(errorResponse.error || 'Network response was not ok');
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setAddCarDiv(!addCarDiv);

  //   } catch (err) {
  //     console.log(err);

  //   }

  //   console.log("aadCar added");
  // }


  async function addCar(e) {
    e.preventDefault();
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
      const response = await fetch("http://localhost:3300/api/cars", {
        method: 'POST',
        body: fileData,
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setAddCarDiv(!addCarDiv);

    } catch (err) {
      console.log(err);

    }

    console.log("aadCar added");
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png") {
      alert('Please select a image file');
      return;
    }
    setSelectedImage(file);
  };
  console.log(currentUser != "");

  return (< >
    <Nav />
    <div className="home-container">

      {currentUser != "" && <button className="add-car-btn" onClick={() => setAddCarDiv(!addCarDiv)}> + Add Car</button>}
      {addCarDiv && (
        <form className="add-car-form" onSubmit={addCar}>
          <h2>Add Car Details</h2>
          {/* Car details input fields */}
          <input
            type="text"
            id="cost"
            placeholder="Enter cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
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
          <input
            type="text"
            id="year_of_production"
            placeholder="Year of Production"
            value={yearOfProduction}
            onChange={(e) => setYearOfProduction(e.target.value)}
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
            id="company"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
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
      )}
    </div>
    <AllCars />
  </>

  );
}

export default Cars;