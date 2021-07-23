import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "./Chart";
import axios from "axios";

function msToTime(duration) {
  duration = duration / 1000000; 
  var milliseconds = parseInt((duration%1000)/100)
  , seconds = parseInt((duration/1000)%60)
  , minutes = parseInt((duration/(1000*60))%60)
  , hours = parseInt((duration/(1000*60*60))%24);

 hours = (hours < 10) ? "0" + hours : hours;
 minutes = (minutes < 10) ? "0" + minutes : minutes;
 seconds = (seconds < 10) ? "0" + seconds : seconds;

 return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export default function Dashboard({user}) {
    const [sleepData, setSleepData] = useState([]);
    const [sleep, setSleep] = useState([])
    const timeRightNow = Date.now()
    // endTimeMillis: timeRightNow,
    // startTimeMillis: timeRightNow - 86400000

    const config = {
        headers:{
            "Authorization":`Bearer ${user.accessToken}`
        }
    }

    const body = {
        aggregateBy: [
         {
           dataTypeName: "com.google.sleep.segment"
         },
       ],
       endTimeMillis: 1626584659836,
       startTimeMillis:1626498259836 
      // endTimeMillis: timeRightNow - 86400000,
      // startTimeMillis: timeRightNow - 86400000 - 86400000
    }

    useEffect(() => {
        axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",body, config)
            .then(response => {
              setSleepData(response.data.bucket[0].dataset[0].point)
            })
            .catch(err => console.log(err.response.data.error.message))
    },[])

    useEffect(() => {
      if(sleepData.length > 0){
        setSleep(
          sleepData.map((item,index) => ({
            index,
            startTime: item.startTimeNanos,
            endTime: item.endTimeNanos,
            val: item?.value[0].intVal,
            duration: (item.endTimeNanos - item.startTimeNanos )/1000000,
            durationHMS: msToTime(item.endTimeNanos - item.startTimeNanos)
          })
        ))
        }
    },[sleepData])


    return (
        <DashboardWrapper>
           {sleep.length > 0 ? <Chart sleep={sleep} /> : <h1>No Data</h1>}
        </DashboardWrapper>
    )

}

const DashboardWrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px;
`;

// const DashboardH2 = styled.h2`
//   font-size: 1rem;
//   margin-bottom: 10px;
// `;
// const DashboardP = styled.p`
//   font-size: 1rem;
//   text-align: center;
// `;

// const DashboardH1 = styled.h1`
//   font-size: 2rem;
//   margin-top: 25px;
//   @media screen and (max-width: 480px) {
//     font-size: 1.5rem;
//   }
// `;