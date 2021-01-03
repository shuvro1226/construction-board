import React from "react";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import WorkingOrder from './ProjectWO/ProjectWO';
import Card from '../UI/Card/Card';

const ProjectDetails = (props) => {
    let workingOrders = null;
    if (props.workingOrders && props.statusList) {
        workingOrders = props.workingOrders.map(workingOrder => {
            let statusDetail = props.statusList[workingOrder.status - 1];
            return <WorkingOrder 
                key={workingOrder.workingOrderNo} 
                workingOrder={workingOrder} 
                statusDetail={statusDetail} 
            />
        })
    }

    return (
        <Row>
            <Col xs="8" className="py-2">
                <h3 className="text-info">{props.project.project_name}</h3>
            </Col>
            <Col xs="4" className="py-2">
                <FontAwesomeIcon icon="calendar-alt" /> {moment(props.project.start_date).format('DD.MM.YYYY')}
            </Col>
            <Col xs="4" className="py-2">
                <Card icon="user-tie" title="Customer Details">
                    {props.project.customer_kname}<br/>
                    {props.project.customer_address}<br/>
                    {props.project.customer_postcode + ', ' + props.project.customer_city}
                </Card>                
            </Col>
            <Col xs="12" className="py-4">
                <Card icon="tasks" title="Working Orders for this project">
                    {workingOrders}
                </Card>                     
            </Col>
        </Row>
    )
}

export default ProjectDetails;