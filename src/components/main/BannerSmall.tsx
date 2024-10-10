"use client";
import { DataContent } from "@/types/type";
import { urlImage } from "@/utils/http";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  data: DataContent;
}

export default function BannerSmall({ data }: Props) {
  const [widthScreen, setWidthScreen] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidthScreen(window.innerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (data?.image || data?.banner_mobile) {
    return (
      <Image
        src={`${urlImage}/${widthScreen < 500 ? data?.banner_mobile : data?.image}`}
        width={100}
        height={200}
        alt={data?.name}
      />
    );
  }
}
