"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { SuccessResponse } from "@/types/type";
import { http, urlImage } from "@/utils/http";
import Loading from "../Loading";

interface TData {
  name: string;
  des: string;
  image: string;
  specification: string;
  content: string;
}

interface TContent {
  title: string;
  heading: string;
  description: string;
  content: string;
}

function SlugDetail({ slug }: { slug: string }) {
  const [data, setData] = useState({
    name: "",
    des: "",
    image: "",
    specification: "",
    content: "",
  } as TData);
  const [content, setContent] = useState({
    title: "",
    heading: "",
    description: "",
    content: "",
  } as TContent);
  const [activeTab, setActiveTab] = useState("info");
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);

  const getAllNews = async () => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>(`news/findRelated/${slug}`)
      ).data;

      if (res.statusCode === 200) {
        setNews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>(`product/findRelated/${slug}`)
      ).data;

      if (res.statusCode === 200) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDetail = async (slug: string) => {
    try {
      const res = (
        await http.get<SuccessResponse<[]>>(`product/findBySlug/${slug}`)
      ).data;
      if (res.statusCode === 200) {
        return setData(res.data as unknown as TData);
      }

      const ress = (
        await http.get<SuccessResponse<[]>>(`news/get-one-by-slug/${slug}`)
      ).data;
      if (ress.statusCode === 200) {
        return setContent(ress.data as unknown as TContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
    getAllNews();
  }, []);

  useEffect(() => {
    getDetail(slug);
  }, [slug]);

  if (!data?.name && !content?.title) {
    return <Loading />;
  }
  if (data?.name) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="rounded-lg bg-white shadow-md md:w-2/3 lg:w-1/2 w-full mx-auto">
            <Image
              className="rounded-xl object-contain md:h-auto h-40 "
              src={`${urlImage}/${data.image}`}
              width={100}
              height={100}
              alt="GPS Tracker"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="md:text-2xl text-md font-medium mx-auto">
              {data?.name}
            </h1>
          </div>
        </div>
        <div>
          <div className="flex gap-4 flex-col p-5 pt-2 rounded-lg bg-white shadow-md ">
            <div className="flex md:text-lg text-sm font-medium border-b-[3px] relative">
              <button
                className={`py-2 pr-4 text-left w-[195px] ${
                  activeTab === "info" ? "text-[#0aca57]" : ""
                }`}
                onClick={() => setActiveTab("info")}
              >
                Thông tin sản phẩm
              </button>
              <button
                className={`py-2 pr-4 text-left w-[195px] ${
                  activeTab === "tech" ? "text-[#0aca57]" : ""
                }`}
                onClick={() => setActiveTab("tech")}
              >
                Thông số kỹ thuật
              </button>
              <div
                className="md:w-[165px] w-[130px] h-[3px] bg-[#0aca57] absolute -bottom-[2px] left-0"
                style={{
                  transform: `translateX(${
                    activeTab === "info"
                      ? 0
                      : window.screen.width < 500
                      ? 150
                      : 190
                  }px)`,
                  transition: "transform 0.2s",
                }}
              />
            </div>
            <div className="">
              {activeTab === "info" ? (
                <div className="gap-6 flex-col flex md:text-lg text-sm">
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                  ></div>
                </div>
              ) : (
                <div className="gap-6 flex-col flex md:text-lg text-sm">
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.specification }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-medium">Sản phẩm liên quan</h2>
          <div>
            <Swiper
              modules={[Pagination, Navigation]} // Kích hoạt các module
              spaceBetween={20}
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
              {products.map(
                (
                  item: {
                    slug: string;
                    image: string;
                    name: string;
                    des: string;
                  },
                  index
                ) => (
                  <SwiperSlide key={index}>
                    <Link href={item.slug}>
                      <div className="overflow-hidden rounded-lg shadow-lg overflow-hidden bg-white transition-transform duration-100 translate-y-[-0.04rem] shadow-md">
                        <div className="h-[230px] w-full overflow-hidden">
                          <div className="image h-[230px]">
                            <Image
                              width={10}
                              height={10}
                              alt=""
                              src={`${urlImage}/${item.image}`}
                              className=" h-full w-full bg-white object-cover "
                            />
                          </div>
                        </div>
                        <div className="overflow-hidden px-5 py-8 text-center">
                          <h3 className="text-greenDarkCustom font-bold text-[19px] hover:text-green-700">
                            <div>{item.name}</div>
                          </h3>
                          <div className="w-24 h-[3px] bg-yellow-400 mx-auto my-2" />
                          <div className="line-clamp-4">{item?.des}</div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }

  if (content?.title) {
    return (
      <div>
        <div className="flex flex-col gap-3 mb-5">
          <h1 className="text-[18px] font-bold text-greenDarkCustom">
            {content?.heading}
          </h1>
          <p className="py-3 border-y-2 text-[15px] ">{content?.description}</p>
        </div>
        <div
          className="content-news flex flex-col gap-5 text-lg font-normal"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        <div className="flex flex-col gap-5 mt-2">
          <h2 className="text-2xl font-medium">Bài viết liên quan</h2>
          <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
            {news?.map(
              (
                item: {
                  slug: string;
                  image_url: string;
                  heading: string;
                  description: string;
                },
                index
              ) => (
                <Link key={index} href={item?.slug}>
                  <div
                    key={index}
                    className="lg:col-span-1 border-[2px] overflow-hidden md:max-w-[330px] lg:max-w-full"
                  >
                    <div className="h-[250px] overflow-hidden relative w-full">
                      <div className="image overflow-hidden ">
                        <Image
                          width={100}
                          height={80}
                          alt=""
                          src={`${urlImage}/${item?.image_url}`}
                          className="w-full bg-white object-cover block"
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden px-5 py-3">
                      <a className="text-greenDarkCustom font-bold" href="#">
                        <h3 className="text-[22px] hover:text-green-700 line-clamp-1">
                          {item?.heading}
                        </h3>
                      </a>
                      <div className="mt-5">
                        <div className="text-gray-500 my-3">
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SlugDetail;
