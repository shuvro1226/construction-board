import React from "react";
import { Badge, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ProjectStatus.module.css';

const ProjectStatus = (props) => {
    const woCountByStatus = Object.keys(props.workingOrderByStatus).map(key => {
        if (props.workingOrderByStatus[key]) {
            let statusDetail = props.statusList[key - 1];
            return <Button key={key} variant={statusDetail.scheme.toLowerCase()} size="sm" className={styles.WOCountByStatus}>
                <FontAwesomeIcon icon={statusDetail.icon} /> {statusDetail.displayText} <Badge variant="light">{props.workingOrderByStatus[key]}</Badge>
            </Button>
        }
        return null;  
    });

    const progress = (props.totalFinishedHours * 100) / props.totalBookedHours;
    const projectProgress = <ProgressBar now={Math.floor(progress)} label={`${Math.floor(progress)}%`} />;
    
    return (
        <Row>
            <Col xs="12" className="py-2">
                {woCountByStatus}
            </Col>
            <Col xs="12" className="py-2">
                <p>{props.totalFinishedHours} hours of project tasks finished from {props.totalBookedHours} total hours</p>
                {projectProgress}
            </Col>
        </Row>
    );
}

export default ProjectStatus;