import React from "react";

const ReportRow = ({ appointment, index }) => {

  const handleView = () => {
    window.open("/patient_report.pdf", "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/patient_report.pdf";
    link.download = `report_${appointment.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{appointment.name}</td>
      <td>{appointment.speciality}</td>
      <td>
        <button className="btn-primary" onClick={handleView}>
          View
        </button>
      </td>
      <td>
        <button className="btn-secondary" onClick={handleDownload}>
          Download
        </button>
      </td>
    </tr>
  );
};

export default ReportRow;
