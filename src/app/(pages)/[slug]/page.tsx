import SlugDetail from "@/components/slug/SlugDetail";
import React from "react";
type Props = {
  params: { slug: string };
};
export default function Detail({ params }: Props) {
  return (
    <div className="container py-5">
      <SlugDetail slug={params?.slug} />
    </div>
  );
}
