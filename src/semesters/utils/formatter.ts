export const formatSemesterYear = (value: string) => {
  const [year, semester] = value.split('-');
  return semester === '1' ? `${year} 상반기` : `${year} 하반기`;
};
