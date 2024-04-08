import { QueryParams } from "@/types/filter";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ReadonlyURLSearchParams } from "next/navigation";

export const createParams = (par: QueryParams) => {
  if (par.length <= 0) return "";

  let queryString = "?";
  Object.entries(par).forEach(([key, value], index, entries) => {
    queryString += `${key}=${value}`;

    if (index !== entries.length - 1) {
      queryString += "&";
    }
  });

  return queryString;
};

export const getParams = (params: ReadonlyURLSearchParams, entri: string) => {
  return params.get(entri);
};
