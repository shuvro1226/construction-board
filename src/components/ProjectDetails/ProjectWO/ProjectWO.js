import React from "react";
import { Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ProjectWO.module.css';

const ProjectWO = (props) => {
    let badge = null;
    if (props.statusDetail) {
        badge = <Badge variant={props.statusDetail.scheme.toLowerCase()} className={styles.Badge}>
            <FontAwesomeIcon icon={props.statusDetail.icon} /> {props.statusDetail.displayText}
        </Badge>
    }

    let workingOrder = null;
    if (props.statusDetail && props.workingOrder.detailDescription) {
        workingOrder = <Col xs="12" className="py-2">
            <h5>
                {badge}
                {props.workingOrder.detailDescription}
            </h5>
        </Col>
    }
    
    
    return workingOrder;
}

export default ProjectWO;