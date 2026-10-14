/** Fixed mesh gradient - sits behind all page content below the hero. */
export function MeshBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 mesh-bg"
      aria-hidden="true"
    />
  );
}
