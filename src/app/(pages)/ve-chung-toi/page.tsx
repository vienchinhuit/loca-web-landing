import Content from "@/components/introduce/Content";
import Item from "@/components/introduce/Item";
import Link from "next/link";
import React from "react";

export default function Introduce() {
  return (
    <div>
      <div className="breadcrumb bg-grayCustom">
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
