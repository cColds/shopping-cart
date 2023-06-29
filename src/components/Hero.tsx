import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex max-w-4xl flex-col items-center gap-5 py-12">
      <h1 className="text-center text-3xl">
        Your one-stop destination for all your shopping needs
      </h1>
      <p className="text-center text-lg text-body-color">
        Discover an unparalleled shopping experience with our extensive
        selection of products, unbeatable prices, and exceptional customer
        service. Shop now and transform your shopping journey with us.
      </p>

      <Link
        to="/store"
        className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-primary-color p-3 text-center text-sm font-bold text-white"
      >
        Shop now
      </Link>
    </div>
  );
}
