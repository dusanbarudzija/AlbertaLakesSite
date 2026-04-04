import { useState, useEffect } from "react";
import { C } from "../constants";
import SearchBar from "../components/SearchBar";
import LakeCard from "../components/LakeCard";
import LakeMap from "../components/LakeMap";
import { fetchLakes } from "../services/dataService";
// import { SectionLabel ***.... } from "../components/UI";
import LakeInfo from "../components/LakeInfo";


export default function HomePage({ currentUser, setPage, profileSelectedLakeId, setProfileSelectedLakeId, lakes, setLakes, selectedLake, setSelectedLake, detailLake, setDetailLake }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (lakes.length === 0) {
      fetchLakes().then(setLakes).catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (profileSelectedLakeId && lakes.length > 0) {
      const lake = lakes.find(l => l._id === profileSelectedLakeId);
      if (lake) {
        setSelectedLake(lake);
        setDetailLake(lake);
      }
      setProfileSelectedLakeId(null);
    }
  }, [profileSelectedLakeId, lakes]);

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
          onBack={() => { setDetailLake(null); setSelectedLake(null); }}
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
        key={lake._id}
        lake={lake}
        selected={selectedLake?._id === lake._id}
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
            onSelectLake={handleLakeClick}
          />
        </div>
      </div>
    </div>
  );
}
