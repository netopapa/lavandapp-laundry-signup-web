// docs: https://developers.google.com/maps/documentation/embed/embedding-map

import { useMemo } from "react";

const BASE_URL = "https://www.google.com/";
const API_KEY = "AIzaSyBeATpFDySB6SFiRN4BEl1xKYXMiJaorrg";

export type MapViewProps = {
  location: string;
  mapMode?: "place" | "view" | "directions" | "streetview" | "search";
  width?: string;
  height?: string;
  allowFullScreen?: boolean;
  center?: { lat: number; lng: number };
  zoom?: string; // 0 (longe) - 21 (perto)
};

export const MapView = ({
  location,
  mapMode = "place",
  width = "100%",
  height = "200",
  allowFullScreen = false,
  center,
  zoom = "17",
}: MapViewProps) => {
  const locationEncoded = useMemo(() => location.trim().replaceAll(' ', '+'), [location]);

  const centerFormatted = useMemo(
    () => (center ? `${center.lat},${center.lng}` : ""),
    [center]
  );

  const parameters = useMemo(
    () =>
      center
        ? new URLSearchParams({
            q: locationEncoded,
            center: centerFormatted,
            zoom,
          }).toString()
        : new URLSearchParams({
            q: locationEncoded,
            zoom,
          }).toString(),
    [locationEncoded, centerFormatted, zoom]
  );

  return (
    <iframe
      width={width}
      height={height}
      frameBorder="0"
      style={{ border: 0 }}
      referrerPolicy="no-referrer-when-downgrade"
      src={`${BASE_URL}maps/embed/v1/${mapMode}?key=${API_KEY}&${parameters}`}
      allowFullScreen={allowFullScreen}
    ></iframe>
  );
};
