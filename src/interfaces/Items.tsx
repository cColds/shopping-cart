export default interface Items {
  node: {
    title: string;
    featuredImage: { url: string };
    variants: { edges: [{ node: { price: { amount: string } } }] };
  };
}
