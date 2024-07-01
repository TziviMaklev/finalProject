import React from 'react';
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import AppliancesInpute from './AppliancesInpute';
import AllAppliances from './AllAppliances';
import '../../style/product.css'
import '../../style/appliancs.css'

function Appliances() {
    console.log("Appliances");
    const [companies, setCompanies] = useState([]);
    const [addAppliancesDiv, setAppliancesDiv] = useState(false);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('currentUser')) != undefined) {
            setCurrentUser(JSON.stringify(JSON.parse(sessionStorage.getItem('currentUser')).user_id));
        }
    }, []);
    useEffect(() => {
        // קוד לאחזור נתוני חברות רכב מה-DB
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3300/api/companies/appliance', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Network response was not ok');
                }
                else {
                    const data = await response.json();
                    console.log(data);
                    setCompanies(data[0]);
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Nav />
            <div className="home-container">
                <button className="add-car-btn" onClick={() => setAppliancesDiv(!addAppliancesDiv)} disabled ={currentUser === ""}>
                    + Add Appliance
                </button>
                {addAppliancesDiv && (
                    <AppliancesInpute state={"add"} companies={companies} id={0} setShowDiv ={setAppliancesDiv} appliance={{}}></AppliancesInpute>
                )}
            </div>
            <AllAppliances addAppliancesDiv={addAppliancesDiv} companies={companies} />
        </>

    );
}

export default Appliances;