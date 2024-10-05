import SlugDetail from "@/components/slug/SlugDetail";
import { SuccessResponse } from "@/types/type";
import { http } from "@/utils/http";
import React from "react";
type Props = {
  params: { slug: string };
};
type TMeta = {
  title?: string;
  name?: string;
  description?: string;
  des?: string;
};
// Fetcher function for useSWR
export async function generateMetadata({ params }: Props) {
  try {
    const res = (
      await http.get<SuccessResponse<TMeta>>(
        `product/findBySlug/${params?.slug}`
      )
    ).data;

    if (res.statusCode === 200) {
      return {
        title: res.data.name,
        description: res.data.des,
      };
    }
    const ress = (
      await http.get<SuccessResponse<TMeta>>(
        `news/get-one-by-slug/${params?.slug}`
      )
    ).data;

    if (ress.statusCode === 200) {
      return {
        title: ress.data.title,
        description: ress.data.description,
      };
    }
  } catch (err) {
    console.error(err);
  }
}
export default function Detail({ params }: Props) {
  return (
    <div className="container py-5">
      <SlugDetail slug={params?.slug} />
    </div>
  );
}
