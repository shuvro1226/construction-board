// VERO API constants
// export const API_BACKEND = 'vero';
export const WORKING_ORDERS = 'v3/workingorders';
export const GET_WO_STATUS = 'v3/workingorders/status';
export const GET_WO_BY_STATUS = 'v3/workingorders?filter[status][eq]=';
export const GET_WO_PARTIALS = '&partial=uniqueKey,projectNo,workingOrderNo,startDate,endDate,plannedDate,status,shortDescription,taskName,plannedWorkloadHours,' +
    'longDescription,projectYear,projectName,customerNo,customerName,totalBookedHours,plannedStartTime,plannedEndTime,plannedWorkTime,plannedTravelTime,plannedDuration';
export const GET_WO_ALIAS = '&alias=plannedTravelTime:travelTime,plannedDuration:duration,plannedWorkloadHours:workingHours,plannedEndTime:endTime,plannedStartTime:startTime,' +
    'endDate:executionEndDate,startDate:executionStartDate,longDescription:detailDescription,shortDescription:description,taskName:taskSelection';
export const GET_WO_PARAMS = GET_WO_PARTIALS + GET_WO_ALIAS;
export const GET_WO_TASKS = 'v1/tasks/select';

export const GET_PROJECT_DETAILS = 'v1/projects/select/';
export const GET_PROJECT_WO = 'v3/workingorders?filter[projectNo][eq]=';

export const GET_PROJECTS = 'v3/projects';
export const GET_PROJECTS_BY_STATUS = GET_PROJECTS + '?filter[projectStatus][in]=';
export const GET_PROJECTS_PARTIALS = '&partial=parentId,projectValidEndDate,projectValidStartDate,fiscalYearKey,customerDisplayName,customerName,colorCode,externalProjectNo,projectName,commercialContactKey,' +
    'technicalContactKey,customerNo,isFrameContract,projectNo,calcOrderSum,workingOrderFilesCount,projectFilesCount,totalBookedHours,hasSubProjects,projectStatus,labelIds';
export const GET_PROJECT_STATUSES = 'v3/projects/statuses';


// Firebase API constants
// export const API_BACKEND = 'firebase';
// export const GET_WO_STATUS = 'statusList.json';
// export const WORKING_ORDERS = 'workingOrders.json';
// export const GET_WO_BY_STATUS = WORKING_ORDERS + '?orderBy="status"&equalTo=';
// export const GET_WO_PARTIALS = '';
// export const GET_WO_ALIAS = '';
// export const GET_WO_PARAMS = '';
// export const GET_WO_TASKS = 'tasks.json';

// export const GET_PROJECT_DETAILS = 'projects.json?orderBy="ktr"&equalTo=';
// export const GET_PROJECT_WO = WORKING_ORDERS + '?orderBy="projectNo"&equalTo=';