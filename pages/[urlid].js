import InProgress from "@/components/InProgress";
import React from "react";

function UrlID({ originalUrl }) {
  if (originalUrl && typeof window !== "undefined") {
    window.location.href = originalUrl;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center text-3xl">
      {originalUrl === null ? (
        "Url dosen't exist :-("
      ) : (
        <InProgress type="redirecting" />
      )}
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/${params.urlid}`
  );
  const url = await res.json();
  return {
    props: {
      originalUrl: url.originalUrl || null,
    },
  };
}

export default UrlID;
