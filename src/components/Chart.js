import React from 'react'
import styled from "styled-components";
import {GiNightSleep} from "react-icons/gi"
import Tooltip from './Tooltip';

export default function Chart({sleep}) {
    console.log(sleep)
    return (
        <DashboardDetailsWrapper>
            <div style ={{
                display: "flex",
                alignItems: "center",
            }}>
                <GiNightSleep/>
                <h1>Sleep Stages</h1>
            </div>
            <Sleep>
                <SleepH3>Light</SleepH3>
            <ChartWrapper>
                {sleep.map((item,index) => (
                     item.val == 4 ? 
                     <>
                     <Tooltip content={item.durationHMS} direction="top">
                     <div className="box-1" style={{
                         width: `${(item.duration) /100000}px`,
                         borderRight: index == sleep.length - 1 ? 'none' : null
                      } }></div> </Tooltip></> : 
                      <>
                      <Tooltip content={item.durationHMS} direction="bottom">
                      <div className = "box-2" style={{
                        width: `${(item.duration) /100000}px`

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
    background-color: whitesmoke;
    /* border: 1px solid black; */
    align-items: center;
    justify-content: center;
    //overflow-x: scroll;

`;

