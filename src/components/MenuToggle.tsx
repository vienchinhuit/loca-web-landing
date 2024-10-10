"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
interface MenuItem {
    id: number;
    name: string;
    link: string;
}

export function MenuToggle({ mainMenu }: { mainMenu: MenuItem[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="lg:hidden">
            <button
                onClick={toggleMenu}
            // onClick={() => console.log(11)}
            // onClick={(isMenuOpen = !isMenuOpen)}
            >
                <i className="fi fi-sr-menu-burger text-[20px] md:text-[30px] mr-5"></i>
            </button>
            <ul
                className={`
              menu w-[220px] md:w-[300px] text-[15px] flex-col block fixed h-[100%] top-0 bottom-0 z-10 bg-white border border-gray-300 shadow-lg ${!isMenuOpen
                        ? "left-[-300px] transition-all duration-300 ease-in-out"
                        : "left-0 transition-all duration-300 ease-in-out"
                    } `}
            >
                <div className="ml-4 my-8 flex justify-between items-center">
                    <Image
                        alt=""
                        width={207}
                        height={750}
                        src="./images/logo.png"
                        className="w-[100px] sm:w-[150px] md:w-[120px] lg:w-[190px] lg:h-auto "
                    />
                    <button
                        onClick={toggleMenu}

                    // onClick={() => (isMenuOpen = !isMenuOpen)}
                    >
                        <i className="fi fi-sr-cross mr-4 hover:text-green-500"></i>
                    </button>
                </div>
                <div className="ml-2 font-semibold">
                    {mainMenu?.map((item: MenuItem, index) => (
                        <li
                            onClick={toggleMenu}
                            // onClick={() => (isMenuOpen = !isMenuOpen)}
                            key={index}
                            className="hover:text-greenCustom my-3 mx-2"
                        >
                            <Link className="ml-0 lg:ml-10" href={item?.link || '#'}>
                                {item?.name}
                            </Link>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}