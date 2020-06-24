export const timesAreValid = (open_hours) =>
    parseInt(open_hours.from.H) < parseInt(open_hours.to.H)
