"use client";
import { DataContent } from "@/types/type";
import React from "react";

interface Props {
  data: DataContent;
}

export default function BannerSmall({ data }: Props) {
  return (
    <div className="bg-greenCustom lg:relative">
      <div className="container">
        <div className="banner2 bg-contain h-auto">
          <div className="lg:h-[361px] md:py-14 py-10 lg:w-[50%] text-white">
            <div>{data?.des}</div>
            <div className="lg:mt-20 mt-10">
              <a
                href="#"
                className="px-5 py-2 bg-yellow-600 rounded-md text-white hover:bg-white hover:text-black"
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
