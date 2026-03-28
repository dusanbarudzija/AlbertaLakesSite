import { useState } from "react";
import { C } from "../constants";
import { SectionLabel, PrimaryBtn } from "../components/UI";

export default function AboutPage() {
    const [showGuidelines, setShowGuidelines] = useState(false);

    return (
        <div className="page-fade" style={{ flex: 1, background: C.sand, paddingBottom: "3rem" }}>
            

            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", color: C.ink, fontSize: "32px", marginBottom: "16px" }}>
                    Our Mission
                </h1>
                <p style={{ color: C.ink3, fontSize: "18px", lineHeight: "1.6", marginBottom: "2rem" }}>
                    LakeWatch is a community-driven platform dedicated to monitoring and preserving the health and conditions of Alberta's lakes.
                    We empower citizens by providing layman’s-term condition reports on cyanobacterial toxins, helping
                    recreational water users stay safe and informed.
                </p>

                <div style={{ background: C.white, padding: "2rem", borderRadius: "12px", border: `1px solid ${C.sandDark}`, marginBottom: "2rem" }}>
                    <h2 style={{ color: C.teal800, marginBottom: "12px" }}>Understanding Algae Reports</h2>
                    <p style={{ color: C.ink2, marginBottom: "1.5rem" }}>
                        We follow Alberta Health and Health Canada guidelines to categorize lake safety. Our status markers
                        (Safe, Moderate, High) are determined by laboratory test results published on Alberta Open Data.
                    </p>

                    <PrimaryBtn onClick={() => setShowGuidelines(!showGuidelines)}>
                        {showGuidelines ? "Hide Technical Details" : "View Safety Thresholds"}
                    </PrimaryBtn>

                    {showGuidelines && (
                        <div style={{ marginTop: "1.5rem", padding: "1rem", background: C.teal50, borderRadius: "8px", border: `1px solid ${C.teal200}` }}>
                            <h4 style={{ color: C.teal900, marginBottom: "8px" }}>Health Canada Thresholds:</h4>
                            <ul style={{ color: C.ink2, fontSize: "14px", lineHeight: "1.8", paddingLeft: "1.2rem" }}>
                                <li><strong>Total Cyanobacteria:</strong> 50,000 cells/mL</li>
                                <li><strong>Total Microcystin-LR:</strong> 10 μg/L</li>
                            </ul>
                            <p style={{ fontSize: "12px", marginTop: "12px", color: C.ink4 }}>
                                Exceeding either of these levels results in a "Warning" or "Advisory" status.
                            </p>
                        </div>
                    )}
                </div>

                <h3 style={{ color: C.ink, marginBottom: "12px" }}>External Resources</h3>
                <ul style={{ listStyle: "none" }}>
                    <li style={{ marginBottom: "8px" }}>
                        <a href="https://alms.ca/" target="_blank" rel="noreferrer" style={{ color: C.teal600, textDecoration: "none" }}>
                            Alberta Lake Management Society (ALMS)
                        </a>
                    </li>
                    <li>
                        <a href="https://open.alberta.ca/opendata" target="_blank" rel="noreferrer" style={{ color: C.teal600, textDecoration: "none" }}>
                            Alberta Open Data Portal
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}