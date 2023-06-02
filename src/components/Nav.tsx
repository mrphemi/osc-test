import Link from "next/link";

// Todo: track and display number of items in cart here.
// Use global state like context or redux

const Nav = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-5 md:px-10 border-b border-gray-600">
      <Link href="/" className="text-xl font-bold">
        SHOP
      </Link>

      <Link href="/cart" className="text-xl font-bold">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.83315 5.35571H12.7621C12.6945 2.88976 10.8996 1 8.79764 1C6.69568 1 4.90077 2.88976 4.83315 5.35571ZM13.754 5.35571H16.3689C16.5098 5.35571 16.6441 5.41617 16.7381 5.52199C16.8322 5.6278 16.8771 5.76897 16.8618 5.91022L15.7043 16.5547C15.6767 16.8082 15.4643 17.0002 15.2114 17.0002H2.7711C2.52266 17.0002 2.31257 16.8147 2.27966 16.5664L0.869088 5.92194C0.850153 5.77906 0.893292 5.63488 0.98744 5.52641C1.08159 5.41793 1.21758 5.35571 1.36053 5.35571H3.84125C3.90986 2.43279 6.05651 0 8.79764 0C11.5388 0 13.6854 2.43279 13.754 5.35571ZM3.20506 16.0002L1.927 6.35571H15.8158L14.767 16.0002H3.20506Z"
            className="fill-gray-800"
          />
        </svg>
      </Link>
    </nav>
  );
};

export default Nav;
