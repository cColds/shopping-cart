interface Edge {
  node: { price: { amount: string } };
}

export default interface Item {
  node: {
    title: string;
    description: string;
    featuredImage: { url: string };
    variants: { edges: Edge[] };
    quantity?: number;
    id?: string;
  };
}
