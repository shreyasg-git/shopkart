import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import CheckoutCompleteModal from "@/app/components/CheckoutModal";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";

const checkoutMutation = async () => {
  const response = await axios.put("/api/cart/checkout");
  return response.data;
};

type CheckoutProps = {
  disabled: boolean;
};

const Checkout: React.FC<CheckoutProps> = ({ disabled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFailedMessage, setshowFailedMessage] = useState(false);

  const navRouter = useRouter();

  const mutation = useMutation({
    mutationFn: checkoutMutation,
    onSuccess: () => {
      setIsModalOpen(true);
      setshowFailedMessage(false);
    },
    onError: (error) => {
      console.error("Checkout failed:", error);
      setshowFailedMessage(true);
    },
  });

  const handleCheckout = () => {
    mutation.mutate();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg  p-6 mt-5 ">
      <Button
        flat
        onClick={handleCheckout}
        loading={mutation.isPending}
        disabled={mutation.isPending || disabled}
        className={`w-full p-2 text-white rounded ${
          mutation.isPending || disabled
            ? "bg-gray-500"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        title={"Checkout"}
      />
      {showFailedMessage && (
        <div className="text-center text-md mt-5 font-medium text-red-400">
          Something Went Wrong !
        </div>
      )}
      <CheckoutCompleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navRouter.push("/products");
          navRouter.refresh();
        }}
      />
    </div>
  );
};

export default Checkout;
