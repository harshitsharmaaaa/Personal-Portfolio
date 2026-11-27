"use client";

import { stations, scrollToId, type Station } from "@/data/railway";

export default function StationStops({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (station: Station) => void;
}) {
  return (
    <div id="stations" className="rail-stations" aria-label="Railway destinations">
      <div className="rail-stations__line" aria-hidden="true" />
      <ul className="rail-stations__list">
        {stations.map((station) => {
          const isActive = activeId === station.id;
          return (
            <li key={station.id} className="rail-stations__item">
              <button
                type="button"
                className={`rail-stations__stop ${isActive ? "is-active" : ""}`}
                style={{ "--stop-color": station.color } as React.CSSProperties}
                onClick={() => onSelect(station)}
                aria-pressed={isActive}
                aria-label={`${station.label}. ${station.description}. Go to this section.`}
              >
                <span className="rail-stations__dot" aria-hidden="true">
                  <span />
                </span>
                <span className="rail-stations__code" aria-hidden="true">{station.code}</span>
                <span className="rail-stations__label">{station.shortLabel}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function travelToStation(station: Station) {
  scrollToId(station.target);
}
