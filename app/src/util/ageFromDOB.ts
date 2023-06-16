function calculateAge(dateOfBirth: string) {
  const currentDate = new Date();
  const dobParts = dateOfBirth.split("-");
  const dob = new Date(
    Number(dobParts[2]),
    Number(dobParts[1]) - 1,
    Number(dobParts[0])
  );

  let age = currentDate.getFullYear() - dob.getFullYear();
  const monthDiff = currentDate.getMonth() - dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

export default calculateAge;
