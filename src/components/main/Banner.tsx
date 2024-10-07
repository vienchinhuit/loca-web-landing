import { DataContent } from "@/types/type";
import { urlImage } from "@/utils/http";
import Link from "next/link";
import React from "react";
interface Props {
  data: DataContent;
}
export default async function Banner({ data }: Props) {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center lg:h-[800px]  lg:py-20 md:py-20 py-10"
      style={{
        backgroundImage: `url('${urlImage}/${data?.image}')`,
      }}
    >
      <div className="container mx-auto text-white">
        <h1 className="lg:text-[40px] text-[22px] lg:w-[70%] font-bold leading-normal uppercase">
          {data?.name}
        </h1>
        <div className="lg:w-[600px] py-8 lg:text-[18px]">{data?.des}</div>
        {/* <div className="lg:w-[600px] py-8">des</div> */}
        <div className="pt-8 flex">
          <Link
            href={data?.link}
            className="px-5 py-1 bg-yellow-600 rounded-md border-[1px] border-yellow-600 hover:bg-[#344352]"
          >
            Xem thêm
          </Link>
          <Link
            href={data?.link}
            className="ml-5 px-5 py-1 border-[1px] border-yellow-600 rounded-md hover:bg-yellow-600"
          >
            Liên hệ chúng tôi
          </Link>
        </div>
      </div>
    </div>
  );
}
