import { Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import useStore from '../../../../services/store';
import { userPriorityList } from '../../../../data/userPriorityList';

const { Panel } = Collapse;

const VolunteerData = ({userID}) => {
    const usersData = useStore(({usersData}) => usersData);  
    const [priorityData, setPriorityData] = useState({});

    console.log("usersData", usersData);

    const findPriorityData = (type, arr, userData) => {
        userPriorityList[type].forEach(item => arr.push(userData.find(el => el[0] === item))); 
    }

    useEffect(() => {
        const personalArr = [];
        const experienceArr = [];
        const interviewArr = [];
        const skillsArr = [];
        const leadershipArr = [];
        const languageArr = [];
        const availabilityArr = [];
        const internationalArr = [];
        const ceremoniesArr = [];
        const medicalArr = [];
        const systemArr = [];

        if(typeof usersData.find(data => data.candidate_id === userID) !== 'undefined'){
            const userData = Object.entries(usersData.find(data => data.candidate_id === userID));

            findPriorityData("personal", personalArr, userData);
            findPriorityData("experience", experienceArr, userData);
            findPriorityData("interview", interviewArr, userData);
            findPriorityData("skills", skillsArr, userData);
            findPriorityData("leadership", leadershipArr, userData);
            findPriorityData("language", languageArr, userData);
            findPriorityData("availability", availabilityArr, userData);
            findPriorityData("international", internationalArr, userData);
            findPriorityData("ceremonies", ceremoniesArr, userData);
            findPriorityData("medical", medicalArr, userData);
            findPriorityData("system", systemArr, userData);
        }
        
        setPriorityData({
            ["personal"]: personalArr, 
            ["experience"]: experienceArr, 
            ["interview"]: interviewArr, 
            ["skills"]: skillsArr, 
            ["leadership"]: leadershipArr, 
            ["language"]: languageArr, 
            ["availability"]: availabilityArr, 
            ["international"]: internationalArr, 
            ["ceremonies"]: ceremoniesArr, 
            ["medical"]: medicalArr, 
            ["system"]: systemArr, 
        });
    }, [usersData, userID])

    return (
        <Collapse
            className="overflow-y--auto volunteer--card"
        >
            {
                Object.keys(priorityData).length > 0 && Object.keys(priorityData).map((title, key) => {
                    return (
                        <Panel header={title} key={key}>
                            {
                                priorityData[title].map((item, index) => (
                                    <div key={index} style={{display: "flex"}}>
                                        <p className='bold'>{item[0].replaceAll('_', ' ')}</p>
                                        <pre>: </pre>
                                        <p>{item[1]}</p>
                                    </div>
                                ))
                            }
                        </Panel>
                    )
                })
            }
        </Collapse>    
    );
};

export default VolunteerData;