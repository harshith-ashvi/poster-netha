import type { Person } from "@/lib/types";
import { Silhouette } from "./Silhouette";

// Fills its parent; the parent decides shape (circle, arch) and clips.
export function Photo({ person }: { person: Person }) {
  if (!person.photo) return <Silhouette />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- data URLs only; next/image can't be used with static export + html-to-image
    <img
      src={person.photo}
      alt={person.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${person.zoom}) translate(${person.offsetX}%, ${person.offsetY}%)`,
      }}
    />
  );
}
