import React from 'react';
import Car from '../cars/Car';
import Appliance from '../appliance/Appliance';
import '../../style/AllReservedAds.css'


function ReservedAdsList({ carArr, applianceArr, setCarArr, setSortArr, setAppliancesArr, companies }) {
    console.log("carArr", carArr, "applianceArr", applianceArr );
    return (
        <div className='allReservedAdsList'>
            {carArr.map((c) => <Car state={"reservedAds"} key={c.id} car={c} setCarArr={setCarArr} setSortArr={setSortArr} companies={{}} />)}
            {applianceArr.map((a) =>
                <Appliance state={"reservedAds"} key={a.id} appliance={a} setAppliancesArr={setAppliancesArr} setSortArr={setSortArr} companies={companies} />)}
            {carArr == [] && applianceArr == [] && <p>אין מודעות שמורות</p>}
        </div>


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