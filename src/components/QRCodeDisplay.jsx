import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QRCodeDisplay.css";

const QRCodeDisplay = ({ value }) => {
  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "reservation_qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedText = `
Name: ${value.name}
License: ${value.license}
Lot: ${value.lotId}
Slot #: ${value.slot.number}
Time: ${value.time}
`;

  return (
    <div className="qr-container text-center mt-4">
      <QRCodeCanvas
        id="qr-code"
        value={formattedText}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin
      />
      <div className="mt-3">
        <button className="btn btn-outline-primary" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
