import { DataContent, SuccessResponse, TBanner } from "@/types/type";
import { http } from "@/utils/http";
import React from "react";

export default async function Map() {
  const resGGMapBrand = (
    await http.get<SuccessResponse<TBanner<DataContent>[]>>(
      "system?key=CONTACT"
    )
  ).data;
  // setGoogleMapFooter();
  return (
    <div className="lg:col-span-1">
      {resGGMapBrand?.data[0].content?.google_map_contact && (
        <div
          dangerouslySetInnerHTML={{
            __html: resGGMapBrand?.data[0].content
              ?.google_map_contact as string,
          }}
        />
      )}
    </div>
  );
}
