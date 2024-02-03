import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import LandingFooter from "@/components/landing-footer";


const LandingPage = () => {
    return ( 
         <div className="bg-zinc-900">
          <LandingNavbar/>
          <LandingHero/>
          <LandingContent/>
          <LandingFooter/>
         </div>
    );
}
 
export default LandingPage;