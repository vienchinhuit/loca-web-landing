import Form from "@/components/contact/Form";
import Map from "@/components/contact/Map";
import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <div>
      <div className="breadcrumb bg-grayCustom">
        <div className="container lg:py-2 flex">
          <div className="py-2 items-center font-bold flex">
            <span className="mb-1">
              <Link href="/">Trang chủ</Link>
            </span>
            <span className="pl-1">
              <i className="fi fi-sr-angle-right" />{" "}
            </span>
            <span className="pl-1 mb-1"> Liên hệ </span>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container lg:py-8">
          <div className="py-12">
            <h2 className="text-[30px] font-bold text-greenDarkCustom">
              Liên hệ chúng tôi
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
              <Form />
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
