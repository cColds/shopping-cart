export default async function fetchProducts(productsAmount: number) {
  try {
    const res = await fetch(
      `https://mock.shop/api?query={products(first:%20${productsAmount}){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%201){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const {
      data: {
        products: { edges },
      },
    } = await res.json();
    return edges;
  } catch (error) {
    console.error(error);
  }
}
