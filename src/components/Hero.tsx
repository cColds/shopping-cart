import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex items-center flex-col gap-5 max-w-4xl">
      <h1 className="text-3xl text-center">
        Your one-stop destination for all your shopping needs
      </h1>
      <p className="text-center text-lg text-body-color">
        Discover an unparalleled shopping experience with our extensive
        selection of products, unbeatable prices, and exceptional customer
        service. Shop now and transform your shopping journey with us.
      </p>

      <Link
        to="/store"
        className="bg-primary-color text-white p-3 rounded-lg text-center text-sm text-ellipsis overflow-hidden whitespace-nowrap font-bold w-[150px]"
      >
        Shop now
      </Link>
    </div>
  );
}
