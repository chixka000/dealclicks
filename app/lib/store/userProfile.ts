import { create } from "zustand";
import { IUserProp } from "@/app/interfaces/user/interface";

const useUserProfile = create<IUserProp>(() => ({
  user: undefined,
}));

export default useUserProfile;
