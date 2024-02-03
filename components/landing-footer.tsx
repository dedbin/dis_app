import { GithubIcon } from "lucide-react";
import Link from "next/link";

const LandingFooter = () => {
    return ( 
        <div>
          <div className="flex justify-center">
              <hr className="border-t border-emerald-500 w-full max-w-screen-md mx-auto" />
          </div>
          <h3 className="text-4xl font-extrabold text-white text-center mb-10 pt-32" >
            Мы в соцсетях
          </h3>
          <div className="flex flex-row justify-center gap-4 text-white pt-4">
            <Link href="https://github.com/dedbin/dis_app">
              <GithubIcon className="w-8 h-8"/>
              <p className="text-zinc-400 text-sm font-medium pl-1">dis_app</p>
            </Link>
            
            <Link href="https://t.me/math_is_ez">
              <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#F0F0F0"/>
              </svg>
              <p className="text-zinc-400 text-sm font-medium pl-1">goga</p>
            </Link>
            
          </div>
          <p className="text-white text-center py-10">Сделано с ❤️ в Dis App</p>
          <div></div>
        </div>
     );
}
 
export default LandingFooter;