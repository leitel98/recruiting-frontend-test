import React from "react";

const Document = ({
  document,
  index,
  selectedDocument,
  handleSelect,
  title,
}) => {
  return (
    <div
      key={index}
      className="flex items-center justify-between border rounded-md px-4 py-2"
    >
      <div className="flex items-center gap-2">
        <input
          onClick={() => handleSelect(document)}
          checked={
            document.type === "received"
              ? document === selectedDocument
              : selectedDocument.includes(document)
          }
          type="checkbox"
          className="w-4 h-4 rounded-full border"
        />
        <p className="font-bold">inv_{index + 1}</p>
        <p className="text-gray-500">({document.organization_id})</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold">
          $
          {document.currency === "CLP"
            ? document.amount.toLocaleString("es-CL")
            : (document.amount * 888.22).toLocaleString("es-CL")}{" "}
          CLP
        </p>
        <p className="text-gray-500">
          ( $
          {document.currency === "USD"
            ? document.amount.toLocaleString("en-US")
            : document.amount * (0.0011).toLocaleString("en-US")}{" "}
          USD)
        </p>
      </div>
      <p className="text-gray-500">{title}</p>
    </div>
  );
};

export default Document;
