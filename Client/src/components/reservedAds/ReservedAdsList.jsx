import React, { useEffect, useState } from 'react';
import Car from '../cars/Car';
import '../../style/AllReservedAds.css'
import Appliance from '../appliance/Appliance'
import Sort from '../tools/Sort';

import { useParams } from 'react-router-dom';

function ReservedAdsList() {
    let {id} = useParams()
    const user_id = id;
    console.log(user_id);
    const [carArr ,setCarArr] = useState([]);
    const [applianceArr ,setAppliancesArr] = useState([]);
    const [adsArr  , setAdsArr] = useState([]);
    const [sortArr ,setSortArr] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
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
                console.log(data[0]   );
                console.log(data[1]);
                console.log(data[0].concat(data[1]));
                setCarArr(data[0]);
                setAppliancesArr(data[1]);
                setAdsArr(data[0].concat(data[1]));
  
            } catch (e) {
                console.log(e);
            }
        };
        console.log("adsArr" , adsArr);

        fetchData(); // Call the function inside useEffect
    }, []);

    console.log("carArr", carArr, "applianceArr", applianceArr );
    return (
        <>
        <div className='allReservedAdsList'>
            {carArr.map((c) => <Car state={"reservedAds"} key={c.id} car={c} setCarArr={setCarArr} setSortArr={setSortArr} companies={{}} />)}
            {applianceArr.map((a) =>
                <Appliance state={"reservedAds"} key={a.id} appliance={a} setAppliancesArr={setAppliancesArr} setSortArr={setSortArr} companies={{}} />)}
            {carArr == [] && applianceArr == [] && <p>אין מודעות שמורות</p>}
        </div>
        </>


    );
}

export default ReservedAdsList;


{/* <>
{carArr.map((car) => {
})}</>
<>
{applianceArr.map((a) => {
    <Appliance key={a.id} appliance={a} setAppliancesArr={setApplianceArr} setSortArr={setSortArr} companies={{}}/>
})}</> */}