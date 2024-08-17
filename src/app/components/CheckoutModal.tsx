import React from "react";
import Modal from "./Modal";
import CheckoutSVG from "./CheckoutSVG";

interface CheckoutCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutCompleteModal: React.FC<CheckoutCompleteModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-3 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckoutSVG />
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5 mb-5">
          Checkout Successful!
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>
          <p className="text-sm text-gray-500">
            Paisa bhej do, but we can't gurantee delivery.
          </p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutCompleteModal;
