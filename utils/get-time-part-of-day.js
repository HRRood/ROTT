export function getTimePartOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Goedenmorgen";
  } else if (hours < 18) {
    return "Goedenmiddag";
  } else {
    return "Goedenavond";
  }
}
