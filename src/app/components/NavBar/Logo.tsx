import Link from "next/link";

export const Logo = () => (
  <div className="flex items-center">
    <Link href="/" className="flex-shrink-0 flex items-center">
      <span className="text-2xl font-bold text-blue-600">ShopKart</span>
    </Link>
  </div>
);
