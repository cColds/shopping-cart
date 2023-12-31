import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex max-w-4xl flex-col items-center gap-5 p-12">
      <h1 className="text-center">
        Your one-stop destination for all your shopping needs
      </h1>
      <p className="text-center text-lg">
        Discover an unparalleled shopping experience with our extensive
        selection of products, unbeatable prices, and exceptional customer
        service. Shop now and transform your shopping journey with us.
      </p>
      <Link
        to="/store"
        className="w-[150px] overflow-hidden truncate rounded-lg bg-primary-color  p-3 text-center font-bold text-white transition duration-150 ease-in-out active:scale-95"
      >
        Shop now
      </Link>
    </section>
  );
}
