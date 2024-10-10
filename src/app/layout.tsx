import FooterPage from "../components/FooterPage";
import HeaderPage from "../components/HeaderPage";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { http, urlImage } from "@/utils/http";
import { DataContent, SuccessResponse, TBanner } from "@/types/type";
import ErrorPage from "@/components/ErorrPage";
import Link from "next/link";
import Image from "next/image";

interface TDataContacts {
  zalo: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const res = (
      await http.get<SuccessResponse<TBanner<DataContent>[]>>(
        "system?key=GENERAL_INFO"
      )
    ).data.data[0];

    const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;
    let data = {} as TDataContacts;

    resContact.data.forEach((item: { key: string; content: {} }) => {
      if (item.key == "SOCIAL" || item.key == "CONTACT") {
        data = { ...data, ...item.content };
      }
    });

    return (
      <html lang="en">
        <head>
          <link
            rel="icon"
            href={`${urlImage}/${res?.content?.thumb}`}
            type="image/png"
          ></link>
          <title>{res?.content?.title}</title>
          <meta name="description" content={res?.content?.description} />
          <link
            rel="stylesheet"
            href="https://cdn-uicons.flaticon.com/2.3.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
          ></link>
        </head>
        <body className="text-[14px]" suppressHydrationWarning={true}>
          <HeaderPage />
          <div className="mb-10">
            {children}
            <div className="sticky bottom-40 z-10 ml-auto lg:mr-10 mr-5  w-12 h-12  rounded-full flex items-center justify-center">
              <span className="animate-ping absolute inline-flex w-12 h-12 rounded-full bg-sky-400 "></span>
              <Link href={`https://zalo.me/${data?.zalo}`} className="z-10" target="_blank">
                <Image
                  src={`${urlImage}/files/support.png`}
                  className="w-12 h-12 animate-ring"
                  alt="support"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </div>
          <FooterPage />

        </body>
      </html>
    );
  } catch (error) {
    return (
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn-uicons.flaticon.com/2.3.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
          />
        </head>
        <body className="text-[14px]">
          <ErrorPage />
        </body>
      </html>
    );
  }
}
