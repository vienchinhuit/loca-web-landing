// "use client";
import { SuccessResponse } from "@/types/type";
import { http } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuToggle } from "./MenuToggle";

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

export default async function HeaderPage() {
  let isMenuOpen: boolean = false;
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [dataMenu, setDataMenu] = useState<MenuItem[]>([]);
  // const [dataContacts, setDataContacts] = useState<TDataContacts>({
  //   address: "",
  //   email: "",
  //   facebook: "",
  //   tiktok: "",
  //   youtube: "",
  //   zalo: "",
  //   image: "",
  //   name: "",
  //   phone: 0,
  //   tax_code: 0,
  //   thumb: "",
  // });
  const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;

  let data = {} as TDataContacts;

  resContact.data.forEach((item: { key: string; content: {} }) => {
    if (item.key == "SOCIAL" || item.key == "CONTACT") {
      data = { ...data, ...item.content };
    }
  });
  const res = (
    await http.get<SuccessResponse<[]>>(`menu/getMenus?publish=1&sort=1`)
  ).data;
  // if (res.statusCode === 200) {
  //   const mainMenu: MenuItem[] = res?.mainMenu || [];
  //   // setDataMenu(mainMenu);
  // }
  // const getData = async () => {
  //   try {
  //     const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;

  //     let data = {};

  //     resContact.data.forEach((item: { key: string; content: {} }) => {
  //       if (item.key == "SOCIAL" || item.key == "CONTACT") {
  //         data = { ...data, ...item.content };
  //       }
  //     });

  //     // setDataContacts(data as TDataContacts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getMenus = async () => {
  //   const res = (
  //     await http.get<SuccessResponse<[]>>(`menu/getMenus?publish=1&sort=1`)
  //   ).data;
  //   if (res.statusCode === 200) {
  //     const mainMenu: MenuItem[] = res?.mainMenu || [];
  //     // setDataMenu(mainMenu);
  //   }
  // };
  // useEffect(() => {
  //   getMenus();
  //   getData();
  // }, []);

  return (
    <header className="header shadow-md">
      <div className="bg-greenCustom text-white h-10 pt-2">
        <div className="container flex lg:justify-between items-center">
          <div className="flex text-[14px]">
            <div className="lg:mr-20 md:mr-20 mr-5 flex">
              <i className="fi fi-sr-tty-answer mt-[2px]" />
              <div className="ml-1">{data?.phone}</div>
            </div>
            <div className="hidden md:flex">
              <i className="fi fi-sr-envelope mt-[2px]" />
              <div className="ml-1">{data?.email}</div>
            </div>
          </div>
          <div className="hidden lg:flex">
            <Link target="_blank" href={data?.facebook || "#"}>
              <Image
                width={10}
                height={10}
                alt=""
                src="./images/fb.png"
                className="w-[25px] h-[25px] ml-4"
              />
            </Link>
            <Link target="_blank" href={`https://zalo.me/${data?.zalo}`}>
              <Image
                width={10}
                height={10}
                alt=""
                src="./images/zalo.png"
                className="w-[20px] h-[20px] ml-4"
              />
            </Link>
            <Link target="_blank" href={data?.youtube || "#"}>
              <Image
                width={10}
                height={10}
                alt=""
                src="./images/yt.png"
                className="w-[25px] h-[25px] ml-4"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="container py-5 flex items-center lg:justify-between">
        <MenuToggle mainMenu={res?.mainMenu as MenuItem[]} />
        {/* ds÷ */}
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
          {res?.mainMenu?.map((item: MenuItem, index) => (
            <li key={index} className="hover:text-greenCustom my-2">
              <Link className="ml-0 lg:ml-10" href={item?.link || '#'}>
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
