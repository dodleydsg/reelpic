import { useSelector } from "react-redux";

export default function Mask() {
  const ui = useSelector((state) => state.ui);
  return (
    <div
      className={
        ui.mask
          ? "fixed inset-0 bg-black/70 z-[53] backdrop-blur"
          : "fixed inset-0 bg-black/70 z-[53] backdrop-blur hidden"
      }
    >
      {/* A ui mask for modals and ui items */}
    </div>
  );
}
