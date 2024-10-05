import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import React from "react";

export default async function Content() {
  try {
    const res = (await http.get("system?key=ABOUT"))?.data;
    const dataAbout = res.data[0].content;

    return (
      <div className="content">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
          <div className="lg:col-span-2">
            <Image
              alt=""
              width={645}
              height={431}
              src={`${urlImage}/${dataAbout?.image}`}
              className="w-full"
            />
          </div>
          <div className="lg:col-span-3">{dataAbout?.top}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: dataAbout?.bottom }}></div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
