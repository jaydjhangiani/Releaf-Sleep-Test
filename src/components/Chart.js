import React, { useState } from 'react'
import styled from "styled-components";
import {GiNightSleep} from "react-icons/gi"
import Tooltip from './Tooltip';
import { useEffect } from 'react';

function msToTime(duration) {
    
    var seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60)
    , hours = parseInt((duration/(1000*60*60))%24);
  
   hours = (hours < 10) ? "0" + hours : hours;
   minutes = (minutes < 10) ? "0" + minutes : minutes;
   seconds = (seconds < 10) ? "0" + seconds : seconds;
  
   return hours + "hrs & " + minutes + " minutes" ;
  }

export default function Chart({sleep}) {
    const [scale, setScale] = useState(null)

    Array.prototype.sum = function (prop) {
        var deep = 0
        var light =0 
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            if(this[i]["val"] == 4){
                console.log(this[i]["val"])
            light += this[i][prop]
            }
            else{
                deep += this[i][prop]
            }
        }
        return [deep, light]
    }
    
    console.log(sleep.sum("duration"))

    

    useEffect(() => {
        if(sleep.sum("duration")[0] + sleep.sum("duration")[1] > 36000000 ){
            setScale(0.5);
        }else if (sleep.sum("duration")[0] + sleep.sum("duration")[1] < 18000000){
            setScale(2);
        }else{
            setScale(1);
        }
    },[scale])

    return (
        <DashboardDetailsWrapper>
            <div style ={{
                display: "flex",
                alignItems: "center",
            }}>
                <GiNightSleep/>
                <h1>Sleep Stages</h1>
                
            </div>
            {console.log(sleep[sleep.length - 1].endTime -  sleep[0].startTime)}
            <h3>{msToTime(sleep[sleep.length - 1].endTime -  sleep[0].startTime)}</h3>
            <h4>Light Sleep: {msToTime(sleep.sum("duration")[1])}</h4>
            <h4>Deep Sleep: {msToTime(sleep.sum("duration")[0])}</h4>
            <Sleep>
                <SleepH3>Light</SleepH3>
            <ChartWrapper>
               
                {sleep.map((item,index) => (
                     item.val === 4 ? 
                     <>
                     <Tooltip content={item.durationHMS} val={item.val} direction="top">
                     <div className="box-1" style={{
                         width: `${(item.duration) * scale /100000}px`,
                         borderRight: index === sleep.length - 1 ? 'none' : null
                      } }></div> </Tooltip></> : 
                      <>
                      <Tooltip content={item.durationHMS} val={item.val} direction="bottom">
                      <div className = "box-2" style={{
                        width: `${(item.duration) * scale /100000}px`

                      }}></div>
                      </Tooltip>
                      </>        
                ))}
            </ChartWrapper>
            <SleepH3>Deep</SleepH3>
            </Sleep>
        </DashboardDetailsWrapper>
    )
}

const DashboardDetailsWrapper = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  flex-wrap: wrap;
  border: 1px solid #fff;
  background-color: #fffff9;
  padding: 25px 25px 35px 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  /* align-items: center; */
  /* justify-content: center; */
  grid-gap: 16px; 

  > div > h1{
      font-weight: 400;
      font-size: 1.5rem;
      margin-left: 10px;
  }
`;

const Sleep = styled.div`
`;

const SleepH3 = styled.p`
    font-weight: 600;
    margin: 2px 10px;

`;

const ChartWrapper = styled.div`
    display: flex;
    padding: 10px;
    //margin-right: 20px;
    width: 600px;
    background-color: whitesmoke;
    /* border: 1px solid black; */
    align-items: center;
    justify-content: center;
    //overflow-x: scroll;

`;

