"use client";
import { DataContent, SuccessResponse } from "@/types/type";
import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface TItem {
  image: string;
}

interface Props {
  dataTitle: DataContent;
}
export default function Content2({ dataTitle }: Props) {
  const [data, setData] = useState([]);

  const getAll = async () => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>("partner?publish=1&sort=1")
      ).data;

      if (res.statusCode === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="lg:py-20 md:py-20 py-10 w-full">
      <div className="container items-center justify-center text-center">
        <h2 className="text-greenDarkCustom font-bold text-[25px] lg:text-[30px]">
          {dataTitle?.name}
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 text-left lg:mt-10 md:mt-10 mt-5 mb-5">
          {data.map((item: TItem, index) => (
            <div key={index} className="col-span-1">
              <div className="lg:m-2 lg:px-5 border-[1px] border-gray-100 overflow-hidden rounded-sm transition-transform duration-100">
                <Image
                  width={100}
                  height={80}
                  alt=""
                  src={`${urlImage}/${item?.image}`}
                  className="w-full lg:h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
