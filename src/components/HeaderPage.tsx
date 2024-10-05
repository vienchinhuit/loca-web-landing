"use client";
import { SuccessResponse } from "@/types/type";
import { http } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// interface MenuItem {
//   name: string;
//   link: string;
// }

interface MenuItem {
  id: number;
  name: string;
  link: string;
}

interface TDataContacts {
  address: string;
  email: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  zalo: string;
  image: string;
  name: string;
  phone: number;
  tax_code: number;
  thumb: string;
}

export default function HeaderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dataMenu, setDataMenu] = useState<MenuItem[]>([]);
  const [dataContacts, setDataContacts] = useState<TDataContacts>({
    address: "",
    email: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    zalo: "",
    image: "",
    name: "",
    phone: 0,
    tax_code: 0,
    thumb: "",
  });
  const getData = async () => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>(`menu/getMenus?publish=1&sort=1`)
      ).data;
      const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;

      console.log("resContact", resContact);

      let data = {};

      resContact.data.forEach((item: { key: string; content: {} }) => {
        if (item.key == "SOCIAL" || item.key == "CONTACT") {
          data = { ...data, ...item.content };
        }
      });

      setDataContacts(data as TDataContacts);

      if (res.statusCode === 200) {
        const mainMenu: MenuItem[] = res?.mainMenu || [];
        setDataMenu(mainMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <header className="header shadow-md">
      <div className="bg-greenCustom text-white h-10 pt-2">
        <div className="container flex lg:justify-between items-center">
          <div className="flex text-[14px]">
            <div className="lg:mr-20 md:mr-20 mr-5 flex">
              <i className="fi fi-sr-tty-answer mt-[2px]" />
              <div className="ml-1">{dataContacts?.phone}</div>
            </div>
            <div className="hidden md:flex">
              <i className="fi fi-sr-envelope mt-[2px]" />
              <div className="ml-1">{dataContacts?.email}</div>
            </div>
          </div>
          <div className="hidden lg:flex">
            <Link target="_blank" href={dataContacts?.facebook}>
              <Image
                width={10}
                height={10}
                alt=""
                src="./images/fb.png"
                className="w-2 h-4 ml-4"
              />
            </Link>
            <Link target="_blank" href={dataContacts?.zalo}>
              <Image
                width={10}
                height={10}
                alt=""
                src="./images/zalo.png"
                className="w-4 h-4 ml-4"
              />
            </Link>
            <Link target="_blank" href={dataContacts?.youtube}>
              <Image
                width={10}
                height={10}
                alt=""
                src="./images/yt.png"
                className="w-4 h-4 ml-4"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="container py-5 flex items-center lg:justify-between">
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            // ref={buttonRef} onClick={toggleMenu}
          >
            <i className="fi fi-sr-menu-burger text-[20px] md:text-[30px] mr-5"></i>
          </button>
          {/* {isMenuOpen && ( */}
          <ul
            // ref={menuRef}
            className={
              `
              menu w-[220px] md:w-[300px] text-[15px] flex-col block fixed h-[100%] top-0 bottom-0 z-10 bg-white border border-gray-300 shadow-lg ${
                !isMenuOpen
                  ? "left-[-300px] transition-all duration-300 ease-in-out"
                  : "left-0 transition-all duration-300 ease-in-out"
              } `
              // {
              //   "left-0 transition-all duration-300 ease-in-out ": isMenuOpen,
              //   "left-[-300px] transition-all duration-300 ease-in-out":
              //     !isMenuOpen,
              // }
            }
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
                // onClick={toggleMenu}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="fi fi-sr-cross mr-4 hover:text-green-500"></i>
              </button>
            </div>
            <div className="ml-2 font-semibold">
              {dataMenu?.map((item: MenuItem, index) => (
                <li key={index} className="hover:text-greenCustom my-3 mx-2">
                  <Link className="ml-0 lg:ml-10" href={item?.link}>
                    {item?.name}
                  </Link>
                </li>
              ))}
              {/* <li
                className="hover:text-greenCustom py-3 mx-2 border-t-[1px]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Link className="ml-0 lg:ml-10" href="/">
                  Trang chủ
                </Link>
              </li>
              <li
                className="hover:text-greenCustom py-3 mx-2 border-t-[1px]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Link className="ml-0 lg:ml-10" href="/ve-chung-toi">
                  Về chúng tôi
                </Link>
              </li>
              <li
                className="hover:text-greenCustom py-3 mx-2 border-t-[1px]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Link className="ml-0 lg:ml-10" href="#">
                  Tin tức
                </Link>
              </li>
              <li
                className="hover:text-greenCustom py-3 mx-2 border-t-[1px]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Link className="ml-0 lg:ml-10" href="/lien-he">
                  Liên hệ
                </Link>
              </li> */}
            </div>
          </ul>
          {/* )} */}
        </div>
        <div className="logo lg:mb-0">
          <Link href="/">
            <Image
              alt="ww"
              width={207}
              height={750}
              src="./images/logo.png"
              className="h-[48px] w-auto"
            />
          </Link>
        </div>
        <ul className="menu font-bold text-[16px] text-col hidden lg:flex lg:flex-row lg:text-left">
          {dataMenu?.map((item: MenuItem, index) => (
            <li key={index} className="hover:text-greenCustom my-2">
              <Link className="ml-0 lg:ml-10" href={item?.link}>
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
