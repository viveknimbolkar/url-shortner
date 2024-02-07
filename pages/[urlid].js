import React from "react";

function UrlID({ originalUrl }) {
  if (originalUrl && typeof window !== "undefined") {
    window.location.href = originalUrl;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center text-3xl">
      {originalUrl === null ? "Url dosen't exist :-(" : "Redirecting..."}
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/${params.urlid}`);
  const url = await res.json();
  return {
    props: {
      originalUrl: url.originalUrl || null,
    },
  };
}

export default UrlID;
