import React, { useEffect } from "react";
import PieStatistics from "../../components/Charts/components/PieStatistics/PieStatistics";
import NationalityChart from "../../components/Charts/components/NationalityChart/NationalityChart";
import FaRoleVenueStatistics from "../../components/FaRoleVenueStatistics/FaRoleVenueStatistics";
import AssignmentsChart from "../../components/Charts/components/AssignmentsChart/AssignmentsChart";
import AgeChart from "../../components/Charts/components/AgeChart/AgeChart";
import { Col, Row, Space, Empty } from "antd";
import useStore from "../../services/store";
import { DashboardGet, UsersFieldsFetch } from "../../services/fetch";
import Filters from "./components/FIlters/Filters";
import Cards from "./components/Card/Card";
import "./Dashboard.scss";

const Dashboard = () => {
  const setUsersDataFields = useStore(({ setUsersDataFields }) => setUsersDataFields);
  const setDashboardData = useStore(({ setDashboardData }) => setDashboardData);
  const dashboardData = useStore(({ dashboardData }) => dashboardData);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const volunteerDemographics = useStore(({ volunteerDemographics }) => volunteerDemographics);

  useEffect(() => {
    UsersFieldsFetch(setUsersDataFields);    
    DashboardGet(setDashboardData, setDataLoading)
  }, []);

  const assignedData = {
    labels: ['Assigned'],
    datasets: [
      {
        label: 'Pre Assigned',
        data: [dashboardData.preAssigned],
        backgroundColor: 'orange',
      },
      {
        label: 'Assigned',
        data: [dashboardData.assigned],
        backgroundColor: 'green',
      },
      {
        label: 'Pending',
        data: [dashboardData.pending],
        backgroundColor: 'Blue',
      },
      {
        label: 'Accepted',
        data: [dashboardData.accepted],
        backgroundColor: 'Purple',
      },
      {
        label: 'To go',
        data: [dashboardData.assignedRest],
        backgroundColor: 'Gray',
      },
    ],
  };

  const waitlistData = {
    labels: ['Waitlist'],
    datasets: [
      {
        label: 'Waitlist assigned',
        data: [dashboardData.waitlistAssigned],
        backgroundColor: 'orange',
      },
      {
        label: 'Wailist  Offered',
        data: [dashboardData.waitlistOffered],
        backgroundColor: 'green',
      },
      {
        label: 'Wailist Accepted',
        data: [dashboardData.waitlistAccepted],
        backgroundColor: 'Blue',
      },
      {
        label: 'To go',
        data: [dashboardData.waitlistRest],
        backgroundColor: 'Gray',
      },
    ],
  };

  return (
    <div className="dashboard">
      <Row justify="center">OVERALL ASSIGNMENTS</Row>
      <Row justify='space-between' align='top' gutter={20}>
        <Col span={12}>
          <h3>Filters</h3>
          <Filters />  
        </Col>
        
        <Col span={12}>        
          <Space className="card" direction="vertical" style={{ width: "100%" }}> 
            <Row justify='space-between' align="middle">
              <Col>
                <AssignmentsChart data={assignedData}/>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Cards title='Total Assigned' value={dashboardData.totalAssigned}/>
                  <Cards title='Overal Number' value1={dashboardData.overallAssigned} value2={dashboardData.overallAssigneeDemand}/>
                </Space>             
              </Col>
            </Row>     

            <Row justify='space-between' align="middle">
              <Col>
                <AssignmentsChart data={waitlistData}/>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Cards title='Total Waitlisted' value={dashboardData.totalWaitlisted}/>
                  <Cards title='Overal Number' value1={dashboardData.overallWaitlisted} value2={dashboardData.overallWaitlistDemand}/>
                </Space>                            
              </Col>
            </Row>  
          </Space>
        </Col>
      </Row>
      
      <Row justify="center">OVERALL ASSIGNMENTS DETAILS</Row>    
      <FaRoleVenueStatistics />

      <Row justify="center">VOLUNTEER DEMOGRAPHICS</Row>
      <h3>Filters</h3>
      <Filters showUserData={true}/>   

      {Object.keys(volunteerDemographics).length>0 ? null: <p style={{color: 'red'}}>*Select filters</p> }   

      <Row justify="center" align="middle" gutter={30} className='card'>
        {
          Object.keys(volunteerDemographics).length > 0 
          ?
          <>
            <Col span={8}>
            <PieStatistics 
              title='Gender Breakdown' 
              label={['Male', 'Female']}
              data={[volunteerDemographics.overallMales, volunteerDemographics.overallFemales]}
            />          
            </Col>
            <Col span={16}>
              <NationalityChart />          
            </Col>
          </>
          :
          <Empty />
        }
        
      </Row>

        {
          Object.keys(volunteerDemographics).length > 0 
          ?
           <>
            <Row justify="center" align="middle" gutter={30} className='card'>
            <Col span={8}>
              <PieStatistics 
                title='Locals x Internationals'
                label={['Locals', 'Internationals']}
                data={[volunteerDemographics.overallLocals, volunteerDemographics.overallInternationals]}
              />          
              </Col>
              <Col span={16}>
                <AgeChart />          
              </Col>
            </Row>
           </>
           :
           null
        }
    </div>
  );
};

export default Dashboard;
