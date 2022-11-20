export function getTimePartOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Goedemorgen";
  } else if (hours < 18) {
    return "Goedemiddag";
  } else {
    return "Goedeavond";
  }
}
