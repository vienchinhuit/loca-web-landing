export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50">{children}</div>
    // <html lang="en">
    //   <head>
    //     <link
    //       rel="stylesheet"
    //       href="https://cdn-uicons.flaticon.com/2.3.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
    //     />
    //   </head>
    //   <body className="text-[14px]">
    // {/* <HeaderPage /> */}
    // {/* <FooterPage /> */}
    //   </body>
    // </html>
  );
}
