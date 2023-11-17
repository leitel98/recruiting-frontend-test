import React from "react";
import { Summary, Document, ModalContent } from "./components";
import { useAppHook } from "./hooks/useAppHook";

function App() {
  const {
    receivedInvoices,
    creditNotes,
    selectedInvoice,
    selectedCreditNotes,
    isModalOpen,
    setIsModalOpen,
    removeCreditNote,
    addCreditNote,
    totalCreditNotesAmount,
    reset,
    handleSelectInvoice
  } = useAppHook();
  return (
    <main className="relative">
      {isModalOpen && (
        <ModalContent
          selectedInvoice={selectedInvoice}
          selectedCreditNotes={selectedCreditNotes}
          totalCreditNotesAmount={totalCreditNotesAmount}
          removeCreditNote={removeCreditNote}
          reset={reset}
        />
      )}
      <section className="flex flex-col items-center justify-center gap-8 py-10">
        <h1 className="font-semibold text-lg">Selecciona una factura</h1>
        <section className="flex flex-col w-full max-w-3xl">
          {receivedInvoices?.map((invoice, index) => (
            <Document
              key={index}
              document={invoice}
              index={index}
              selectedDocument={selectedInvoice}
              handleSelect={handleSelectInvoice}
              title="Recibida"
            />
          ))}
        </section>
        {selectedInvoice && (
          <>
            <h1 className="font-semibold text-lg">
              Selecciona una nota de crédito
            </h1>
            <section className="flex flex-col w-full max-w-3xl">
              {creditNotes.map(
                (note, index) =>
                  note.reference === selectedInvoice.id && (
                    <Document
                      key={index}
                      document={note}
                      index={index}
                      selectedDocument={selectedCreditNotes}
                      handleSelect={addCreditNote}
                      title={`inv_${index + 1}`}
                    />
                  )
              )}
            </section>

            {selectedCreditNotes.length > 0 ? (
              <div className="flex flex-col gap-6 items-center">
                <Summary
                  selectedInvoice={selectedInvoice}
                  selectedCreditNotes={selectedCreditNotes}
                  totalCreditNotesAmount={totalCreditNotesAmount}
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 shadow-md hover:scale-105 transition-all duration-150 bg-blue-800 text-white flex mx-auto rounded-md"
                >
                  Asignar
                </button>
              </div>
            ) : (
              <p className="text-lg text-gray-500">
                No existen notas de crédito disponibles...
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
