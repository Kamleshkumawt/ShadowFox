import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileSellerMutation } from "../../store/api/sellerAuthApi";
import { setSellerUser } from "../../store/slices/authSlice";
import Loading from "../../components/Loading";
import Title from "../../components/sellerPanel/Title";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const Dashboard = () => {
  const seller = useSelector((state) => state.auth.seller);

  const dispatch = useDispatch();

  const [getProfileSeller, { data, isLoading }] = useGetProfileSellerMutation();

  useEffect(() => {
    getProfileSeller();
  }, []);

  useEffect(() => {
    if (data) {
      // console.log('data : ',data);
      dispatch(setSellerUser(data.seller));
    }
  }, [data, dispatch]);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 140 },
    { month: "June", desktop: 214, mobile: 150 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  };

  return !isLoading ? (
    <div>
      {/* {seller && seller.store_name && <h1>{seller.store_name}</h1>} */}
      <Title text1={"Dashboard"} text2={"Details"} />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 sm:gap-8 p-2">
          <div className="border border-gray-400 p-2 sm:p-5 rounded-sm font-medium flex flex-col w-full gap-5">
            <span className="flex items-center gap-3">
              <img
                src="https://img.icons8.com/?size=96&id=QDgOnr6UAOmg&format=png"
                alt="icon"
                className="sm:w-8 w-5 h-5 sm:h-8 object-cover"
              />
              Pending PR's
            </span>{" "}
            <span className="text-2xl font-bold w-full text-end">165</span>
          </div>
          <div className="border border-gray-400 p-5 rounded-sm font-medium flex flex-col w-full gap-5">
            <span className="flex items-center gap-3">
              <img
                src="https://img.icons8.com/?size=96&id=QDgOnr6UAOmg&format=png"
                alt="icon"
                className="sm:w-8 w-5 h-5 sm:h-8 object-cover"
              />
              Ongoing PR's
            </span>{" "}
            <span className="text-2xl font-bold text-end">165</span>
          </div>
          <div className="border border-gray-400 p-5 rounded-sm font-medium flex flex-col w-full gap-5">
            <span className="flex items-center gap-3">
              <img
                src="https://img.icons8.com/?size=96&id=QDgOnr6UAOmg&format=png"
                alt="icon"
                className="sm:w-8 w-5 h-5 sm:h-8 object-cover"
              />
              Move To Purchase
            </span>
            <span className="text-2xl font-bold text-end">520</span>
          </div>
          <div className="border border-gray-400 p-5 rounded-sm font-medium flex flex-col w-full gap-5">
            <span className="flex items-center gap-3">
              <img
                src="https://img.icons8.com/?size=96&id=QDgOnr6UAOmg&format=png"
                alt="icon"
                className="sm:w-8 w-5 h-5 sm:h-8 object-cover"
              />
              Total PR's
            </span>
            <span className="text-2xl font-bold text-end">650</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="max-w-lg border border-gray-200 rounded-sm p-2 mt-20">
          <div className="flex items-center justify-between gap-10 p-1">
            <h1>Revenue</h1>
            <div className="flex items-center justify-between gap-10">
              <div className="flex items-center gap-1 text-xs">
              <span className="bg-blue-500 h-[7px] w-[7px] rounded-full"></span>
              Income
            </div>
            <div className="flex items-center gap-1 text-xs ">
              <span className="bg-blue-300 h-[7px] w-[7px] rounded-full"></span>
              Expenses
            </div>
            </div>
          </div> 
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>

        <div>
          kamlesh
        </div>

        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
