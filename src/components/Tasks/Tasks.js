import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toast from '../UI/Toast/Toast';
import './Tasks.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const TasksList = (props) => {
    
    const workingOrdersList = props.workingOrders[props.statusDetail.status].map((woDetail, index) => {
        
        if (index < 10 && woDetail.longDescription !== "" && woDetail.visible) {
            let taskActionsClasses = ['TaskActions'];
            if (!woDetail.showActions) {
                taskActionsClasses.push('d-none');
            }

            const taskHeader = <Wrapper>
                <strong className="mr-auto">{woDetail.taskName}</strong>
                <small>{moment(woDetail.endDate).fromNow()}</small>
                <div className={taskActionsClasses.join(' ')}>
                    <span className="TaskAction" onClick={() => props.showWorkingOrderEditModal(woDetail)}>
                        <FontAwesomeIcon icon="pencil-alt" />
                    </span>
                </div>
            </Wrapper>;            
            
            return <Toast 
                key={woDetail.uniqueKey} 
                header={taskHeader}
                showActions={() => props.showActions(index, true, props.statusDetail.status)} 
                hideActions={() => props.hideActions(index, false, props.statusDetail.status)}>
                    {woDetail.longDescription}
            </Toast>
        }
        return null;
    });

    return workingOrdersList;
};

export default TasksList;