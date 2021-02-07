import React from "react";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
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
    let projectStatus = null, totalBookedHours = 0, totalFinishedHours = 0;
    if (props.workingOrders && props.statusList) {
        props.workingOrders.forEach(workingOrder => {
            if (workingOrder.status.toString() !== "5") {
                workingOrderByStatus[workingOrder.status] = workingOrderByStatus[workingOrder.status] + 1;
            }
            if (["3","4"].includes(workingOrder.status.toString())) { // Skipping deleted/recorded/pre-planned status counts
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
        });

        if (props.workingOrders.length > 0) {
            projectStatus = <ProjectStatus 
                statusList={props.statusList}
                workingOrderByStatus={workingOrderByStatus}
                totalBookedHours={totalBookedHours}
                totalFinishedHours={totalFinishedHours}
            />
        } else {
            projectStatus = <p>No working orders available for this project!</p>
        }       

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