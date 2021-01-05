// VERO API constants
export const WORKING_ORDERS = 'v3/workingorders';
export const GET_WO_STATUS = 'v3/workingorders/status';
export const GET_WO_BY_STATUS = 'v3/workingorders?filter[status][eq]=';
export const GET_WO_FILTERS = '&filter[plannedDate][gte]=2020-11-01&filter[plannedDate][lte]=2021-01-31';
export const GET_WO_PARTIALS = '&partial=uniqueKey,projectNo,workingOrderNo,startDate,endDate,plannedDate,status,shortDescription,taskName,plannedWorkloadHours,' +
    'longDescription,projectYear,projectName,customerNo,customerName,totalBookedHours,plannedStartTime,plannedEndTime,plannedWorkTime,plannedTravelTime,plannedDuration';
export const GET_WO_ALIAS = '&alias=plannedTravelTime:travelTime,plannedDuration:duration,plannedWorkloadHours:workingHours,plannedEndTime:endTime,plannedStartTime:startTime,' +
    'endDate:executionEndDate,startDate:executionStartDate,longDescription:detailDescription,shortDescription:description,taskName:taskSelection';
export const GET_WO_PARAMS = GET_WO_FILTERS + GET_WO_PARTIALS + GET_WO_ALIAS;
export const GET_WO_TASKS = 'v1/tasks/select';

export const GET_PROJECT_DETAILS = 'v1/projects/select/';
export const GET_PROJECT_WO = 'v3/workingorders?filter[projectNo][eq]=';

// Firebase API constants
// export const GET_WO_STATUS = 'statusList.json';