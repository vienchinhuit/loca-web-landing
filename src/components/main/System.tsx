"use client";
import { DataContent, SuccessResponse } from "@/types/type";
import { http } from "@/utils/http";
import React, { useEffect, useState } from "react";
interface TItem {
  id: number;
  name: string;
  des: string;
}
interface Props {
  dataTitle: DataContent;
}
export default function System({ dataTitle }: Props) {
  const [data, setData] = useState([]);
  const [id, setId] = useState(1 as number);

  const getAll = async () => {
    try {
      const res = (await http.get<SuccessResponse<[]>>("branch")).data;

      if (res.statusCode === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  // useEffect(() => {
  //   // Đoạn code chỉ chạy trên client sau khi component đã render
  //   const firstItem =
  //     document.querySelector<HTMLButtonElement>(".accordion button");

  //   if (firstItem) {
  //     firstItem?.setAttribute("aria-expanded", "true");
  //   }

  //   const items =
  //     document.querySelectorAll<HTMLButtonElement>(".accordion button");

  //   function toggleAccordion(this: HTMLButtonElement) {
  //     const itemToggle = this.getAttribute("aria-expanded");

  //     items.forEach((item) => {
  //       item?.setAttribute("aria-expanded", "false");
  //     });

  //     if (itemToggle === "false") {
  //       this.setAttribute("aria-expanded", "true");
  //     }
  //   }

  //   items.forEach((item) => item?.addEventListener("click", toggleAccordion));

  //   // Cleanup event listeners khi component unmount
  //   return () => {
  //     items.forEach((item) =>
  //       item?.removeEventListener("click", toggleAccordion)
  //     );
  //   };
  // }, [id]);

  return (
    <div className="bg-grayCustom w-full lg:py-20 md:py-20 py-10">
      <div className="container text-center">
        <h2 className="text-greenDarkCustom font-bold text-[25px] lg:text-[30px] mb-7">
          {dataTitle?.name}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="lg:col-span-1">
            <div className="accordion">
              {data.map((item: TItem, index) => (
                <div key={index} className="accordion-item">
                  <button
                    id="accordion-button-1"
                    style={{
                      backgroundColor: id == item?.id ? "#0eca5996" : "#ffffff",
                      color: id == item?.id ? "#ffffff" : "#000000",
                    }}
                    aria-expanded="false"
                    onClick={() => {
                      if (item?.id === id) {
                        setId(0);
                      } else {
                        setId(item?.id);
                      }
                    }}
                  >
                    <span className="accordion-title px-5 flex justify-between items-center">
                      {item?.name}
                      <i className="fi fi-sr-angle-small-down mt-1" />
                    </span>
                  </button>
                  <div
                    className="accordion-content bg-white text-left"
                    style={{
                      maxHeight: id == item?.id ? 1000 : 0,
                      transition: "0.3s",
                    }}
                  >
                    <div className="py-2">
                      <p>
                        {item?.des
                          .split("\n")
                          .map((line: string, index: number) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.602267507604!2d106.66621797570379!3d10.841718757984644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529aeecedb079%3A0x255246387c6277fc!2zNTQgSOG6u20gMjA4IMSQLiBT4buRIDksIEtEQyBDaXR5bGFuZCBQYXJrIEhpbGxzLCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1725441211065!5m2!1svi!2s"
              className="h-[350px] w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
