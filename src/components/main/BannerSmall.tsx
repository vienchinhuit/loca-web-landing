"use client";
import { DataContent } from "@/types/type";
import { urlImage } from "@/utils/http";
import Image from "next/image";
import React from "react";

interface Props {
  data: DataContent;
}

export default function BannerSmall({ data }: Props) {
  return (
    <Image
      src={`${urlImage}/${data?.image}`}
      width={100}
      height={200}
      alt={data?.name}
    />
  );
}
