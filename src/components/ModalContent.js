import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';

const ModalContent = ({
  selectedInvoice,
  selectedCreditNote,
  setIsModalOpen,
}) => {
  return (
    <div className="absolute z-20 inset-0 bg-gray-500 bg-opacity-50">
      <div className="flex w-[75%] z-20 absolute bottom-20 left-[50%] -translate-x-[50%] flex-col gap-4 p-4 rounded-md bg-white items-center">
        <CheckCircleIcon
          width={40}
          height={40}
          className="text-green-600 bg-green-200 rounded-full"
        />
        <p className="font-bold">Nota de crédito asignada correctamente</p>
        <section className="flex flex-col gap-2 items-start">
          <div className="grid grid-cols-3 gap-3 w-full px-4 py-2 items-start border rounded-md shadow-sm">
            <p className="font-bold">Factura</p>
            <p>Id: {selectedInvoice.id}</p>
            <p>
              Monto: $
              {selectedInvoice.currency === 'CLP'
                ? selectedInvoice.amount.toLocaleString('es-CL')
                : (selectedInvoice.amount * 888.22).toLocaleString('es-CL')}{' '}
              CLP
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 w-full px-4 py-2 items-center border rounded-md shadow-sm">
            <p className="font-bold">Nota de crédito</p>
            <p>Id: {selectedCreditNote.id}</p>
            <p>
              Monto: $
              {selectedCreditNote.currency === 'CLP'
                ? selectedCreditNote.amount.toLocaleString('es-CL')
                : (selectedCreditNote.amount * 888.22).toLocaleString('es-CL')}{' '}
              CLP
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 w-full px-4 py-2 border rounded-md shadow-sm">
            <span className="font-bold">Nuevo monto: </span>
            <p className="col-span-2">
              $
              {selectedInvoice.currency === 'CLP' &&
              selectedCreditNote.currency === 'CLP'
                ? (
                    selectedInvoice.amount - selectedCreditNote.amount
                  ).toLocaleString('es-CL')
                : selectedInvoice.currency === 'CLP' &&
                  selectedCreditNote.currency === 'USD'
                ? (
                    selectedInvoice.amount -
                    selectedCreditNote.amount * 888.22
                  ).toLocaleString('es-CL')
                : selectedInvoice.currency === 'USD' &&
                  selectedCreditNote.currency === 'USD'
                ? (
                    selectedInvoice.amount * 888.22 -
                    selectedCreditNote.amount * 888.22
                  ).toLocaleString('es-CL')
                : selectedInvoice.currency === 'USD' &&
                  selectedCreditNote.currency === 'CLP'
                ? (
                    selectedInvoice.amount * 888.22 -
                    selectedCreditNote.amount
                  ).toLocaleString('es-CL')
                : ''}{' '}
              CLP
            </p>
          </div>
        </section>
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 shadow-md hover:scale-105 transition-all duration-150 bg-blue-800 text-white flex mx-auto rounded-md"
        >
          Seguir asignando
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
