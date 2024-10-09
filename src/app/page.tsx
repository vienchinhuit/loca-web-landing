import Banner from "../components/main/Banner";
import News from "../components/main/News";
import System from "../components/main/System";
import Description from "../components/main/Description";
import BannerSmall from "../components/main/BannerSmall";
import Content from "../components/main/Content";
import Content2 from "../components/main/Content2";
import { TBanner, DataContent, SuccessResponse } from "../types/type";
import Loading from "@/components/Loading";
import Products from "@/components/main/Products";
import { http, urlImage } from "@/utils/http";
import ErrorPage from "@/components/ErorrPage";
import Link from "next/link";
import Image from "next/image";
interface TDataContacts {
  address: string;
  email: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  zalo: string;
  image: string;
  name: string;
  phone: number;
  tax_code: number;
  thumb: string;
  google_map: string;
}
export default async function Home() {
  try {
    const res = (
      await http.get<SuccessResponse<TBanner<DataContent>[]>>("system")
    ).data;
    const dataBanner = res.data.find(
      (item: TBanner<DataContent>) => item.key === "BANNER"
    )?.content;

    const dataWhy: DataContent | undefined = res.data.find(
      (item: TBanner<DataContent>) => item.key === "INTRODUCE"
    )?.content;

    const dataDriver: DataContent | undefined = res.data.find(
      (item: TBanner<DataContent>) => item.key === "DRIVER"
    )?.content;

    const dataWhyChoose: DataContent | undefined = res.data.find(
      (item: TBanner<DataContent>) => item.key === "WHYCHOOSE"
    )?.content;

    const dataBranch: DataContent | undefined = res.data.find(
      (item: TBanner<DataContent>) => item.key === "BRANCH"
    )?.content;

    const dataNews: DataContent | undefined = res.data.find(
      (item: TBanner<DataContent>) => item.key === "NEWS"
    )?.content;

    const dataPartner: DataContent | undefined = res.data.find(
      (item: TBanner<DataContent>) => item.key === "PARTNER"
    )?.content;

    const resContact = (await http.get<SuccessResponse<[]>>(`system`)).data;
    let data = {} as TDataContacts;

    resContact.data.forEach((item: { key: string; content: {} }) => {
      if (item.key == "SOCIAL" || item.key == "CONTACT") {
        data = { ...data, ...item.content };
      }
    });

    if (!dataBanner) {
      return <Loading />;
    }
    return (
      <div className="main mb-10">
        <Banner data={dataBanner} />
        {/*  */}
        <Products />
        {/*  */}
        <Description data={dataWhy as DataContent} />
        {/*  */}
        <BannerSmall data={dataDriver as DataContent} />
        {/*  */}
        <Content dataTitle={dataWhyChoose as DataContent} />
        {/*  */}
        <System dataTitle={dataBranch as DataContent} />
        {/*  */}
        <Content2 dataTitle={dataPartner as DataContent} />
        {/*  */}
        <News dataTitle={dataNews as DataContent} />

        {/* <div className="sticky bottom-40 z-10 ml-auto lg:mr-10 mr-5  w-12 h-12 overflow-hidden rounded-full">
          <Link href={data?.zalo}>
            <Image
              src={`${urlImage}/files/support.png`}
              className="w-12 h-12"
              alt="support"
              width={100}
              height={100}
            />
          </Link>
        </div> */}
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
}
