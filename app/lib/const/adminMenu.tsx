import { FaProductHunt, FaStore } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { MdBrandingWatermark, MdSpaceDashboard } from "react-icons/md";

export const adminMenu = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    url: "#",
  },
  {
    title: "Store Management",
    icon: <FaStore />,
    url: "#",
  },
  {
    title: "Product Management",
    icon: <FaProductHunt />,
    url: "#",
  },
  {
    title: "Category Management",
    icon: <BiSolidCategory />,
    url: "#",
  },
  {
    title: "Branding Management",
    icon: <MdBrandingWatermark />,
    url: "#",
  },
  {
    title: "Logout",
    icon: <IoLogOut />,
    url: "#",
  },
];
