import Image from "next/image";
import React from "react";

export default function Content() {
  return (
    <div className="content">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
        <div className="lg:col-span-2">
          <Image
            alt=""
            width={645}
            height={431}
            src="./images/15.png"
            className="w-full"
          />
        </div>
        <div className="lg:col-span-3">
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ipsum
            porro provident dolorum quis dignissimos nam similique quae
            quibusdam commodi temporibus, voluptatem cumque suscipit. Vel
            mollitia est quod quis ad. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quia debitis repellat ex deserunt eveniet, atque
            sapiente perspiciatis, ratione placeat nulla, minus rem veniam est
            eligendi. Veniam aliquam placeat neque impedit.
          </div>
          <div>
            - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            + Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            + Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            + Lorem ipsum dolor sit amet.
            <br />
            + Lorem ipsum dolor sit amet.
            <br />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ipsum
          porro provident dolorum quis dignissimos nam similique quae quibusdam
          commodi temporibus, voluptatem cumque suscipit. Vel mollitia est quod
          quis ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          debitis repellat ex deserunt eveniet, atque sapiente perspiciatis,
          ratione placeat nulla, minus rem veniam est eligendi. Veniam aliquam
          placeat neque impedit.
        </div>
        <div>
          - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <br />
          - Lorem ipsum dolor sit adipisicing elit.
          <br />
          - Lorem ipsum dolor sit amet consectetur adipisicing elit Quos ipsum
          porro provident.
          <br />
          - Lorem ipsum dolor sit amet.
          <br />
          - Lorem ipsum dolor sit amet.
          <br />
        </div>
      </div>
    </div>
  );
}

// import {
//   DataContent,
//   SuccessResponse,
//   Banner as BannerType,
// } from "@/types/type";
// import { http, urlImage } from "@/utils/http";
// import Image from "next/image";
// import React from "react";

// interface TData {
//   name: string;
//   des: string;
//   image: string;
//   thumb: string;
// }

// export default async function Content() {
//   try {
//     const res = (
//       await http.get<SuccessResponse<BannerType<DataContent>[]>>("system")
//     ).data;
//     const dataAbout = res.data.find(
//       (item: BannerType<DataContent>) => item.key === "ABOUT"
//     )?.content;

//     return (
//       <div className="content">
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
//           <div className="lg:col-span-2">
//             <Image
//               alt=""
//               width={645}
//               height={431}
//               src={`${urlImage}/${dataAbout?.image}`}
//               className="w-full"
//             />
//           </div>
//           <div className="lg:col-span-3">{dataAbout?.des}</div>
//         </div>
//         <div className="mt-5">{dataAbout?.des}</div>
//       </div>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }
