import { C, levelColor } from "../constants";

export default function LakeCard({ lake, selected, onClick }) {
  const lc = levelColor(lake.level);

  return (
    <div
      className="card-hover"
      onClick={() => onClick(lake)}
      style={{
        background: selected ? C.teal50 : C.white,
        border: `1.5px solid ${selected ? C.teal400 : C.sandDark}`,
        borderRadius: 12,
        padding: "14px 16px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "border 0.15s, background 0.15s",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: C.ink, marginBottom: 4 }}>
          {lake.name}
        </div>
        {lake.beachName && (
          <div style={{ fontSize: 12, color: C.ink4 }}>{lake.beachName}</div>
        )}
      </div>

      <span
        className="pill"
        style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}`, marginLeft: 12, flexShrink: 0 }}
      >
        {lake.level}
      </span>
    </div>
  );
}
