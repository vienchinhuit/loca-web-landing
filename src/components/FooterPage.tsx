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
        <div className="lg:grid md:grid lg:grid-cols-6 md:grid-cols-6 gap-10 py-7">
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
                <div className="font-bold text-[15px]">{item?.name}</div>
              </li>
              {item?.children?.map((it, id) => (
                <li key={id} className="my-1 hover:text-gray-300">
                  <Link href={it?.link || "#"}>{it?.name}</Link>
                </li>
              ))}
            </ul>
          ))}
          <div className="lg:col-span-2 md:col-span-2">
            {/* {dataContacts?.google_map} */}
            <div
              dangerouslySetInnerHTML={{ __html: googleMapFooter as string }}
            />
            {/* <iframe
              src={dataContacts?.google_map}
              className="w-full h-full mr-5 md:mt-0 mt-5"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            /> */}
          </div>
        </div>
        <div className="w-full h-[1px] bg-white" />
        <div className="pt-3 pb-7">
          <div className="md:justify-between md:flex">
            <div>{copyright}</div>
            <div className="flex md:mt-0 mt-2">
              <Link target="_blank" href={dataContacts?.facebook}>
                <Image
                  width={2}
                  height={4}
                  alt=""
                  src="./images/fb.png"
                  className="w-2 h-4 lg:ml-4"
                />
              </Link>
              <Link target="_blank" href={dataContacts?.zalo}>
                <Image
                  width={2}
                  height={4}
                  alt=""
                  src="./images/zalo.png"
                  className="w-4 h-4 ml-4"
                />
              </Link>
              <Link target="_blank" href={dataContacts?.youtube}>
                <Image
                  width={2}
                  height={4}
                  alt=""
                  src="./images/yt.png"
                  className="w-4 h-4 ml-4"
                />
              </Link>
              <Link target="_blank" href={dataContacts?.tiktok}>
                <Image
                  width={2}
                  height={4}
                  alt=""
                  src="./images/tiktok.png"
                  className="w-3 h-4 ml-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
