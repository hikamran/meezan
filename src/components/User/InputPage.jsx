import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/ubl_logo.png";
import logo2 from "../../assets/meezan_logo.png";
import logo3 from "../../assets/faysal_logo.png";
import logo4 from "../../assets/jazz_logo.png"; 
import logo5 from "../../assets/easypaisa_telenor_logo.png"; 
import './InputPage.css';

const InputPage = () => {
  const [formData, setFormData] = useState({
    amountReal: "",
    receiverName: "",
    accountNumber: "",
    bankName: "",
    transactionId: "",
  });

  const [bankLogo, setBankLogo] = useState(logo1);
  const [formattedBankName, setFormattedBankName] = useState("N/A");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Updated function to fix capitalization for special cases
  const capitalizeBankName = (bankName) => {
    const exceptions = {
      "Jazzcash": "Jazzcash",
      "Easypaisa": "EasyPaisa",
      "Mobilink": "Mobilink",
      "Telenor": "Telenor"
    };

    return bankName
      .split(" ")
      .map((word) => {
        // Check if the word is an exception, and return the exact casing from the exceptions list
        return exceptions[word] || word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };
  
  useEffect(() => {
    const bankNameLower = formData.bankName.trim().toUpperCase(); // Convert to uppercase for consistency
    switch (bankNameLower) {
      case "UBL BANK":
        setBankLogo(logo1);
        setFormattedBankName("UBL");
        break;
      case "MEEZAN BANK":
        setBankLogo(logo2);
        setFormattedBankName("Meezan Bank");
        break;
      case "FAYSAL BANK":
        setBankLogo(logo3);
        setFormattedBankName("Faysal Bank");
        break;
      case "JAZZCASH":
        setBankLogo(logo4); 
        setFormattedBankName("Mobilink Bank/Jazzcash");
        break;
      case "EASYPAISA":
        setBankLogo(logo5); 
        setFormattedBankName("EasyPaisa-Telenor Bank");
        break;
      default:
        setBankLogo(logo1); // Default logo if no match
        setFormattedBankName("N/A");
    }
  }, [formData.bankName]); // Trigger the effect when bankName changes

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success", { state: { ...formData, bankLogo, formattedBankName } });
  };

  return (
    <div>
      <h2>Input Page</h2>
      <form className="input-form" onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amountReal"
            value={formData.amountReal}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Receiver Name:</label>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName} // This is now updating the bankName directly
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transaction ID:</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <img src={bankLogo} alt="Bank Logo" width="100" />
      </div>
    </div>
  );
};

export default InputPage;
