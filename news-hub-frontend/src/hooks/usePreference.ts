import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPreference } from "../types";
import { apiClient } from "../utils/ApiClient";
import useFetchData from "./useFetchData";

export const usePreferences = () => {
  const queryClient = useQueryClient();

  const { data: preferences, isLoading: preferencesLoading } = useFetchData('/preferences', ['preferences']);

  const { data: options, isLoading: optionsLoading } = useFetchData('/preferences/options', ['options'], {}, 0);
  


  const { mutate: updatePreferences, isPending: isUpdating } = useMutation({
    mutationFn: (newPreferences: UserPreference) =>
      apiClient.post("/preferences", newPreferences).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return {
    preferences,
    options,
    updatePreferences,
    isLoading: preferencesLoading || optionsLoading,
    isUpdating,
  };
};