"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const CustomBar = (props) => {
  const borderRadius = 8;
  return (
    <Rectangle
      {...props}
      radius={[borderRadius, borderRadius, borderRadius, borderRadius]}
      width={16}
    />
  );
};

const MyDropdownMenu = ({ setFilter }) => {
  return (
    <select
      onChange={(e) => setFilter(e.target.value)}
      className="ml-4 px-2 bg-slate-800 text-white mb-1 py-2 border rounded-lg"
    >
      <option value="daily">Daily</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  );
};

const Graph = ({ earnings }) => {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [filter, setFilter] = useState("monthly");

  useEffect(() => {
    let processedData;

    switch (filter) {
      case "daily":
        processedData = processWeeklyData(earnings);
        break;
      case "monthly":
        processedData = processMonthlyData(earnings);
        break;
      case "yearly":
        processedData = processYearlyData(earnings);
        break;
    }

    setData(processedData);
  }, [earnings, filter]);

  const processWeeklyData = (earnings) => {
    let days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach((dayName) => {
      days.push({ name: dayName, uv: 0 });
    });

    earnings.forEach((earning) => {
      const dayOfWeek = getDayOfWeek(earning.date);
      const dayIndex = days.findIndex((day) => day.name === dayOfWeek);
      if (dayIndex !== -1) {
        days[dayIndex].uv += earning.amount;
      }
    });

    const uvValues = days.map((day) => day.uv);
    const maxUV = Math.max(...uvValues);
    setMaxValue(maxUV);

    return days;
  };

  const processMonthlyData = (earnings) => {
    let months = [];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    monthNames.forEach((monthName) => {
      months.push({ name: monthName, uv: 0 });
    });

    earnings.forEach((earning) => {
      const monthName = getMonthName(earning.date);
      const monthIndex = months.findIndex((month) => month.name === monthName);
      if (monthIndex !== -1) {
        months[monthIndex].uv += earning.amount;
      }
    });

    const uvValues = months.map((month) => month.uv);
    const maxUV = Math.max(...uvValues);
    setMaxValue(maxUV);

    return months;
  };

  const processYearlyData = (earnings) => {
    let years = [];
    earnings.forEach((earning) => {
      const year = getYear(earning.date);
      const existingYearIndex = years.findIndex(
        (yearData) => yearData.name === year
      );
      if (existingYearIndex !== -1) {
        years[existingYearIndex].uv += earning.amount;
      } else {
        years.push({ name: year, uv: earning.amount });
      }
    });

    const uvValues = years.map((year) => year.uv);
    const maxUV = Math.max(...uvValues);
    setMaxValue(maxUV);

    return years;
  };

  const firestoreTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date;
  };

  const getMonthName = (timestamp) => {
    const date = firestoreTimestampToDate(timestamp);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthNumber = date.getMonth();
    return monthNames[monthNumber];
  };

  const getDayOfWeek = (timestamp) => {
    const date = firestoreTimestampToDate(timestamp);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = date.getDay();
    return dayNames[dayOfWeek];
  };

  const getYear = (timestamp) => {
    const date = firestoreTimestampToDate(timestamp);
    return date.getFullYear();
  };

  return (
    <div style={{ backgroundColor: "white" }} className="p-0 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between p-0 py-2 md:py-4 md:p-4 pl-0 font-mulish">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center">
              <div
                className="pb-1 mr-4 font-mulish"
                style={{ fontSize: "28px", fontWeight: "900" }}
              >
                Registrations
              </div>
              <div>
                <MyDropdownMenu setFilter={setFilter} />
              </div>
            </div>
          </div>
          <div className=" bg-slate-50 px-4 py-2 rounded-md inline-flex items-center gap-2">
            <p className=" text-slate-600 ">9 Jan 2023 - 7 Dec 2024</p>
            <Image
              src="/icons/calendar.svg"
              width={25}
              height={25}
              alt="ok"
              className=" mb-1"
            />
          </div>
        </div>
      </div>

      <div className="">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#22333B" }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              type="number"
              domain={[0, 80]}
              axisLine={false}
              tickFormatter={(tick) => tick.toString()}
              tickLine={false}
              tick={{ fill: "black" }}
              padding={{ top: 5, bottom: 5 }}
            />

            <Tooltip formatter={(value) => [`Amount: ${value}`]} />
            <Bar dataKey="uv" fill="black" barSize={12} shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const dummyEarnings = [
  { date: new Date("2024-01-01"), amount: 2000 },
  { date: new Date("2024-02-01"), amount: 1500 },
  { date: new Date("2024-03-01"), amount: 6900 },
  { date: new Date("2024-04-01"), amount: 2500 },
  { date: new Date("2024-05-01"), amount: 1500 },
  { date: new Date("2024-06-01"), amount: 3500 },
  { date: new Date("2024-07-01"), amount: 4000 },
  { date: new Date("2024-08-01"), amount: 3200 },
  { date: new Date("2024-09-01"), amount: 2100 },
  { date: new Date("2024-10-01"), amount: 5500 },
  { date: new Date("2024-11-01"), amount: 3100 },
  { date: new Date("2024-12-01"), amount: 6500 },
];

const App = () => {
  return (
    <div className=" w-full">
      <Graph earnings={dummyEarnings} />
    </div>
  );
};

export default App;
