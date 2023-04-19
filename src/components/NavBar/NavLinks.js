/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import React, { useState } from 'react';
import { links } from './Links';

function NavLinks() {
  const [isExpanded, setIsExpanded] = useState('');

  return (
    <>
      {links.map((link) => (
        <div key={link.id}>
          <div className="px-3 lg:curosr-pointer group  text-white">
            <h1 className="py-7 flex justify-between items-center lg:pr-0 pr-5 group" onClick={() => (isExpanded !== link.title ? setIsExpanded(link.title) : setIsExpanded(''))} key={link.url}>
              <Link href={link.url}>{link.title}</Link>
              {link.title === 'Blogs' && <img className={`w-5 h-3 m-1 inline lg:hidden ${isExpanded === link.title ? 'rotate-180' : ''}`} src="/images/arrow_white.png" alt="arrow" />}
              {link.title === 'Blogs' && <img className={`w-5 h-3 m-1 lg:mt-1 lg:m1-2 lg:block hidden group-hover:rotate-180  ${isExpanded === link.title ? 'rotate-180' : ''}`} src="/images/arrow_white.png" alt="arrow" />}
            </h1>
            {link.submenu && (
              <div className="absolute top-20 hidden group-hover:lg:block hover:lg:block">
                <div className="bg-white1">
                  {
                    link.sublinks.map((sublink) => (
                      <div className="p-3 text-white text-center border-solid border-2 border-blue2" key={sublink.id}>
                        <h1 className="my-3" key={sublink.url}><Link href={sublink.url}>{sublink.title}</Link></h1>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
          {/* Hamburger */}
          <div className={`${isExpanded === link.title ? 'lg:hidden' : 'hidden'}`}>
            {link.submenu && link.sublinks.map((slink) => (
              <div className="" key={slink.id}>
                <h1 className="py-3 pl-7 lg:pr-0 pr-5 text-white" key={slink.url}><Link href={slink.url}>{slink.title}</Link></h1>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default NavLinks;
