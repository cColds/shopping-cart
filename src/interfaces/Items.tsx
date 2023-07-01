interface Edge {
  node: { price: { amount: string } };
}

export default interface Items {
  node: {
    title: string;
    featuredImage: { url: string };
    variants: { edges: Edge[] };
  };
}
