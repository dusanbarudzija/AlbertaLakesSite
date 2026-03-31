import { C, levelColor } from "../constants";
import { SectionLabel, PrimaryBtn } from "../components/UI";

export default function LakeDetailPage({ lake, setPage }) {
    if (!lake) return null;

    const statusStyle = levelColor(lake.level);

    // Mock historical data
    const historicalSamples = [
        { date: "2024-08-15", type: "Grab", toxin: "0.05 µg/L", cells: "1,200", status: "Safe" },
        { date: "2024-07-20", type: "Grab", toxin: "12.4 µg/L", cells: "55,000", status: "Warning" },
        { date: "2024-06-10", type: "Composite", toxin: "0.02 µg/L", cells: "400", status: "Safe" },
    ];

    return (
        <div className="page-fade" style={{ flex: 1, background: C.sand, paddingBottom: "3rem" }}>
            <SectionLabel title={`Lake Overview: ${lake.name}`} />

            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
                <PrimaryBtn onClick={() => setPage("home")} style={{ marginBottom: "1.5rem" }}>
                    ← Back to Directory
                </PrimaryBtn>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
                    {/* Left Column: Image & Basic Info */}
                    <div style={{ background: C.white, borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.sandDark}` }}>
                        <img src={lake.image} alt={lake.name} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                        <div style={{ padding: "1.5rem" }}>
                            <h2 style={{ fontFamily: "'DM Serif Display', serif", color: C.ink }}>{lake.name}</h2>
                            <p style={{ color: C.ink3 }}>Region: {lake.region}</p>
                            <div style={{
                                marginTop: "1rem",
                                padding: "10px",
                                borderRadius: "8px",
                                background: statusStyle.bg,
                                color: statusStyle.text,
                                border: `1px solid ${statusStyle.border}`,
                                textAlign: "center",
                                fontWeight: "600"
                            }}>
                                Current Status: {lake.level === "High" ? "Advisory / Warning" : "Safe for Recreation"}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Map Placeholder */}
                    <div style={{
                        background: C.teal100,
                        borderRadius: "12px",
                        border: `1px solid ${C.teal200}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.teal700
                    }}>
                        [ Interactive Map Placeholder ]
                    </div>
                </div>

                {/* Historical Samples Table */}
                <h3 style={{ marginBottom: "1rem", color: C.ink }}>Historical Algae Samples (2009-2025)</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", background: C.white, borderRadius: "8px", overflow: "hidden" }}>
                    <thead>
                        <tr style={{ background: C.teal800, color: C.white, textAlign: "left" }}>
                            <th style={{ padding: "12px" }}>Date</th>
                            <th style={{ padding: "12px" }}>Type</th>
                            <th style={{ padding: "12px" }}>Toxin Level</th>
                            <th style={{ padding: "12px" }}>Cell Count</th>
                            <th style={{ padding: "12px" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicalSamples.map((s, i) => (
                            <tr key={i} style={{ borderBottom: `1px solid ${C.sandDark}` }}>
                                <td style={{ padding: "12px" }}>{s.date}</td>
                                <td style={{ padding: "12px" }}>{s.type}</td>
                                <td style={{ padding: "12px" }}>{s.toxin}</td>
                                <td style={{ padding: "12px" }}>{s.cells}</td>
                                <td style={{ padding: "12px", color: s.status === "Warning" ? C.red : C.green, fontWeight: "600" }}>{s.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}