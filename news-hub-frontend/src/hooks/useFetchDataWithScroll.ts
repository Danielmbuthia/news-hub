import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { apiClient } from "../utils/ApiClient";
import { FetchDataParams } from "../types";



const useFetchDataWithScroll = ({ endpoint, queryKey, query }: FetchDataParams): UseInfiniteQueryResult => {
  const fetchDataWithInfiniteScroll = async ({ pageParam = 1 }) =>
    apiClient.get(endpoint, { params: { ...query, page: pageParam } }).then(
      (res) => res.data
    );

  return useInfiniteQuery({
    queryKey: [queryKey, query],
    queryFn: fetchDataWithInfiniteScroll,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.current_page < lastPage?.data?.total
        ? lastPage?.data?.current_page + 1
        : null;
    },
    staleTime: 10 * 60 * 60 * 1000,
  });
};

export default useFetchDataWithScroll;
