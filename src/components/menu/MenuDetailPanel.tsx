import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MenuItem } from "@/data/menuData";

interface MenuDetailPanelProps {
  item: MenuItem | null;
  onClose: () => void;
}

const MacroBar = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}{label === "Calories" ? " kcal" : "g"}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
};

const MenuDetailPanel = ({ item, onClose }: MenuDetailPanelProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showMacros, setShowMacros] = useState(false);

  if (!item) return null;

  const images = item.images;
  const hasMultipleImages = images.length > 1;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel — slide-in right on desktop, fullscreen on mobile */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-[480px] bg-accent overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-sm bg-background/30 backdrop-blur-sm text-foreground hover:bg-background/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="relative aspect-[4/3] bg-muted">
              <img
                src={images[imageIndex]}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/30 backdrop-blur-sm text-primary hover:bg-background/50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/30 backdrop-blur-sm text-primary hover:bg-background/50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                          i === imageIndex ? "bg-primary" : "bg-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Name + Price */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-block w-3.5 h-3.5 rounded-sm border-2 shrink-0 ${
                      item.isVeg ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <span
                      className={`block w-2 h-2 rounded-full m-auto mt-[1px] ${
                        item.isVeg ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </span>
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">{item.name}</h2>
                </div>
                <p className="text-primary text-lg font-medium">₹{item.price}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.longDescription || item.description}
              </p>

              {/* Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div>
                  <h3 className="font-heading text-xs uppercase tracking-[0.2em] text-primary mb-3">
                    Ingredients
                  </h3>
                  <ul className="space-y-1.5">
                    {item.ingredients.map((ing) => (
                      <li key={ing} className="text-sm text-muted-foreground">{ing}</li>
                    ))}
                  </ul>
                  <div className="w-8 h-px bg-primary/40 mt-5" />
                </div>
              )}

              {/* Macros — expandable */}
              {item.macros && (
                <div>
                  <button
                    onClick={() => setShowMacros(!showMacros)}
                    className="text-xs uppercase tracking-[0.15em] text-primary/70 hover:text-primary transition-colors"
                  >
                    {showMacros ? "Hide" : "View"} Nutritional Information
                  </button>
                  <AnimatePresence>
                    {showMacros && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          <MacroBar label="Calories" value={item.macros.calories} max={800} />
                          <MacroBar label="Protein" value={item.macros.protein} max={60} />
                          <MacroBar label="Carbs" value={item.macros.carbs} max={80} />
                          <MacroBar label="Fats" value={item.macros.fats} max={60} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Pairing */}
              {item.pairing && (
                <p className="text-xs text-muted-foreground italic">
                  Pairs well with: <span className="text-primary">{item.pairing}</span>
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuDetailPanel;
