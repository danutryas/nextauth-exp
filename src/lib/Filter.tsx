export function filterData(
  data: any,
  categoryId: number | null,
  keyword: string | null
) {
  if (!categoryId && !keyword) {
    return data; // Return all data if categoryId is null
  }
  const filteredData: any = {};

  for (const date in data) {
    filteredData[date] = data[date].filter((item: any) => {
      // Filter by categoryId if provided
      if (categoryId && item.categoryId !== categoryId) {
        return false;
      }
      // Filter by keyword match in description if provided
      const include = item.description
        .toLowerCase()
        .includes(keyword?.toLowerCase());
      if (keyword && !include) {
        return false;
      }
      console.log(item.categoryId, categoryId);
      return true;
    });
  }
  return filteredData;
}
