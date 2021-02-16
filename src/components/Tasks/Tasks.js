import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from './Task/Task';
import './Tasks.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const TasksList = (props) => {
    const maxWOInBoard = props.maxWOInBoard ? props.maxWOInBoard: 10;
    const workingOrdersList = props.workingOrders.map((woDetail, index) => {
        
        if (index < maxWOInBoard && (woDetail.detailDescription !== "" || woDetail.description !== "") && woDetail.customerName !== "" && woDetail.visible) {
            let taskActionsClasses = ['TaskActions'];
            if (!woDetail.showActions) {
                taskActionsClasses.push('d-none');
            }

            const taskHeader = <Wrapper>
                <strong className="mr-auto">{woDetail.customerName}</strong>
                <small>{moment(woDetail.plannedDate).fromNow()}</small>
                <div className={taskActionsClasses.join(' ')}>
                    <span className="TaskAction">
                        <FontAwesomeIcon icon="pencil-alt" />
                    </span>
                </div>
            </Wrapper>;            
            
            return <Task 
                key={woDetail.uniqueKey} 
                index={index}
                uniqueKey={woDetail.uniqueKey}
                header={taskHeader}
                headerIcon="user-tie"
                toastAction={() => props.showWorkingOrderEditModal(woDetail)}
                showActions={() => props.showActions(index, true, props.statusDetail.status)} 
                hideActions={() => props.hideActions(index, false, props.statusDetail.status)}
            >
                    <span>
                        <b>Project:</b> {woDetail.projectName}
                    </span>
                    <span>
                        <b>Task:</b> {woDetail.detailDescription ? woDetail.detailDescription: woDetail.description}
                    </span>
            </Task>;
        }
        return null;
    });

    return workingOrdersList;
};

export default TasksList;