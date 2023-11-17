import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export const useAppHook = () => {
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

  const reset = () => {
    setSelectedInvoice(null);
    setSelectedCreditNotes([]);
    setIsModalOpen(false);
  };

  const handleSelectInvoice = (document) => {
    setSelectedInvoice(document);
    setSelectedCreditNotes([]);
  };

  return {
    receivedInvoices,
    creditNotes,
    selectedInvoice,
    selectedCreditNotes,
    isModalOpen,
    removeCreditNote,
    addCreditNote,
    setIsModalOpen,
    totalCreditNotesAmount,
    reset,
    handleSelectInvoice
  };
};
