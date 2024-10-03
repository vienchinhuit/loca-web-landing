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
  });
  const [copyright, setCopyright] = useState<string | undefined>("");

  const getData = async () => {
    try {
      const res = (await http.get<SuccessResponse<[]>>(`menu/getMenus`)).data;
      const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;
      const resGeneral = (
        await http.get<SuccessResponse<TBanner<DataContent>[]>>(
          "system?key=GENERAL_INFO"
        )
      ).data.data[0];

      setCopyright(resGeneral?.content?.copyright);

      let data = {};

      resContact.data.forEach((item: { key: string; content: {} }) => {
        if (item.key == "SOCIAL" || item.key == "CONTACT") {
          data = { ...data, ...item.content };
        }
      });

      setDataContacts(data as TDataContacts);

      console.log("res", res);

      // setDataContacts(data as TDataContacts);

      // if (res.statusCode === 200) {
      //   const mainMenu: MenuItem[] = res?.mainMenu || [];
      //   setDataMenu(mainMenu);
      // }
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
          <ul className="lg:col-span-1 lg:mt-12 md:col-span-1 md:mt-12 mt-5">
            <li className="my-1">
              <div className="font-bold text-[15px]">PHÂN TRANG</div>
            </li>
            <li className="my-1 hover:text-gray-300">
              <Link href="/">Trang chủ</Link>
            </li>
            <li className="my-1 hover:text-gray-300">
              <Link href="/ve-chung-toi">Về chúng tôi</Link>
            </li>
            <li className="my-1 hover:text-gray-300">
              <Link href="/lien-he">Liên hệ</Link>
            </li>
          </ul>
          <ul className="lg:col-span-1 lg:mt-12 md:col-span-1 md:mt-12 mt-5">
            <li className="my-1">
              <div className="font-bold text-[15px]">CHÍNH SÁCH</div>
            </li>
            <li className="my-1 hover:text-gray-300">
              <a href="#" className="my-1">
                Chính sách bán hàng
              </a>
            </li>
            <li className="my-1 hover:text-gray-300">
              <a href="#" className="my-1">
                Chính sách hợp tác
              </a>
            </li>
          </ul>
          <div className="lg:col-span-2 md:col-span-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.602267507604!2d106.66621797570379!3d10.841718757984644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529aeecedb079%3A0x255246387c6277fc!2zNTQgSOG6u20gMjA4IMSQLiBT4buRIDksIEtEQyBDaXR5bGFuZCBQYXJrIEhpbGxzLCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1725441211065!5m2!1svi!2s"
              className="w-full h-full mr-5 md:mt-0 mt-5"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
