import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [receivedInvoices, setReceivedInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);

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
    <main className="flex flex-col items-center justify-center gap-10 mt-20">
      <h1 className="font-semibold text-lg">Selecciona una factura</h1>
      <section className="flex flex-col w-full max-w-3xl">
        {receivedInvoices?.map((invoice, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-md px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <input
                onClick={() => setSelectedInvoice(invoice)}
                checked={invoice === selectedInvoice}
                type="checkbox"
                className="w-4 h-4 rounded-full border"
              />
              <p className="font-bold">inv_{index + 1}</p>
              <p className="text-gray-500">({invoice.organization_id})</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-bold">
                $
                {invoice.currency === "CLP"
                  ? invoice.amount.toLocaleString("es-CL")
                  : (invoice.amount * 888.22).toLocaleString("es-CL")}{" "}
                CLP
              </p>
              <p className="text-gray-500">
                <p className="font-bold">
                  ( $
                  {invoice.currency === "USD"
                    ? invoice.amount.toLocaleString("en-US")
                    : invoice.amount * (0.0011).toLocaleString("en-US")}{" "}
                  USD)
                </p>
              </p>
            </div>
            <p className="text-gray-500">Recibida</p>
          </div>
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
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-md px-4 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        onClick={() => setSelectedCreditNote(note)}
                        checked={note === selectedInvoice}
                        type="checkbox"
                        className="w-4 h-4 rounded-full border"
                      />
                      <p className="font-bold">inv_{index + 1}</p>
                      <p className="text-gray-500">({note.organization_id})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">
                        $
                        {note.currency === "CLP"
                          ? note.amount.toLocaleString("es-CL")
                          : (note.amount * 888.22).toLocaleString("es-CL")}{" "}
                        CLP
                      </p>
                      <p className="text-gray-500">
                        <p className="font-bold">
                          ($
                          {note.currency === "USD"
                            ? note.amount.toLocaleString("en-US")
                            : note.amount *
                              (0.0011).toLocaleString("en-US")}{" "}
                          USD)
                        </p>
                      </p>
                    </div>
                    <p className="text-gray-500">inv_{index + 1}</p>
                  </div>
                )
            )}
          </section>
          {selectedCreditNote && (
            <button className="px-4 py-2 shadow-md hover:scale-105 transition-all duration-150 bg-blue-800 text-white flex mx-auto rounded-md">
              Asignar
            </button>
          )}
        </>
      )}
    </main>
  );
}

export default App;
