import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onClick: () => void;
}

const MenuItemCard = ({ item, index, onClick }: MenuItemCardProps) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    onClick={onClick}
    className="group w-full text-left bg-surface-elevated rounded-sm overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.15)]"
  >
    {/* Image */}
    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none" />
      <img
        src={item.images[0]}
        alt={item.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* Info */}
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* Veg / Non-Veg marker */}
            <span
              className={`inline-block w-3 h-3 rounded-sm border-2 shrink-0 ${
                item.isVeg
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full m-auto mt-[1px] ${
                  item.isVeg ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </span>
            <h3 className="font-heading text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
        </div>
        <span className="text-sm text-primary shrink-0 font-medium pt-0.5">
          ₹{item.price}
        </span>
      </div>
    </div>
  </motion.button>
);

export default MenuItemCard;
