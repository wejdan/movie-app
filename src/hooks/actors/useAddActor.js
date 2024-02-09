import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthMutation } from "../common/useAuthMutation";
import { useSelector } from "react-redux";
import { addActor } from "../../services/actors";
import { toast } from "react-hot-toast";
import { useModalWindow } from "../../components/UI/Modal";

export function useAddActor(onSuccess, onMutationStart, onMutationEnd) {
  const queryClient = useQueryClient();
  const { onClose } = useModalWindow();

  const addActorMutation = useAuthMutation(addActor, {
    onMutate: async () => {
      // Called immediately before the mutation function is fired
      if (onMutationStart) onMutationStart();
    },
    onSuccess: () => {
      // Invalidate queries and call onSuccess from props
      queryClient.invalidateQueries("actors");

      onClose("add-actor")(); // Close the genres modal
      toast.success("Actor was added successfuly", {
        duration: 5000,
        // isClosable is not a supported option in react-hot-toast
      });
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      // Handle error

      toast.error(err.message, {
        duration: 5000,
        // isClosable is not a supported option in react-hot-toast
      });
    },
    onSettled: () => {
      // Called on either success or error
      if (onMutationEnd) onMutationEnd();
    },
  });

  return addActorMutation;
}
