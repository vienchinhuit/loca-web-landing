// import { http } from "@/utils/http";
// import Image from "next/image";
// import React from "react";

// export default async function Item() {

//   return (
//     <div className="pt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
//       <a href="#" className="lg:col-span-1">
//         <div className="px-5 py-5 shadow-bottom-right overflow-hidden rounded-sm transition-transform duration-100 text-center">
//           <div className="w-16 h-16 bg-greenCustom rounded-[100%] mx-auto flex justify-center items-center">
//             <Image
//               alt=""
//               width={645}
//               height={431}
//               src="./images/16.png"
//               className="w-8"
//             />
//           </div>
//           <h3 className="mt-5 text-greenDarkCustom font-bold text-[20px]">
//             Giám sát chặt chẽ
//           </h3>
//         </div>
//       </a>
//       <a href="#" className="lg:col-span-1">
//         <div className="px-5 py-5 shadow-bottom-right overflow-hidden rounded-sm transition-transform duration-100 text-center">
//           <div className="w-16 h-16 bg-greenCustom rounded-[100%] mx-auto flex justify-center items-center">
//             <Image
//               alt=""
//               width={645}
//               height={431}
//               src="./images/17.png"
//               className="w-8"
//             />
//           </div>
//           <h3 className="mt-5 text-greenDarkCustom font-bold text-[20px]">
//             Phù hợp nghị định
//           </h3>
//         </div>
//       </a>
//       <a href="#" className="lg:col-span-1">
//         <div className="px-5 py-5 shadow-bottom-right overflow-hidden rounded-sm transition-transform duration-100 text-center">
//           <div className="w-16 h-16 bg-greenCustom rounded-[100%] mx-auto flex justify-center items-center">
//             <Image
//               alt=""
//               width={645}
//               height={431}
//               src="./images/18.png"
//               className="w-8"
//             />
//           </div>
//           <h3 className="mt-5 text-greenDarkCustom font-bold text-[20px]">
//             Chuyên dùng cho Vận Tải
//           </h3>
//         </div>
//       </a>
//       <a href="#" className="lg:col-span-1">
//         <div className="px-5 py-5 shadow-bottom-right overflow-hidden rounded-sm transition-transform duration-100 text-center">
//           <div className="w-16 h-16 bg-greenCustom rounded-[100%] mx-auto flex justify-center items-center">
//             <Image
//               alt=""
//               width={645}
//               height={431}
//               src="./images/18_1.png"
//               className="w-8"
//             />
//           </div>
//           <h3 className="mt-5 text-greenDarkCustom font-bold text-[20px]">
//             Đa Dạng Phương Tiện
//           </h3>
//         </div>
//       </a>
//     </div>
//   );
// }

import { SuccessResponse } from "@/types/type";
import { http, urlImage } from "@/utils/http";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TData {
  name: string;
  des: string;
  image: string;
  thumb: string;
}

export default async function Item() {
  const resArrayAbout = (
    await http.get<SuccessResponse<TData[]>>("about?sort=1&publish=1")
  ).data;
  return (
    <div className="pt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
      {resArrayAbout?.data?.map((item, index) => (
        <Link
          key={index}
          href="/vi-sao-chon-chung-toi"
          className="lg:col-span-1"
        >
          <div className="px-5 py-5 shadow-bottom-right overflow-hidden rounded-sm transition-transform duration-100 text-center">
            <div className="w-16 h-16 bg-greenCustom rounded-[100%] mx-auto flex justify-center items-center">
              <Image
                alt=""
                width={645}
                height={431}
                src={`${urlImage}/${item?.image}`}
                className="w-8"
              />
            </div>
            <h3 className="mt-5 text-greenDarkCustom font-bold text-[20px]">
              {item?.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
