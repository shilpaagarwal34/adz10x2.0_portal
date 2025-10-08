

function ManagerInfo({ relationship_manager }) {
  return relationship_manager?.name ? (
    <div className="py-2 mt-3 bg-white px-3 rounded-3 shadow-sm d-flex justify-content-between">
      <p className=" m-0  fw-bold fs-6">
        {relationship_manager?.name} <br />{" "}
        <span className="fw-medium" style={{ fontSize: "11px" }}>
          {relationship_manager?.designation}
        </span>
      </p>
      <div className="d-flex align-items-center">
        {/* WhatsApp Call */}
        <a
          href={`https://wa.me/${relationship_manager?.mobile_no}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="me-2"
            src="/whatsapp.svg"
            style={{ width: "30px", cursor: "pointer" }}
          />
        </a>

        {/* Direct Call */}
        <a href={`tel:${relationship_manager?.mobile_no}`}>
          <img src="/call.svg" style={{ width: "30px", cursor: "pointer" }} />
        </a>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ManagerInfo;
