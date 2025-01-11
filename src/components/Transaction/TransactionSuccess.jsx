import React from "react";
import { format } from "date-fns-tz";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import tick from "../../assets/tick.png";
import "./TransactionSuccess.css";

function TransactionSuccess() {
  const location = useLocation();
  const {
    receiverName = "N/A",
    accountNumber = "XXXX",
    bankLogo = meezan_bank,
    formattedBankName = "N/A",
    formattedAmount = "N/A",
    transactionIdentity = "N/A",
  } = location.state || {};

  const date = new Date();
  const timeZone = "Asia/Karachi";

  const formattedDate = format(date, "dd MMM yyyy hh:mm a", { timeZone });

  return (
    <div className="transaction-success-page">
      <div className="header">
        <div>Send Money</div>
        <div className="header-icons">
          <FontAwesomeIcon icon={faHome} />
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faPowerOff} />
        </div>
      </div>
      <div className="main-content">
        {formattedBankName === "Meezan Bank" && (
          <div className="tick">
            <img src={tick} alt="Success Tick" width="150" />
          </div>
        )}
        <div className="transaction-success">Transaction Successful</div>
        <div className="text-section-name">
          MUHAMMAD HAMZA AMIN
          <br />
          <div className="account-number">00300108625736</div>
        </div>
        <div className="transfered">Money Transferred</div>
        <div className="amount">
          <div>Rs.</div> <span className="amount-real">{formattedAmount}</span>
        </div>
        <div className="text-section-to">to</div>
        <div className="text-section-account">
          <span className="reciver-name">{receiverName}</span> - <br />
          <b className="account-number">
            Account Number: *****{accountNumber.slice(-4)}
          </b>
        </div>
        <div className="bank-info">
          <img
            className="bank-logo"
            src={bankLogo}
            alt={formattedBankName || "Bank Logo"}
            width="50"
          />
          <div className="bank-name">{formattedBankName}</div>
          {/* <div className="time">{formattedDate}</div> */}
          <div className="time">11 Jan 2025 10:22 PM</div>
          <div className="tid-number">
            Transaction ID (TID):{" "}
            <span className="reciver-tid">{transactionIdentity}</span>
          </div>
        </div>
        <div className="transaction-id">
          Transactions conducted after 09:00 PM and during holidays will show up
          in receiver's statement on the next working day, but balance will
        </div>
      </div>
      <div className="footer-buttons">
        <button className="btn-1">Screenshot</button>
        <button className="btn-2">Share Receipt</button>
        <button className="btn-3">OK</button>
      </div>
    </div>
  );
}

export default TransactionSuccess;
