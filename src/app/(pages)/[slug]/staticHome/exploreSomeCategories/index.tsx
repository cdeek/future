import Link from 'next/link';

import './style.css';

export default function Catgories() {
 const array = [
   {image: "/logo-bkack.svg", title: "Watches", href: '/'},
   {image: "/logo-bkack.svg", title: "Suites", href: '/'},
   {image: "/logo-bkack.svg", title: "Caps", href: '/'},
   {image: "/logo-bkack.svg", title: "T-shirts", href: '/'},
   {image: "/logo-bkack.svg", title: "Dress", href: '/'},
   {image: "/logo-bkack.svg", title: "Sneakers", href: '/'}
  ];
  return(
    <section className="p-4">
      <h1 className="text-2xl"><b>Explore Some Catgories</b></h1><br /><br />
      <div className="grid grid-cols-3 text-center">
       { array.map(i => (
        <Link href={i.href} className="my-4">
          <div className="category-circle">
            <img className="w-[100px]" src={i.image} alt="cat" />
          </div>
          <p><b>{i.title}</b></p>
        </Link>
        ))
       }
      </div>
    </section>
    )
}