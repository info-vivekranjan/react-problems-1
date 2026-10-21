export default function DialogContent({
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
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        inset: 0,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: "wheat",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "450px",
          borderRadius: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: 0 }}>{title ?? "Dialog Title"}</h3>
        <p style={{ margin: 0 }}>{description ?? "Dialog Description"}</p>
        <div style={{ textAlign: "right" }}>
          <button style={{ width: "fit-content" }} onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </section>
  );
}
