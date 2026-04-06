import { C } from "../constants";

export default function Toast({ message, type, onClose, onConfirm, inline,
                                  modal,
                                  confirmText = "Delete",
                                  cancelText = "Cancel"
}) {
  const bg     = type === "success" ? C.greenBg : C.redBg;
  const text   = type === "success" ? C.green   : C.red;
  const border = type === "success" ? "#9de0bb" : "#f5bfbb";

  const posStyle = inline ? {} : { position:"fixed", top:"76px", right:"24px", zIndex:1000 };

  // If onConfirm is provided, show confirmation buttons
  const isConfirmation = !!onConfirm;

  const toastEl = (
        <div style={{
            background: bg,
            border: `1px solid ${border}`,
            borderRadius: "10px",
            padding: isConfirmation ? "12px 16px" : "8px 14px",
            fontSize: "13px",
            color: text,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            minWidth: isConfirmation ? "300px" : "auto",
            flexDirection: isConfirmation ? "column" : "row"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <span>{message}</span>
                {!isConfirmation && (
                    <span onClick={onClose} style={{ cursor: "pointer", fontWeight: "600", fontSize: "16px" }}>×</span>
                )}
            </div>

            {/* Confirmation buttons */}
            {isConfirmation && (
                <div style={{
                    display: "flex",
                    gap: "8px",
                    width: "100%",
                    marginTop: "8px"
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: "6px 12px",
                            background: "#f0f4f5",
                            color: "#5a6a72",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: "6px 12px",
                            background: type === "error" ? C.red : C.green,
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            )}
        </div>
  );

  if (modal) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {toastEl}
      </div>
    );
  }

  return <div style={{ ...posStyle }}>{toastEl}</div>;
}