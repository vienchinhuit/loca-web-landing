"use client";
import { DataContent, SuccessResponse, TBanner } from "@/types/type";
import { http } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  google_map: string;
}
interface TMenuFooter {
  name: string;
  link: string;
}
interface MenuItem {
  name: string;
  children: TMenuFooter[] | undefined;
}

export default function FooterPage() {
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
    google_map: "",
  });
  const [copyright, setCopyright] = useState<string | undefined>("");
  const [dataMenu, setDataMenu] = useState<MenuItem[]>([]);
  const [googleMapFooter, setGoogleMapFooter] = useState<string | undefined>(
    ""
  );

  const getData = async () => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>(`menu/getMenus?publish=1&sort=1`)
      ).data;
      const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;
      const resGeneral = (
        await http.get<SuccessResponse<TBanner<DataContent>[]>>(
          "system?key=GENERAL_INFO"
        )
      ).data.data[0];
      const resGGMapBrand = (
        await http.get<SuccessResponse<TBanner<DataContent>[]>>(
          "system?key=CONTACT"
        )
      ).data;
      setGoogleMapFooter(resGGMapBrand?.data[0].content?.google_map_footer);

      setCopyright(resGeneral?.content?.copyright);

      let data = {};

      resContact.data.forEach((item: { key: string; content: {} }) => {
        if (item.key == "SOCIAL" || item.key == "CONTACT") {
          data = { ...data, ...item.content };
        }
      });

      setDataContacts(data as TDataContacts);

      if (res.statusCode === 200) {
        const footerMenu: MenuItem[] = res?.footerMenu || [];
        setDataMenu(footerMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // const res = await http.get<SuccessResponse<BannerType<DataContent>[]>>(
  //   "system"
  // );
  // const dataContact = res.data.find(
  //   (item: BannerType<DataContent>) => item.key === "SOCIAL"
  // ).content;
  // console.log("dataContact", dataContact);

  return (
    <footer className="footer bg-greenCustom text-white">
      <div className="container">
        <div className="lg:grid md:grid lg:grid-cols-5 md:grid-cols-5 gap-10 py-7">
          <ul className="lg:col-span-2 md:col-span-2">
            <li className="w-full">
              <Image
                width={100}
                height={80}
                alt=""
                src="./images/logo.png"
                className="bg-white p-2 rounded-md w-[100px]"
              />
            </li>
            <li className="my-1 font-bold text-[19px]">
              CÔNG TY CỔ PHẦN KẾT NỐI LOCA
            </li>
            <li className="my-1">MST: {dataContacts?.tax_code}</li>
            <li className="my-1">{dataContacts?.address}</li>
            <li className="my-1">SĐT: {dataContacts?.phone}</li>
            <li className="my-1">Email: {dataContacts?.email}</li>
          </ul>
          {dataMenu?.map((item, index) => (
            <ul
              key={index}
              className="lg:col-span-1 lg:mt-12 md:col-span-1 md:mt-12 mt-5"
            >
              <li className="my-1">
                <div className="font-bold text-[16px] uppercase mb-2">{item?.name}</div>
              </li>
              {item?.children?.map((it, id) => (
                <li key={id} className="my-1 hover:text-gray-300">
                  <Link href={it?.link || "#"}>- {it?.name}</Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="w-full h-[1px] bg-white" />
        <div className="pt-3 pb-7">
          <div className="md:justify-between md:flex">
            <div>{copyright}</div>
            <div className="flex md:mt-0 mt-2">
              <Link target="_blank" href={dataContacts?.facebook || '#'}>
                <Image
                  width={10}
                  height={10}
                  alt="facebook"
                  src="./images/fb.png"
                  className="w-[30px] h-[30px] lg:ml-4"
                />
              </Link>
              <Link target="_blank" href={`https://zalo.me/${dataContacts?.zalo}`}>
                <Image
                  width={10}
                  height={10}
                  alt="zalo"
                  src="./images/zalo.png"
                  className="w-[26px] h-[26px] ml-4"
                />
              </Link>
              <Link target="_blank" href={dataContacts?.youtube || '#'}>
                <Image
                  width={2}
                  height={4}
                  alt="youtube"
                  src="./images/yt.png"
                  className="w-[30px] h-[30px] ml-4 "
                />
              </Link>
              <Link className="rounded-[50px]" target="_blank" href={dataContacts?.tiktok || '#'}>
                <Image
                  width={2}
                  height={4}
                  alt="tiktok"
                  src="./images/tiktok.png"
                  className="w-[30px] h-[30px] ml-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
