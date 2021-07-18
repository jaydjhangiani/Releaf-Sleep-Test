import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Dashboard({user}) {
    const [articleId, setArticleId] = useState(''); 
    const [sleepData, setSleepData] = useState([]);

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
    }

    useEffect(() => {
        axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",body, config)
            .then(response => setSleepData(response.data.bucket[0].dataset[0].point))
            .catch(err => console.log(err.response.data.error.message))
    },[])


    console.log(sleepData)


    return (
        <DashboardWrapper>
           <DashboardH1>Sleep Data</DashboardH1>
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

const DashboardH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;
const DashboardP = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const DashboardH1 = styled.h1`
  font-size: 2rem;
  margin-top: 25px;
  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;