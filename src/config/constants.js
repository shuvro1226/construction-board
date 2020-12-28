// VERO API constants
export const WORKING_ORDERS = 'v3/workingorders';
export const GET_WO_STATUS = 'v3/workingorders/status';
export const GET_WO_BY_STATUS = 'v3/workingorders?filter[status][eq]=';
export const GET_WO_PARAMS = '&filter[plannedDate][gte]=2020-11-01&filter[plannedDate][lte]=2020-12-31&' +
    'partial=uniqueKey,projectNo,workingOrderNo,creationDate,startDate,endDate,plannedDate,status,plannedStartTime,plannedEndTime,shortDescription,taskName,' +
    'longDescription,businessUnit,projectYear,projectName,customerName,projectColor,externalProjectNo,projectYear,resourcesNonHr,totalBookedHours';

// Firebase API constants
// export const GET_WO_STATUS = 'statusList.json';