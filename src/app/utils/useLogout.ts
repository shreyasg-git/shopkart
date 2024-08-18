import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const navrouter = useRouter();
  const logOutMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/signout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      navrouter.push("/signin");
      navrouter.refresh();
    },
  });

  return { logOutMutation };
};
