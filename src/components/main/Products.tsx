"use client";
import { SuccessResponse } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { http, urlImage } from "@/utils/http";
import { useEffect, useState } from "react";

interface TItem {
  slug: string;
  name: string;
  image: string;
  des: string;
}

function Products() {
  const [products, setProducts] = useState([]);
  const getAll = async () => {
    try {
      const res = (await http.get<SuccessResponse<[]>>("product?publish=1"))
        .data;

      if (res.statusCode === 200) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="bg-grayCustom w-full">
      <div className="container lg:pt-20 lg:pb-10 md:pt-20 md:pb-10 pt-5">
        <div className="h-full">
          <Swiper
            modules={[Pagination, Navigation]} // Kích hoạt các module
            spaceBetween={50}
            // slidesPerView={3}
            pagination={{ clickable: true }}
            breakpoints={{
              // Thiết lập cho từng kích thước màn hình
              640: {
                slidesPerView: 1, // Khi màn hình nhỏ hơn 640px (iPhone), hiển thị 1 slide
              },
              768: {
                slidesPerView: 2, // Khi màn hình từ 768px trở lên (iPad), hiển thị 2 slides
              },
              1024: {
                slidesPerView: 3, // Khi màn hình từ 768px trở lên (iPad), hiển thị 2 slides
              },
            }}
          >
            {products.map((item: TItem, index) => (
              <SwiperSlide key={index}>
                <Link href={item?.slug}>
                  <div className="overflow-hidden rounded-sm bg-white transition-transform duration-100 translate-y-[-0.04rem] shadow-md">
                    <div className="h-[230px] w-full overflow-hidden">
                      <div className="image h-[230px]">
                        <Image
                          width={10}
                          height={10}
                          alt={item?.name}
                          src={`${urlImage}/${item?.image}`}
                          className=" h-full w-full bg-white object-cover "
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden px-5 py-8 text-center">
                      <h3 className="text-greenDarkCustom font-bold text-[19px] hover:text-green-700 line-clamp-1">
                        {item?.name}
                      </h3>
                      <div className="w-24 h-[3px] bg-yellow-400 mx-auto my-2" />
                      <div className="line-clamp-4">{item?.des}</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Products;
