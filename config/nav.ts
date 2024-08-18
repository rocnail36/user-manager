import { Dictionary } from "@/app/dictionaries/types";
import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};


export const defaultLinks = (d:Dictionary) => {

 const Links: SidebarLink[] = [
    { href: "/dashboard", title: d.navBar.home, icon: HomeIcon },
    { href: "/account", title: d.navBar.account, icon: User },
    { href: "/settings", title: d.navBar.settings, icon: Cog },
  ];
  
  return Links
 
}

export const additionalLinks = (d:Dictionary) => {

  const links: AdditionalLinks[] = [
    {
      title: d.navBar.entities,
      links: [
        {
          href: "/workers",
          title: d.navBar.workers,
          icon: Globe,
        },
      ],
    },
  
  ];
  
  return links

}

