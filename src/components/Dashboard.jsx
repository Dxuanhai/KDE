import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "./Header";
import Search from "./Search";
import Table from "./Table";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://apikde.vercel.app/api/register");
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 pt-8 w-full">
      <Header />
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <Search />
          <Table data={data} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
