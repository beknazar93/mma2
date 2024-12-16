import React, { useState } from "react";
import AddClientForm from "./AddClientForm";

const AddClientButton = ({ onClientAdded }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleForm}
        style={{
          marginBottom: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        {isFormVisible ? "Скрыть форму" : "Добавить клиента"}
      </button>

      {isFormVisible && <AddClientForm onClientAdded={onClientAdded} />}
    </div>
  );
};

export default AddClientButton;
