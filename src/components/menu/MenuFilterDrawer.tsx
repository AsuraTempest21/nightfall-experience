import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

export interface MenuFilters {
  vegOnly: boolean;
  nonVegOnly: boolean;
  alcoholFree: boolean;
  under500: boolean;
  highProtein: boolean;
  glutenFree: boolean;
}

interface MenuFilterDrawerProps {
  filters: MenuFilters;
  onChange: (filters: MenuFilters) => void;
}

const filterOptions: { key: keyof MenuFilters; label: string }[] = [
  { key: "vegOnly", label: "Veg Only" },
  { key: "nonVegOnly", label: "Non-Veg Only" },
  { key: "alcoholFree", label: "No Alcohol" },
  { key: "under500", label: "Under ₹500" },
  { key: "highProtein", label: "High Protein" },
  { key: "glutenFree", label: "Gluten Free" },
];

const activeCount = (f: MenuFilters) =>
  Object.values(f).filter(Boolean).length;

const MenuFilterDrawer = ({ filters, onChange }: MenuFilterDrawerProps) => {
  const count = activeCount(filters);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter{count > 0 && ` (${count})`}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-background border-border">
        <SheetHeader>
          <SheetTitle className="font-heading text-sm uppercase tracking-[0.2em] text-primary">
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {filterOptions.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <span
                className={`w-4 h-4 rounded-sm border transition-colors ${
                  filters[key]
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/40 group-hover:border-foreground"
                }`}
              />
              <span className="text-sm text-foreground">{label}</span>
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={() => onChange({ ...filters, [key]: !filters[key] })}
                className="sr-only"
              />
            </label>
          ))}
          {count > 0 && (
            <button
              onClick={() =>
                onChange({
                  vegOnly: false,
                  nonVegOnly: false,
                  alcoholFree: false,
                  under500: false,
                  highProtein: false,
                  glutenFree: false,
                })
              }
              className="text-xs text-primary/70 hover:text-primary transition-colors uppercase tracking-[0.1em] mt-4"
            >
              Clear all
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuFilterDrawer;
