import { useState } from "react";
import { C } from "../constants";
import SearchBar from "../components/SearchBar";
import LakeCard from "../components/LakeCard";
import LakeMap from "../components/LakeMap";
import { lakes } from "../data/index.js";
// import { SectionLabel ***.... } from "../components/UI";
import LakeInfo from "../components/LakeInfo";


export default function HomePage({ currentUser, setPage }) {
  const [query, setQuery] = useState("");
  const [selectedLake, setSelectedLake] = useState(null);
  const [detailLake, setDetailLake] = useState(null);

  const filteredLakes = lakes.filter(l =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleLakeClick = (lake) => {
    setSelectedLake(lake);
    setDetailLake(lake);
  };

  const renderColumnContent = () => {
    if (detailLake) {
      return (
        <LakeInfo
          lake={detailLake}
          currentUser={currentUser}
          setPage={setPage}
          onBack={() => setDetailLake(null)}
        />
      );
    }

    if (filteredLakes.length === 0) {
      return (
        <p style={{ color: C.ink4, fontSize: 14, textAlign: "center", marginTop: 24 }}>
          No lakes found.
        </p>
      );
    }

    return filteredLakes.map(lake => (
      <LakeCard
        key={lake.id}
        lake={lake}
        selected={selectedLake?.id === lake.id}
        onClick={handleLakeClick}
      />
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 56, paddingBottom: 48, flex: 1 }}>
      {/* Header */}
      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 48,
        color: C.teal900,
        textAlign: "center",
        marginBottom: 12,
      }}>
        Explore Alberta Lakes
      </h1>

      {/* Subheader */}
      <p style={{
        fontSize: 18,
        color: C.ink3,
        textAlign: "center",
        maxWidth: 520,
        marginBottom: 28,
        lineHeight: 1.6,
      }}>
        Discover water quality, conditions, and community reports for lakes across Alberta.
      </p>

      <SearchBar onSearch={setQuery} />

      {/* Two-panel layout */}
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: 1200,
        padding: "28px 24px 0",
        gap: 24,
        flex: 1,
        minHeight: 520,
      }}>
        {/* Lake list / detail column */}
        <div style={{
          width: "38%",
          flexShrink: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingRight: 4,
        }}>
          {renderColumnContent()}
        </div>

        {/* Map panel */}
        <div style={{ flex: 1, borderRadius: 12, overflow: "hidden", minHeight: 480 }}>
          <LakeMap
            lakes={lakes}
            selectedLake={selectedLake}
            onSelectLake={setSelectedLake}
          />
        </div>
      </div>
      {/* Demo link to 404 page */}
                <a href="#" onClick={e => { e.preventDefault(); setPage("invalid"); }}>Invalid link (for demo purposes)</a>
    </div>
  );
}
