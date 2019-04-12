import moment from "moment";

export const datetimeSaveFormat = "YYYY-MM-DD HH:mm:ss";
export const datepickerDisplayFormat = "yyyy-MM-dd h:mm aa";
export const datepickerDisplayFormatEquivalentForDatetime = "YYYY-MM-DD h:mm a";

export const filterSingleScheduleDates = schedule => {
  schedule["starts_at"] = moment(schedule.starts_at).toDate();
  schedule["ends_at"] = moment(schedule.ends_at).toDate();
  // converting starts_at to start
  schedule["start"] = schedule.starts_at;
  // converting ends_at to end
  schedule["end"] = schedule.ends_at;
  return schedule;
};

export const scheduleDate = datetime => {
  return moment(datetime).format(datepickerDisplayFormatEquivalentForDatetime);
};

export const invitationStatus = flag => {
  const statuses = {
    0: "Pending",
    1: "Accepted",
    2: "Rejected"
  };

  if (statuses[flag]) {
    return statuses[flag];
  }

  // default status
  return statuses[0];
};

export const invitationNotified = flag => {
  const statuses = {
    0: "No",
    1: "Yes"
  };

  if (statuses[flag]) {
    return statuses[flag];
  }

  // default status
  return statuses[0];
};
