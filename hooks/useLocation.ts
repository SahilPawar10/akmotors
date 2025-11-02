import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { fetchLocation, selectLocation } from "@/slices/locationSlice";

export const useLocation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: location,
    fetchLocationStatus,
    error,
  } = useSelector(selectLocation);

  // Fetch on mount (always fetch for hard refresh)
  useEffect(() => {
    if (
      fetchLocationStatus === "idle" &&
      (!location || location.length === 0)
    ) {
      dispatch(fetchLocation());
    }
  }, [dispatch, fetchLocationStatus, location]);

  // Helper to refetch manually (after adding/updating/deleting)
  const refetchLocation = () => {
    dispatch(fetchLocation());
  };

  return { location, fetchLocationStatus, error, refetchLocation };
};
