"use client";

import Link from 'next/link';
import {
  Settings,
  User,
  LogOut,
  Baby,
  Dumbbell,
  ArrowLeft,
  Bookmark,
  CheckCircle,
  ChevronDown,
  Filter,
  Gamepad2,
  List,
  LogIn,
  MapPin,
  Search,
  Eye,
  Home,
  Shirt,
  Smartphone,
  Monitor,
  Tv,
  HeartPulse,
  Headphones,
  EyeOff,
  Watch,
  Footprints
} from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
// import Logout from '../user/logout';

export default function DropDownMenu() {
  return(
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden sm:inline" asChild>
        <Button className="bg-blue-900 color-white py-2">Menu <ChevronDown className="inline" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] text-gray-700 text-xlg m-[20px]">
         <DropdownMenuLabel>Categories</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuGroup>
            <DropdownMenuItem>
              <Home className="mr-4 h-6 w-6" />
              <Link href="/">Home & Office</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Smartphone className="mr-4 h-6 w-6" />
              <Link href="/" >Phones & Tablets</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Monitor className="mr-4 h-6 w-6" />
              <Link href="/" >Computing</Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Shirt className="mr-4 h-6 w-6" />
              <span>Clothes</span>
            </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link href="/">Men's Fashion</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/">Women's Fashion</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Headphones className="mr-4 h-6 w-6" />
              <Link href="/">Accessories</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Baby className="mr-4 h-6 w-6" />
              <Link href="/">Baby Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Footprints className="mr-4 h-6 w-6" />
              <Link href="/">Shoes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Watch className="mr-4 h-6 w-6" />
              <Link href="/">Watches</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tv className="mr-4 h-6 w-6" />
              <Link href="/">Electronics</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HeartPulse className="mr-4 h-6 w-6" />
              <Link href="/">Health & Beauty</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Gamepad2 className="mr-4 h-6 w-6" />
              <Link href="/">Gaming</Link>
            </DropdownMenuItem>
         </DropdownMenuGroup>
         <DropdownMenuSeparator />
         <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings className="mr-4 h-6 w-6" />
              <Link href="/">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/">FAQ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
             {/* <Logout />*/}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
   )
}