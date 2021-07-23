import React from 'react'

function Content({props}) {
    return (
        <div
         style={{
            background: 'white',
            padding: '0px 10px',
            borderRadius: '5px',
            width: '100%'
        }}
        >
            <div>
               <p style={{
                   width: '102px' 
               }}> {`${props.substr(0,2)} hr & ${props.substr(3,2)} mins.`} </p></div>
            <div>{props}</div>
            <div>{props}</div>

        </div>
    )
}

export default Content
