import React, { useState, useEffect } from 'react';

import '../style/sort.css'

function Sort(props) {
    console.log(props.status);
    const [company, setCompany] = useState('');
    function sortByCompany(company) {
        setCompany(company);
        let sortArr
        if (props.status === "car") {
            sortArr = props.arr.filter(p => p.company == company);
        }
        if (props.status === "appliance") {
            sortArr = props.arr.filter(p => p.model == company);
        }
        props.setArr(sortArr)
        console.log(sortArr);
    }

    function sortByAmount(cost) {
        console.log(cost);
        if(cost === ""){
            props.setArr(props.arr)
        }
        else{
            let sortArr = props.arr.filter(p => parseInt(p.cost) <= parseInt(cost));
            props.setArr(sortArr)
        }
 
    }
    function sortByKm(km) {
        if(km === ""){
            props.setArr(props.arr)
 
        }
        else{
            let sortArr = props.arr.filter(p => parseInt(p.km) <= parseInt(km));
            props.setArr(sortArr)
        }
    }
    const [amount, setAmount] = React.useState(0);

    const handleChange = (event) => {
        const newAmount = parseInt(event.target.value) || 0;
        setAmount(newAmount);
    };
    return (
        <div className='sortMenu' >
            <input className='sortType' type="text" onChange={(e) => sortByAmount(e.target.value)} placeholder="הכנס סכום" />
            <select className='sortType' id="company" value={company} onChange={(e) => sortByCompany(e.target.value)}>
                {props.companies.map((company) => (
                    <option key={company.id}>{company.company}</option>
                ))}
            </select>
            {
                props.status === 'car' &&
                <input className='sortType' type="text" onChange={(e) => sortByKm(e.target.value)} placeholder="הכנס km" />
            }
        </div>

    );
}

export default Sort;