import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ubl_bank from "../../assets/ubl_logo.png";
import meezan_bank from "../../assets/meezan_logo.png";
import faysal_bank from "../../assets/faysal_logo.png";
import jazzcash from "../../assets/jazz_logo.png";
import easypaisa from "../../assets/easypaisa_telenor_logo.png";
import bank_logo from "../../assets/bank_logo.png";
import "./InputPage.css";

const InputPage = () => {
  const [formData, setFormData] = useState({
    amountReal: "",
    setFormattedAmount: "",
    receiverName: "",
    accountNumber: "",
    bankName: "SELECT BANK",
    transactionIdentity: "",
  });

  const [formattedAmount, setFormattedAmount] = useState("");
  const [bankLogo, setBankLogo] = useState(meezan_bank);
  const [formattedBankName, setFormattedBankName] = useState("SELECT BANK");

  const generateTransactionId = () => {
    const length = 6;
    const randomNumber = Math.floor(
      Math.random() * Math.pow(10, length)
    ).toString();
    return randomNumber.padStart(length, "0");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amountReal") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      const formattedValue = parseFloat(numericValue || 0).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      setFormData({ ...formData, [name]: numericValue });
      setFormattedAmount(formattedValue);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const bankNameLower = formData.bankName.trim().toUpperCase();
    switch (bankNameLower) {
      case "UBL":
        setBankLogo(ubl_bank);
        setFormattedBankName("UBL");
        break;
      case "MEEZAN BANK":
        setBankLogo(meezan_bank);
        setFormattedBankName("Meezan Bank");
        break;
      case "FAYSAL BANK":
        setBankLogo(faysal_bank);
        setFormattedBankName("Faysal Bank");
        break;
      case "JAZZCASH":
        setBankLogo(jazzcash);
        setFormattedBankName("Mobilink Bank/Jazzcash");
        break;
      case "EASYPAISA":
        setBankLogo(easypaisa);
        setFormattedBankName("EasyPaisa-Telenor Bank");
        break;
      default:
        setBankLogo(bank_logo);
        setFormattedBankName("N/A");
    }
  }, [formData.bankName]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionIdentity = generateTransactionId();
    navigate("/success", {
      state: {
        ...formData,
        bankLogo,
        formattedAmount,
        formattedBankName,
        transactionIdentity,
      },
    });
  };

  return (
    <div>
      <h2>Enter Details</h2>
      <form className="input-form" onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amountReal"
            value={formData.amountReal}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Receiver Name:</label>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Account Number:</label>
          <input
            type="number"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <div className="bank-mini-logo">
            <label>Select Bank:</label>
            <img className="logo" src={bankLogo} alt="Bank Logo" width="50" />
          </div>
          <select
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            required
          >
            <option value="SELECT BANK">Select Bank</option>
            <option value="UBL">UBL</option>
            <option value="MEEZAN BANK">Meezan Bank</option>
            <option value="FAYSAL BANK">Faysal Bank</option>
            <option value="JAZZCASH">Jazzcash</option>
            <option value="EASYPAISA">EasyPaisa</option>
          </select>
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputPage;
