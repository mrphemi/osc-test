import Link from "next/link";

const Banner = () => {
  return (
    <header className="banner min-h-[585px] max-h-[720px] bg-no-repeat bg-cover flex items-end pb-6 xl:pb-8">
      <Link href="/" className="w-full container">
        <div className="bg-gray-800 text-white flex items-center max-w-[448px] xl:min-w-[448px]">
          <div className="w-11/12 border-r border-function-light-grey-default/20 py-6 px-6 xl:py-8 xl:px-8">
            <span className="capitalize text-sm leading-6 opacity-50">
              what’s new
            </span>
            <p className="capitalize font-light text-xl xl:text-2xl">
              new collection
            </p>
          </div>
          <div className="px-6 xl:px-8">
            <svg
              width="7"
              height="13"
              viewBox="0 0 7 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.00246 0.265855C0.802456 0.065855 0.492456 0.065855 0.292456 0.265855C0.0924555 0.465855 0.0924556 0.775855 0.292456 0.975855L5.43746 6.12085L0.292456 11.2659C0.0924561 11.4659 0.0924562 11.7759 0.292456 11.9759C0.492456 12.1759 0.802456 12.1759 1.00246 11.9759L6.85746 6.12085L1.00246 0.265855Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Banner;
