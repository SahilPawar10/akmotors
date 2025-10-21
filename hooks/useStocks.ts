import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { fetchStocks, selectStocks } from "@/slices/stockSlice";

export const useStocks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: stocks, fetchStatus, error } = useSelector(selectStocks);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchStocks());
    }
  }, [dispatch, fetchStatus]);

  // Helper to refetch manually (after adding/updating/deleting)
  const refetchStocks = () => {
    dispatch(fetchStocks());
  };

  return { stocks, fetchStatus, error, refetchStocks };
};
