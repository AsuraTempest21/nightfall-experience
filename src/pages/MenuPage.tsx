import { useState, useRef, useCallback, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import SEOHead from "@/components/SEOHead";
import PageLoader from "@/components/PageLoader";
import MenuCategoryTabs from "@/components/menu/MenuCategoryTabs";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuDetailPanel from "@/components/menu/MenuDetailPanel";
import MenuFilterDrawer, { type MenuFilters } from "@/components/menu/MenuFilterDrawer";
import { useMenu } from "@/hooks/use-menu";
import type { MenuItem } from "@/data/menuData";

const alcoholCategories = ["signature-cocktails", "classic-cocktails", "spirits"];

const initialFilters: MenuFilters = {
  vegOnly: false,
  nonVegOnly: false,
  alcoholFree: false,
  under500: false,
  highProtein: false,
  glutenFree: false,
};

const MenuPage = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useMenu();
  const categories = data?.categories ?? [];
  const menuItems = data?.items ?? [];
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [filters, setFilters] = useState<MenuFilters>(initialFilters);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, [activeCategory, categories]);

  // Scroll to category section on tab click
  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 60; // sticky tabs height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Update active tab on scroll
  useEffect(() => {
    if (categories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Filter items
  const filterItems = (items: MenuItem[]) =>
    items.filter((item) => {
      if (filters.vegOnly && !item.isVeg) return false;
      if (filters.nonVegOnly && item.isVeg) return false;
      if (filters.alcoholFree && alcoholCategories.includes(item.category)) return false;
      if (filters.under500 && item.price >= 500) return false;
      if (filters.highProtein && !item.tags?.includes("High Protein")) return false;
      if (filters.glutenFree && !item.tags?.includes("Gluten Free")) return false;
      return true;
    });

  // Lock body scroll when panel open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : "Failed to load menu data.";

    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4 py-24">
        <section className="max-w-lg rounded-sm border border-border/60 bg-background/80 p-6 text-center shadow-sm backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary/60 mb-3">
            Tichuka
          </p>
          <h1 className="font-heading text-2xl uppercase tracking-[0.15em] text-foreground">
            Menu unavailable
          </h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center justify-center rounded-sm border border-primary/30 px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/10"
          >
            Retry {isFetching ? "..." : "load"}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-16 md:pb-0">
      <SEOHead
        title="Menu — Tichuka | Crafted Cocktails & Global Flavours"
        description="Explore Tichuka's curated menu — signature cocktails, Asian mains, sushi specialties, and more. Global flavours, crafted in-house."
      />
      {/* Hero */}
      <section className="relative flex items-end justify-center py-24 md:py-32 bg-gradient-to-b from-accent/30 via-background to-background">
        <div className="container text-center">
          <FadeIn>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-primary/60 mb-4">
              Tichuka
            </p>
            <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-[0.15em] text-foreground">
              Menu
            </h1>
            <div className="gold-divider mt-5 mb-4" />
            <p className="text-sm md:text-base text-muted-foreground tracking-wide">
              Global Flavours &amp; Crafted Cocktails
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      {categories.length > 0 && (
        <MenuCategoryTabs
          categories={categories}
          activeCategory={activeCategory || categories[0].id}
          onSelect={handleCategorySelect}
        />
      )}

      {/* Filter bar */}
      <div className="container flex justify-end pt-4">
        <MenuFilterDrawer filters={filters} onChange={setFilters} />
      </div>

      {/* Menu Sections */}
      <section className="pb-16 md:pb-24 menu-texture">
        <div className="container">
          {categories.map((cat, catIdx) => {
            const items = filterItems(menuItems.filter((i) => i.category === cat.id));
            if (items.length === 0) return null;

            return (
              <div
                key={cat.id}
                id={cat.id}
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
                className={`pt-12 md:pt-16 ${catIdx > 0 ? "border-t border-border/40" : ""}`}
              >
                <FadeIn>
                  <h2 className="section-heading mb-2">{cat.label}</h2>
                  <p className="text-xs text-muted-foreground mb-6">{cat.tagline}</p>
                  <div className="gold-divider-left mb-8" />
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {items.map((item, i) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      index={i}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detail Panel */}
      <MenuDetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
};

export default MenuPage;
