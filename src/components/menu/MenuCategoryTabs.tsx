import { useRef, useEffect } from "react";
import type { MenuCategory } from "@/data/menuData";

interface MenuCategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

const MenuCategoryTabs = ({ categories, activeCategory, onSelect }: MenuCategoryTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border relative">
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto py-3 px-4 md:px-6 max-w-screen-xl mx-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat, idx) => {
          const isActive = cat.id === activeCategory;
          const isLast = idx === categories.length - 1;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                isActive
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              } ${isLast ? "pr-8" : ""}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
      {/* Right fade hint */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/95 to-transparent pointer-events-none md:hidden" />
    </div>
  );
};

export default MenuCategoryTabs;
