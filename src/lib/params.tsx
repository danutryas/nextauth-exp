import { Filter, QueryParams } from "@/types/filter";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
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

export const createParams = (filterData: { [key: string]: any }) => {
  const params: { [key: string]: any } = {};

  Object.keys(filterData).forEach((key) => {
    if (filterData[key]) {
      params[key] =
        typeof filterData[key] === "string"
          ? filterData[key]
          : (filterData[key] as Filter).menu;
    }
  });

  const queryString = Object.entries(params)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return queryString ? `?${queryString}` : "";
};

export const getParams = (params: ReadonlyURLSearchParams, entri: string) => {
  return params.get(entri);
};
