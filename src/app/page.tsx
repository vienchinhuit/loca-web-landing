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
import { http } from "@/utils/http";
import ErrorPage from "@/components/ErorrPage";
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

    if (!dataBanner) {
      return <Loading />;
    }
    return (
      <div className="main">
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
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
}
