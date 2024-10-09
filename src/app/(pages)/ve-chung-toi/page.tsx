import Content from "@/components/introduce/Content";
import Item from "@/components/introduce/Item";
import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Introduce() {
  const res = (await http.get("/system?key=ABOUT"))?.data;
  // (await http.get("http://192.168.2.24:3001/api/v1/system?key=ABOUT"))?.data;
  const dataAbout = res.data[0]?.content;

  console.log(dataAbout);


  return (
    <div>
      {dataAbout?.banner && (
        <Image
          className="mb-6"
          src={`${urlImage}/${dataAbout?.banner}`}
          // src={`http://192.168.2.24:3001/uploads/${dataAbout?.banner}`}
          width={100}
          height={200}
          alt={dataAbout?.name}
        />
      )}
      <div className="breadcrumb bg-grayCustom ">
        <div className="container lg:py-1 flex">
          <div className="py-2 font-bold flex items-center">
            <span className="mb-1">
              <Link href="/">Trang chủ</Link>
            </span>
            <span className="pl-1">
              <i className="fi fi-sr-angle-right" />{" "}
            </span>
            <span className="pl-1 mb-1"> Về chúng tôi </span>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container lg:py-8 py-3">
          <Content />
          <Item />
        </div>
      </div>
    </div>
  );
}
