import React, { useEffect } from "react";
import PieStatistics from "../../components/Charts/components/PieStatistics/PieStatistics";
import NationalityChart from "../../components/Charts/components/NationalityChart/NationalityChart";
import FaRoleVenueStatistics from "../../components/FaRoleVenueStatistics/FaRoleVenueStatistics";
import AssignmentsChart from "../../components/Charts/components/AssignmentsChart/AssignmentsChart";
import AgeChart from "../../components/Charts/components/AgeChart/AgeChart";
import { Col, Row, Space } from "antd";
import useStore from "../../services/store";
import { UsersFieldsFetch } from "../../services/fetch";
import Filters from "./components/FIlters/Filters";
import Cards from "./components/Card/Card";
import "./Dashboard.scss";

const Dashboard = () => {
  const setUsersDataFields = useStore(({ setUsersDataFields }) => setUsersDataFields);

  const assignedData = {
    labels: ['Assigned'],
    datasets: [
      {
        label: 'Pre Assigned',
        data: [25],
        backgroundColor: 'orange',
      },
      {
        label: 'Assigned',
        data: [20],
        backgroundColor: 'green',
      },
      {
        label: 'Pending',
        data: [10],
        backgroundColor: 'Blue',
      },
      {
        label: 'Accepted',
        data: [5],
        backgroundColor: 'Purple',
      },
      {
        label: 'To go',
        data: [40],
        backgroundColor: 'Gray',
      },
    ],
  };

  const waitlistData = {
    labels: ['Waitlist'],
    datasets: [
      {
        label: 'Waitlist assigned',
        data: [25],
        backgroundColor: 'orange',
      },
      {
        label: 'Wailist  Offered',
        data: [20],
        backgroundColor: 'green',
      },
      {
        label: 'Wailist Accepted',
        data: [10],
        backgroundColor: 'Blue',
      },
      {
        label: 'To go',
        data: [45],
        backgroundColor: 'Gray',
      },
    ],
  };

  useEffect(() => {
    UsersFieldsFetch(setUsersDataFields);    
  }, []);

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
            <Row gutter={10} justify='space-between' align="middle">
              <Col>
                <AssignmentsChart data={assignedData}/>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Cards title='Total Assigned' value='60%'/>
                  <Cards title='Overal Number' value='12500 OUT OF 21000'/>
                </Space>             
              </Col>
            </Row>     

            <Row gutter={10} justify='space-between' align="middle">
              <Col>
                <AssignmentsChart data={waitlistData}/>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Cards title='Total Waitlisted' value='55%'/>
                  <Cards title='Overal Number' value='2000 OUT OF 5000'/>
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

      <Row justify="center" align="middle" gutter={30} className='card'>
        <Col span={8}>
          <PieStatistics title='Gender Breakdown' />          
        </Col>
        <Col span={16}>
          <NationalityChart />          
        </Col>
      </Row>

      <Row justify="center" align="middle" gutter={30} className='card'>
        <Col span={8}>
          <PieStatistics title='Locals x Internationals'/>          
        </Col>
        <Col span={16}>
          <AgeChart />          
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
