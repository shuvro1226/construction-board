import React from "react";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import ProjectWO from './ProjectWO/ProjectWO';
import ProjectStatus from './ProjectStatus/ProjectStatus';
import Card from '../UI/Card/Card';

const ProjectDetails = (props) => {
    let workingOrderByStatus = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    let workingOrders = null, projectStatus = null, totalBookedHours = 0, totalFinishedHours = 0;
    if (props.workingOrders && props.statusList) {
        workingOrders = props.workingOrders.map(workingOrder => {
            if (workingOrder.status !== 5) { // Skipping deleted status counts
                workingOrderByStatus[workingOrder.status] = workingOrderByStatus[workingOrder.status] + 1;
                if (!workingOrder.totalBookedHours) {
                    // manually calculating totalBookedHours for presentation purpose if no totalbookedhours found
                    const startDate = moment(workingOrder.executionStartDate);
                    const endDate = moment(workingOrder.executionEndDate);
                    const totalDays = endDate.diff(startDate, 'days') + 1;
                    const startTime = moment(workingOrder.startTime,'HH:mm');
                    const endTime = moment(workingOrder.endTime,'HH:mm');
                    const totalHours = endTime.diff(startTime, 'hours');
                    workingOrder.totalBookedHours = (totalDays * totalHours);
                }
                totalBookedHours += workingOrder.totalBookedHours;

                if (workingOrder.status === 4) {
                    totalFinishedHours += workingOrder.totalBookedHours;
                }
            }            
            let statusDetail = props.statusList[workingOrder.status - 1];
            return <ProjectWO 
                key={workingOrder.workingOrderNo} 
                workingOrder={workingOrder} 
                statusDetail={statusDetail} 
            />
        })

        projectStatus = <ProjectStatus 
            statusList={props.statusList}
            workingOrderByStatus={workingOrderByStatus}
            totalBookedHours={totalBookedHours}
            totalFinishedHours={totalFinishedHours}
        />

    }

    return (
        <Row>
            <Col xs="8" className="py-2">
                <h3 className="text-info">{props.project.project_name}</h3>
            </Col>
            <Col xs="4" className="py-2">
                <FontAwesomeIcon icon="calendar-alt" /> Start Date: {moment(props.project.start_date).format('DD.MM.YYYY')}
            </Col>
            <Col xs="4" className="py-2">
                <Card icon="user-tie" title="Customer Details">
                    {props.project.customer_kname}<br/>
                    {props.project.customer_address}<br/>
                    {props.project.customer_postcode + ', ' + props.project.customer_city}
                </Card>                
            </Col>
            <Col xs="8" className="py-2">
                <Card icon="battery-half" title="Working Orders Status">
                    {projectStatus}
                </Card>                
            </Col>
        </Row>
    )
}

export default ProjectDetails;