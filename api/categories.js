const categories = [
  { name: "Shirts", image: "/shirts-min.jpeg", description: "Precision-cut Italian fabrics." },
  { name: "Pants", image: "/pants-min.jpeg", description: "Tailored for movement." },
  { name: "Jackets", image: "/jakets-min.jpeg", description: "Architectural silhouettes." },
  { name: "Accessories", image: "/accs-min.jpeg", description: "The finishing touch of luxury." }
];

export default function handler(req, res) {
  res.status(200).json(categories);
}
