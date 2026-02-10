import { Link } from "react-router-dom";

const StickyReserve = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3">
    <Link
      to="/reserve"
      className="block w-full text-center py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] font-medium"
    >
      Reserve a Table
    </Link>
  </div>
);

export default StickyReserve;
