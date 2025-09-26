"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Tes() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/paper");
        const result = await response.json();
        setData(result.docs);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {data ? (
        <Image alt="Image" src={data[0].media.url} width={500} height={500} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
