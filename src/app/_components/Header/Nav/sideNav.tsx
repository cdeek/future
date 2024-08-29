import Link from 'next/link';
import {
  Settings,
  Baby,
  Dumbbell,
  Bookmark,
  Gamepad2,
  Home,
  Shirt,
  Smartphone,
  Monitor,
  Tv,
  HeartPulse,
  Headphones,
  Watch,
  Footprints
} from "lucide-react";
import { Separator } from '@/components/ui/separator';
// import Logout from '../../user/logout';


export default function SideNav({ sideNav, close }) {
  return(
    <aside ref={sideNav} className="side-nav w-0">
        <button className="text-black p-2 text-[30px] float-right" onClick={close}>&times;</button>
        <div className="flip">
          <span style={{'--i': 1}}>D</span>
          <span style={{'--i': 2}}>I</span>
          <span style={{'--i': 3}}>K</span>
          <span style={{'--i': 4}}>S</span>
          <span style={{'--i': 5}}>A</span>
        </div>
        <div className="categories">
          <h3 className="my-4 text-2xl">Categories</h3>
          <Separator />
          {/*categories.map((category, index) => (
            <Link key={index} onClick={close} className="block" href={`/search/${category.title}`}>
              <category.icon className="mr-2 h-6 w-6 inline my-2" />
              <span>{category.title}</span>
            </Link>
          ))*/}
          <Link onClick={close} className="block" href="/search_result/home+and+office">
            <Home className="mr-2 h-6 w-6 inline my-2" />
            <span>Home & Office</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/phone">
            <Smartphone className="mr-2 h-6 w-6 inline my-2" />
            <span>Phone & Tablets</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/computing">
            <Monitor className="mr-2 h-6 w-6 inline my-2" />
            <span>Computing</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/clothing">
            <Shirt className="mr-2 h-6 w-6 inline my-2" />
            <span>Clothing</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/accessories">
            <Headphones className="mr-2 h-6 w-6 inline my-2" />
            <span>Accessories</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/health+and+beauty">
            <HeartPulse className="mr-2 h-6 w-6 inline my-2" />
            <span>Health & Beauty</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/watches">
            <Watch className="mr-2 h-6 w-6 inline my-2" />
            <span>Watches</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/shoes">
            <Footprints className="mr-2 h-6 w-6 inline my-2" />
            <span>Shoes</span>
          </Link>
          <Link className="block" href="/search_result/baby+products">
            <Baby className="mr-2 h-6 w-6 inline my-2" />
            <span>Baby Products</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/electronics">
            <Tv className="mr-2 h-6 w-6 inline my-2" />
            <span>Electronics</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/gaming">
            <Gamepad2 className="mr-2 h-6 w-6 inline my-2" />
            <span>Gaming</span>
          </Link>
          <Link onClick={close} className="block" href="/search_result/sports+fitness">
            <Dumbbell className="mr-2 h-6 w-6 inline my-2" />
            <span>Sports & Fitness</span>
          </Link>
        </div>
        <div className="m-6">
          <Link onClick={close} className="block" href="/">
            <Settings className="mr-2 h-6 w-6 inline my-2" />
            <span>Settings</span>
          </Link>
          <Link onClick={close} className="block" href="/">FAQ</Link>
          <Link onClick={close} className="block" href="/">About Us</Link>
          <br />
          {/*<Logout close={close} />*/}
        </div>
    </aside>
    )
}
