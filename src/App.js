import { useEffect, useState } from "react";
import Document from "./components/Document";
import ModalContent from "./components/ModalContent";
import axios from "axios";

function App() {
  const [receivedInvoices, setReceivedInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
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

  return (
    <>
      {isModalOpen && (
        <ModalContent
          selectedInvoice={selectedInvoice}
          selectedCreditNote={selectedCreditNote}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <main className="flex flex-col items-center justify-center gap-10 mt-20">
        <h1 className="font-semibold text-lg">Selecciona una factura</h1>
        <section className="flex flex-col w-full max-w-3xl">
          {receivedInvoices?.map((invoice, index) => (
            <Document
              key={index}
              document={invoice}
              index={index}
              selectedDocument={selectedInvoice}
              handleSelect={setSelectedInvoice}
              title={"Recibida"}
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
                      selectedDocument={selectedCreditNote}
                      handleSelect={setSelectedCreditNote}
                      title={`inv_${index + 1}`}
                    />
                  )
              )}
            </section>
            {selectedCreditNote && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 shadow-md hover:scale-105 transition-all duration-150 bg-blue-800 text-white flex mx-auto rounded-md"
              >
                Asignar
              </button>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
