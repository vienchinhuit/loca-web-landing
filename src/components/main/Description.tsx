"use client";
import { DataContent } from "@/types/type";
import { urlImage } from "@/utils/http";
import Image from "next/image";
import React from "react";
interface Props {
  data: DataContent;
}
export default function Description({ data }: Props) {
  console.log(data);

  return (
    <div className="lg:py-20 md:py-20 py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="lg:col-span-1">
            <h2 className="text-greenDarkCustom font-bold lg:text-[30px] text-[25px] leading-[35px]">
              {data?.name}
            </h2>
            <div className="lg:mr-16 my-8">{data?.des}</div>
            <a
              href="#"
              className="px-5 py-2 bg-yellow-600 rounded-md text-white border-[1px] border-yellow-600 hover:bg-white hover:text-black"
            >
              Xem thêm
            </a>
          </div>
          <div className="lg:col-span-1">
            {/* <img  alt="w-full" /> */}
            <Image
              alt=""
              src={`${urlImage}/${data?.image}`}
              width={656}
              height={438}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
