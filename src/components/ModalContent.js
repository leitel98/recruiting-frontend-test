import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Summary from "./Summary";

const ModalContent = ({
  selectedInvoice,
  selectedCreditNotes,
  totalCreditNotesAmount,
  reset
}) => {
  return (
    <div className="absolute h-full z-20 bottom-0 top-0 left-0 right-0 bg-gray-500 bg-opacity-50">
      <div className="flex max-w-3xl w-full z-20 absolute bottom-20 left-[50%] -translate-x-[50%] flex-col gap-4 p-4 rounded-md bg-white items-center">
        <CheckCircleIcon
          width={40}
          height={40}
          className="text-green-600 bg-green-200 rounded-full"
        />
        <p className="font-bold text-xl">
          Nota de crédito asignada correctamente
        </p>
        <Summary
          selectedInvoice={selectedInvoice}
          selectedCreditNotes={selectedCreditNotes}
          totalCreditNotesAmount={totalCreditNotesAmount}
        />
        <button
          onClick={() => reset()}
          className="px-4 py-2 shadow-md hover:scale-105 transition-all duration-150 bg-blue-800 text-white flex mx-auto rounded-md"
        >
          Seguir asignando
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
