// VERO API constants
export const WORKING_ORDERS = 'v3/workingorders';
export const GET_WO_STATUS = 'v3/workingorders/status';
export const GET_WO_BY_STATUS = 'v3/workingorders?filter[status][eq]=';
export const GET_WO_PARAMS = '&filter[plannedDate][gte]=2020-11-01&filter[plannedDate][lte]=2021-01-31';
export const GET_WO_PARTIALS = '&partial=uniqueKey,projectNo,workingOrderNo,creationDate,startDate,endDate,plannedDate,status,plannedStartTime,plannedEndTime,plannedWorkTime,shortDescription,taskName,plannedWorkloadHours,' +
    'longDescription,businessUnit,projectYear,projectName,customerNo,customerName,projectColor,externalProjectNo,projectYear,resourcesNonHr,totalBookedHours,plannedDate,plannedTravelTime,plannedDuration';

export const GET_PROJECT_DETAILS = 'v1/projects/select/';
export const GET_PROJECT_WO = 'v3/workingorders?filter[projectNo][eq]=';

// Firebase API constants
// export const GET_WO_STATUS = 'statusList.json';