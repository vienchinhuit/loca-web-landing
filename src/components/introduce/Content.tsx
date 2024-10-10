import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import React from "react";

export default async function Content() {
  try {
    const res = (await http.get("system?key=ABOUT"))?.data;
    const dataAbout = res.data[0].content;

    return (
      <div className="content gap-4 flex flex-col">
        <Image
          alt="ve-chung-toi"
          width={645}
          height={431}
          src={`${urlImage}/${dataAbout?.image}`}
          className="w-full"
        />
        <div className="lg:col-span-3 text-justify">{dataAbout?.top}</div>
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: dataAbout?.bottom }}></div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
