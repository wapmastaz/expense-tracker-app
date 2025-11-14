import {useQuery} from "@tanstack/react-query";
import type {User} from "@/types/user.ts";
import {fetchUser} from "@/services/user-service.ts";

export const useUserProfile = () => {
  return useQuery<User, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUser,
    select: (data) => {
      return data;
    },
  });
};