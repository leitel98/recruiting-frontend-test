import React from "react";

const Summary = ({
  selectedInvoice,
  selectedCreditNotes,
  totalCreditNotesAmount,
}) => {
  return (
    <section className="flex flex-col gap-2 items-start">
      <p className="font-bold w-full text-center">Factura</p>
      <div className="grid grid-cols-2 gap-3 w-full px-4 py-2 items-start border rounded-md shadow-sm">
        <p>Id: {selectedInvoice.id}</p>
        <p>
          Monto: $
          {selectedInvoice.currency === "CLP"
            ? selectedInvoice.amount.toLocaleString("es-CL")
            : (selectedInvoice.amount * 888.22).toLocaleString("es-CL")}{" "}
          CLP
        </p>
      </div>
      <p className="font-bold w-full text-center">Notas de crédito</p>
      <div className="flex flex-col gap-3 w-full">
        {selectedCreditNotes.map((selectedCreditNote, idx) => (
          <div
            key={idx}
            className="grid grid-cols-2 px-4 py-2 border rounded-md shadow-sm"
          >
            <div className="flex items-center gap-2">
              <p className="font-semibold">Id:</p> <span>{selectedCreditNote.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Monto: $</p>
              <span>
                {selectedCreditNote.currency === "CLP"
                  ? selectedCreditNote.amount.toLocaleString("es-CL")
                  : (selectedCreditNote.amount * 888.22).toLocaleString("es-CL")}{" "}
                CLP
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-8 w-full px-4 py-2 border rounded-md shadow-sm">
        <span className="font-bold">Nuevo monto: </span>
        <p className="col-span-2">
          $
          {selectedInvoice.currency === "CLP"
            ? (selectedInvoice.amount - totalCreditNotesAmount).toLocaleString(
                "es-CL"
              )
            : (
                selectedInvoice.amount * 888.22 -
                totalCreditNotesAmount
              ).toLocaleString("es-CL")}
          CLP
        </p>
      </div>
    </section>
  );
};

export default Summary;
