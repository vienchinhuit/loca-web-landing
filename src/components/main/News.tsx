"use client";
import { DataContent, SuccessResponse } from "@/types/type";
import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface TItem {
  description: string;
  heading: string;
  content: string;
  image_url: string;
  slug: string;
}

interface Props {
  dataTitle: DataContent;
}

export default function News({ dataTitle }: Props) {
  const [data, setData] = useState([]);

  const getAll = async () => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>("news/getAll?limit=3&publish=1")
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
    <div className="lg:pb-20 md:pb-20 pb-10 w-full">
      <div className="container items-center justify-center">
        <h2 className="text-greenDarkCustom font-bold text-[25px] lg:text-[30px] text-center">
          {dataTitle?.name}
        </h2>
        <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 ">
          {data?.map((item: TItem, index) => (
            <Link key={index} href={item?.slug}>
              <div className=" border-[2px] overflow-hidden">
                <div className="h-[250px] overflow-hidden relative w-full">
                  <div className="image overflow-hidden ">
                    <Image
                      width={100}
                      height={80}
                      alt={dataTitle?.name}
                      src={`${urlImage}/${item?.image_url}`}
                      className="w-full bg-white object-cover block"
                    />
                  </div>
                </div>
                <div className="overflow-hidden px-5 py-3">
                  <a className="text-greenDarkCustom font-bold" href="#">
                    <h3 className="text-[18px] hover:text-green-700 line-clamp-1">
                      {item?.heading}
                    </h3>
                  </a>
                  <div className="mt-3">
                    <div className="text-gray-500 my-3">
                      {item?.description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
