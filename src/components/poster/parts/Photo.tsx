import type { Person } from "@/lib/types";
import { Silhouette } from "./Silhouette";

// Fills its parent; the parent decides shape (circle, arch) and clips.
// Panning uses object-position, which slides the photo *inside* its cover crop, so parts cut off at
// upload (e.g. the sides of a wide photo) come into view and the frame never shows gaps. Zoom scales
// around that same point, so any part of the photo can be reached at any zoom.
// Offsets are -50..50: positive moves the photo right/down (i.e. reveals its left/top edge).
export function Photo({ person }: { person: Person }) {
  if (!person.photo) return <Silhouette />;
  const focus = `${50 - person.offsetX}% ${50 - person.offsetY}%`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- data URLs only; next/image can't be used with static export + html-to-image
    <img
      src={person.photo}
      alt={person.name}
      className="size-full object-cover"
      style={{ objectPosition: focus, transformOrigin: focus, transform: `scale(${person.zoom})` }}
    />
  );
}
