import FooterPage from "../components/FooterPage";
import HeaderPage from "../components/HeaderPage";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { http, urlImage } from "@/utils/http";
import { DataContent, SuccessResponse, TBanner } from "@/types/type";
import ErrorPage from "@/components/ErorrPage";

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
          {children}
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
