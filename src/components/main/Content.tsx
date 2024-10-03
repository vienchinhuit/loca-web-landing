"use client";
import { DataContent, SuccessResponse } from "@/types/type";
import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IItem {
  image: string;
  name: string;
  des: string;
}
interface Props {
  dataTitle: DataContent;
}

export default function Content({ dataTitle }: Props) {
  const [data, setData] = useState([]);

  const getAll = async () => {
    try {
      const res = (await http.get<SuccessResponse<[]>>("why-choose?limit=4"))
        .data;
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

  console.log("dataTitle", dataTitle);

  return (
    <div className="lg:py-20 md:py-20 py-10">
      <div className="container items-center justify-center text-center">
        <h2 className="text-greenDarkCustom font-bold text-[25px] lg:text-[30px]">
          {dataTitle?.name}
        </h2>
        <div className="mx-auto lg:w-[50%] my-2 text-gray-500">
          {dataTitle?.des}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 text-left mt-10">
          {data.map((item: IItem, index) => (
            <div key={index} className="lg:col-span-1">
              <div className="px-5 py-10 shadow-bottom-right overflow-hidden rounded-sm transition-transform duration-100">
                <div className="h-16">
                  <Image
                    width={16}
                    height={10}
                    alt=""
                    src={`${urlImage}/${item?.image}`}
                    className="w-16"
                  />
                </div>
                <h3 className="my-2 text-greenDarkCustom font-bold text-[18px]">
                  {item?.name}
                </h3>
                <div className="text-gray-500 line-clamp-6">{item?.des}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
