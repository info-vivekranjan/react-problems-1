"use client";

export default function ModalComp({
  title,
  description,
  handleClose,
}: {
  title: string;
  description: string;
  handleClose: () => void;
}) {
  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "wheat",
          minHeight: "150px",
          width: "400px",
          border: "2px solid black",
          borderRadius: "6px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title || "Title"}</h3>
        <p>{description || "Description"}</p>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button onClick={handleClose}>close</button>
        </div>
      </div>
    </section>
  );
}
