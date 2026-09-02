export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  quote: string;
  favoritePizza: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Chef Marco Valenti",
    role: "Michelin Guide Food Critic",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2 days ago",
    quote: "The crust fermentation here is exceptional. The Pan Pizza manages a crisp exterior with a featherlight crumb that rivals high-end pizzerias in Naples.",
    favoritePizza: "Pepperoni Supreme (Pan Crust)",
  },
  {
    id: "2",
    name: "Elena Rostova",
    role: "Lifestyle & Food Creator",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "1 week ago",
    quote: "The Stuffed Cheesy Crust is honestly iconic! When it arrives steaming hot with that golden garlic herb butter sheen, it's game over. 10/10 every single weekend.",
    favoritePizza: "Smokey BBQ Feast",
  },
  {
    id: "3",
    name: "David Chen",
    role: "Tech Lead & Weekend Host",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2 weeks ago",
    quote: "Ordered 12 pizzas for our launch party. Arrived in exactly 28 minutes, piping hot, flawless presentation, and the Carnivore Meat Feast disappeared in 5 minutes flat.",
    favoritePizza: "Carnivore Meat Feast",
  },
  {
    id: "4",
    name: "Sophia Martinez",
    role: "Culinary Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "3 weeks ago",
    quote: "The Black Truffle Forest pizza is a work of culinary art. Earthy, rich, and balanced with the crisp thin crust. You can genuinely taste the quality of every ingredient.",
    favoritePizza: "Black Truffle Forest",
  },
];
