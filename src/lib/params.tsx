import { Filter, QueryParams } from "@/types/filter";
import { ReadonlyURLSearchParams } from "next/navigation";

// export const createParams = (par: QueryParams) => {
//   if (par.length <= 0) return "";
//   // console.log(par);
//   let queryString = "?";
//   Object.entries(par).forEach(([key, value], index, entries) => {
//     if (value) {
//       queryString += `${key}=${value}`;
//     }
//     if (index !== entries.length - 1) {
//       queryString += "&";
//     }
//   });

//   return queryString;
// };

// export const createParams = (filterData: { [key: string]: any }) => {
//   const params: { [key: string]: any } = {};

//   Object.keys(filterData).forEach((key) => {
//     if (filterData[key]) {
//       params[key] =
//         typeof filterData[key] === "string"
//           ? filterData[key]
//           : (filterData[key] as Filter).menu;
//     }
//   });

//   const queryString = Object.entries(params)
//     .filter(([key, value]) => value)
//     .map(([key, value]) => `${key}=${value}`)
//     .join("&");

//   return queryString ? `?${queryString}` : "";
// };
export const createParams = (filterData: { [key: string]: any }) => {
  const params: { [key: string]: any } = {};

  Object.keys(filterData).forEach((key) => {
    if (filterData[key]) {
      // Check the type of the value
      if (typeof filterData[key] === "string") {
        params[key] = filterData[key];
      } else if (Array.isArray(filterData[key])) {
        // If it's an array of Filter objects, extract the 'id' property from each Filter
        params[key] = (filterData[key] as Filter[])
          .sort((a, b) => a.id - b.id)
          .map((filter) => filter.id)
          .join(",");
      } else {
        // If it's a single Filter object, extract the 'menu' property
        params[key] = (filterData[key] as Filter).menu;
      }
    }
  });

  // Construct the query string
  const queryString = Object.entries(params)
    .filter(([key, value]) => value)
    .map(([key, value]) => {
      // Handle the case when the value is an array
      if (Array.isArray(value)) {
        return value.map((val) => `${key}=${val}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");

  return queryString ? `?${queryString}` : "";
};

export const getParams = (params: ReadonlyURLSearchParams, entri: string) => {
  return params.get(entri);
};
