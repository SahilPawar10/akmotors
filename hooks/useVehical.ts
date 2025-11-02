import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { fetchVehicals, selectVehicles } from "@/slices/vehicleSlice";

export const useVehical = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: vehicals, fetchStatus, error } = useSelector(selectVehicles);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    if (fetchStatus === "idle" && (!vehicals || vehicals.length === 0)) {
      dispatch(fetchVehicals());
    }
  }, [dispatch, fetchStatus, vehicals]);

  // Helper to refetch manually (after adding/updating/deleting)
  const refetchVehicals = () => {
    dispatch(fetchVehicals());
  };

  return { vehicals, fetchStatus, error, refetchVehicals };
};
