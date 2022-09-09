export function getMonths() {
  return [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ]
}

export function getDays() {
  const arr = [...Array(31).keys()].map((n) => (n + 1).toString())
  arr.unshift("")
  return arr
}

export function getYears() {
  const arr = [...Array(100).keys()].map((n) =>
    (new Date().getFullYear() - n).toString()
  )
  arr.unshift("")
  return arr
}
