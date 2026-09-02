export interface CrustType {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  crunchLevel: number; // 1 to 5
  cheeseDepth: number; // 1 to 5
  thickness: string;
  bakeStyle: string;
  highlight: string;
  extraCost: number;
}

export const CRUST_TYPES: CrustType[] = [
  {
    id: "stuffed-crust",
    name: "Stuffed Cheesy Crust",
    subtitle: "Molten Ring of Pure Mozzarella",
    description: "Our world-famous innovation. A continuous ring of creamy 100% whole milk mozzarella hand-rolled directly inside the dough rim, brushed with garlic herb butter and parmesan dust.",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1000&q=80",
    crunchLevel: 3,
    cheeseDepth: 5,
    thickness: "Thick & Molten (18mm)",
    bakeStyle: "Stone Oven High Heat",
    highlight: "Over 1/4 lb of melted cheese in the crust ring alone",
    extraCost: 2.99,
  },
  {
    id: "pan-pizza",
    name: "Golden Deep Pan",
    subtitle: "Crispy Outside, Soft & Airy Inside",
    description: "Baked inside seasoned cast-iron pans that infuse the crust with a buttery, crispy outer shell while maintaining a cloud-like, pillowy interior that soaks in every drop of rich sauce.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    crunchLevel: 4,
    cheeseDepth: 4,
    thickness: "Deep Golden (22mm)",
    bakeStyle: "Cast Iron Pan 480°F",
    highlight: "Sizzling caramelized crust edges with decadent golden crunch",
    extraCost: 1.99,
  },
  {
    id: "thin-crispy",
    name: "Thin 'N Crispy",
    subtitle: "Ultra-Light, Extra Crunchy Bite",
    description: "Rolled to delicate perfection for pizza enthusiasts who crave a cracker-crisp crunch in every single bite. Allows the rich toppings and gourmet cheeses to take center stage.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
    crunchLevel: 5,
    cheeseDepth: 2,
    thickness: "Ultra-Thin Cracker (4mm)",
    bakeStyle: "Direct Stone Hearth",
    highlight: "Shatteringly crisp texture with zero sogginess",
    extraCost: 0.00,
  },
  {
    id: "classic-hand-tossed",
    name: "Classic Hand-Tossed",
    subtitle: "The Timeless Neapolitan-Style Craft",
    description: "Proofed for 72 hours and hand-stretched in the air by our pizzaiolos. Features blistered leopard-spotting, a tender chew, and fragrant wood-fired aromatics.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80",
    crunchLevel: 3,
    cheeseDepth: 3,
    thickness: "Traditional Medium (10mm)",
    bakeStyle: "500°C Beechwood Fire Oven",
    highlight: "Airy honeycomb crumb with authentic sourdough notes",
    extraCost: 0.00,
  },
];
