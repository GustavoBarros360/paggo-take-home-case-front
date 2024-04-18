import { useState } from "react";

export type User = {
  token: string;
  name: string;
  email: string;
  id: string;
};

export const LOCAL_STORAGE_USER_KEY = "user";

export const useUserStore = () => {
  const [user, setUser] = useState<User>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") ?? "")
      : null
  );

  const updateUser = (user: User) => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    setUser(user);
  };

  return { user, updateUser };
};
