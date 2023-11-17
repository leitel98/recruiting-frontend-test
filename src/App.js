import React, { useEffect, useState, useMemo } from "react";
import Document from "./components/Document";
import ModalContent from "./components/ModalContent";
import Summary from "./components/Summary";
import axios from "axios";

function App() {
  const [receivedInvoices, setReceivedInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedCreditNotes, setSelectedCreditNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://recruiting.api.bemmbo.com/invoices/pending"
      );
      const data = response.data;

      setReceivedInvoices([]);
      setCreditNotes([]);

      data.forEach((item) => {
        if (item.type === "received") {
          setReceivedInvoices((prevState) => [...prevState, item]);
        } else if (item.type === "credit_note") {
          setCreditNotes((prevState) => [...prevState, item]);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeCreditNote = (creditNoteId) => {
    setSelectedCreditNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== creditNoteId)
    );
  };

  const addCreditNote = (creditNote) => {
    const existingNoteIndex = selectedCreditNotes.findIndex(
      (note) => note.id === creditNote.id
    );

    if (existingNoteIndex !== -1) {
      // Credit note already exists, remove it
      removeCreditNote(creditNote.id);
    } else {
      // Credit note does not exist, add it
      setSelectedCreditNotes((prevNotes) => [...prevNotes, creditNote]);
    }
  };

  const totalCreditNotesAmount = useMemo(
    () =>
      selectedCreditNotes.reduce(
        (total, note) =>
          note.currency === "CLP"
            ? total + note.amount
            : total + note.amount * 888.22,
        0
      ),
    [selectedCreditNotes]
  );

  return (
    <>
      {isModalOpen && (
        <ModalContent
          selectedInvoice={selectedInvoice}
          selectedCreditNotes={selectedCreditNotes}
          totalCreditNotesAmount={totalCreditNotesAmount}
          setIsModalOpen={setIsModalOpen}
          removeCreditNote={removeCreditNote}
        />
      )}
      <main className="flex flex-col items-center justify-center gap-10 mt-10">
        <h1 className="font-semibold text-lg">Selecciona una factura</h1>
        <section className="flex flex-col w-full max-w-3xl">
          {receivedInvoices?.map((invoice, index) => (
            <Document
              key={index}
              document={invoice}
              index={index}
              selectedDocument={selectedInvoice}
              handleSelect={setSelectedInvoice}
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
      </main>
    </>
  );
}

export default App;
