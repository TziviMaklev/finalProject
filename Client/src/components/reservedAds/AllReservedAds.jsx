import React, { useState, useEffect } from 'react';
import ReservedAdsList from './ReservedAdsList';

import '../../style/AllReservedAds.css'


function AllReservedAds({ user_id }) {
    const [adsArr, setAdsArr] = useState([]);
    const [carArr, setCarArr] = useState([]);
    const [applianceArr, setApplianceArr] = useState([])
    const [sortArr, setSortArr] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setApplianceArr([]);
            setCarArr([]);
            try {
                const response = await fetch(`http://localhost:3300/api/user/reservedAds/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setCarArr(data[0][0] == null ? [] : data[0]);
                setApplianceArr(data[1][0] == null ? [] : data[1]);
                setAdsArr(data[0].push(data[1]));

            } catch (e) {
                console.log(e);
            }
        };

        fetchData(); // Call the function inside useEffect
    }, []);

    //         try {
    //             const response = await fetch(`http://localhost:3300/api/user/${id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json; charset=UTF-8',
    //                 },
    //             });
    //             if (!response.ok) {
    //                 const errorResponse = await response.json();
    //                 throw new Error(errorResponse.error || 'Network response was not ok');
    //             }
    //             const data = await response.json();
    //             console.log(data[0][0]);
    //             setSailerDaetails(data[0][0]);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //    
    console.log("AllReservedAds");
    return (
        <ReservedAdsList carArr={carArr} applianceArr={applianceArr} setCarArr={setCarArr} setSortArr={setSortArr} setAppliancesArr={setApplianceArr} companies={{}} />
    );
}

export default AllReservedAds;