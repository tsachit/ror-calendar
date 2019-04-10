export const datetimeSaveFormat = "YYYY-MM-DD HH:mm:ss";
export const datepickerDisplayFormat = "yyyy-MM-dd h:mm aa";

export const filterSingleScheduleDates = schedule => {
  // converting starts_at to start
  schedule["start"] = schedule.starts_at;
  delete schedule.starts_at;
  // converting ends_at to end
  schedule["end"] = schedule.ends_at;
  delete schedule.ends_at;
  return schedule;
};
