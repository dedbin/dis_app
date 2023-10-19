import { Menu } from "lucide-react"
import { 
    Sheet,
    SheetTrigger,
    SheetContent
} from "../ui/sheet"
import { Button } from "./button"
import { NavigationSidebar } from "../navigation/navigation-sidebar"
import { SeverSidebar } from "../server/server-sidebar"
export const MobileToggle = ({serverId}: {serverId: string}) => {
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size="icon" className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar/>
                </div>
                <SeverSidebar serverId={serverId}/>
            </SheetContent>
        </Sheet>
    )
}