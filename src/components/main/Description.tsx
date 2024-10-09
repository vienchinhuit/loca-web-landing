"use client";
import { DataContent } from "@/types/type";
import { urlImage } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  data: DataContent;
}
// Web/app thân thiện

// Với thiết kế đơn giản trực quan, dễ sử dụng, tối ưu hóa bố cục sẽ là điểm cộng lớn đối với các khách hàng trong việc quản lý giám sát.
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
            <div className="lg:mr-16 my-8 text-justify">
              {data?.des}
            </div>
            <div className="flex justify-center md:justify-start">
              <Link
                href={data?.link as string}
                className="px-5 py-2 bg-yellow-600 rounded-md text-white border-[1px] border-yellow-600 hover:bg-white hover:text-black"
              >
                Xem thêm
              </Link>
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* <img  alt="w-full" /> */}
            <Image
              alt={data?.name}
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
