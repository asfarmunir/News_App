"use client";
import React, { useState, useEffect } from "react";
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
import { collection, getDocs } from "firebase/firestore";
import db from "@/lib/firebaseConfig";

interface NewsItem {
  creatorEmail: string;
  creatorId: string;
  date: string;
  description: string;
  link: string;
  name: string;
  newsId: string;
  timestamp: any; // Update this according to the exact type of your Firebase timestamp
}

interface GraphProps {
  news: NewsItem[];
}

const CustomBar: React.FC<any> = (props) => {
  const borderRadius = 8;
  return (
    <Rectangle
      {...props}
      radius={[borderRadius, borderRadius, borderRadius, borderRadius]}
      width={16}
    />
  );
};

const MyDropdownMenu: React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFilter }) => {
  return (
    <select
      onChange={(e) => setFilter(e.target.value)}
      className="ml-4 px-2 bg-slate-800 text-white mb-1 py-2 border rounded-lg"
    >
      <option value="monthly">Monthly</option>
      <option value="daily">Daily</option>
      <option value="yearly">Yearly</option>
    </select>
  );
};

const Graph: React.FC<GraphProps> = ({ news }) => {
  const [data, setData] = useState<{ name: string; uv: number }[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [filter, setFilter] = useState<string>("monthly");

  useEffect(() => {
    let processedData: { name: string; uv: number }[];

    switch (filter) {
      case "daily":
        processedData = processWeeklyData(news);
        break;
      case "monthly":
        processedData = processMonthlyData(news);
        break;
      case "yearly":
        processedData = processYearlyData(news);
        break;
      default:
        processedData = [];
    }

    setData(processedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news, filter]);

  const processWeeklyData = (
    news: NewsItem[]
  ): { name: string; uv: number }[] => {
    let days: { name: string; uv: number }[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach((dayName) => {
      days.push({ name: dayName, uv: 0 });
    });

    news.forEach((newsItem) => {
      const dayOfWeek = getDayOfWeek(newsItem.timestamp);
      const dayIndex = days.findIndex((day) => day.name === dayOfWeek);
      if (dayIndex !== -1) {
        days[dayIndex].uv += 1; // Counting the news items
      }
    });

    const uvValues = days.map((day) => day.uv);
    const maxUV = Math.max(...uvValues);
    setMaxValue(maxUV);

    return days;
  };

  const processMonthlyData = (
    news: NewsItem[]
  ): { name: string; uv: number }[] => {
    let months: { name: string; uv: number }[] = [];

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

    news.forEach((newsItem) => {
      const monthName = getMonthName(newsItem.timestamp);
      const monthIndex = months.findIndex((month) => month.name === monthName);
      if (monthIndex !== -1) {
        months[monthIndex].uv += 1; // Counting the news items
      }
    });

    const uvValues = months.map((month) => month.uv);
    const maxUV = Math.max(...uvValues);
    setMaxValue(maxUV);

    return months;
  };

  const processYearlyData = (
    news: NewsItem[]
  ): { name: string; uv: number }[] => {
    let years: { name: string; uv: number }[] = [];
    news.forEach((newsItem) => {
      const year = getYear(newsItem.timestamp);
      const existingYearIndex = years.findIndex(
        (yearData) => yearData.name === year
      );
      if (existingYearIndex !== -1) {
        years[existingYearIndex].uv += 1; // Counting the news items
      } else {
        years.push({ name: year, uv: 1 });
      }
    });

    const uvValues = years.map((year) => year.uv);
    const maxUV = Math.max(...uvValues);
    setMaxValue(maxUV);

    return years;
  };

  const firestoreTimestampToDate = (timestamp: any): Date => {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  };

  const getMonthName = (timestamp: any): string => {
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

  const getDayOfWeek = (timestamp: any): string => {
    const date = firestoreTimestampToDate(timestamp);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = date.getDay();
    return dayNames[dayOfWeek];
  };

  const getYear = (timestamp: any): string => {
    const date = firestoreTimestampToDate(timestamp);
    return date.getFullYear().toString();
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
                Registered Businesses
              </div>
              <div>
                <MyDropdownMenu setFilter={setFilter} />
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-4 py-2 rounded-md inline-flex items-center gap-2">
            <p className="text-slate-600">Jan 2024 - Dec 2024</p>
            <Image
              src="/icons/calendar.svg"
              width={25}
              height={25}
              alt="ok"
              className="mb-1"
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
              tick={{ fill: "#22333B", fontSize: 12 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              type="number"
              domain={[0, maxValue]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "black" }}
              padding={{ top: 5, bottom: 5 }}
              tickFormatter={(tick) => tick.toFixed(0)} // Convert to whole numbers
            />

            <Tooltip formatter={(value) => [`Count: ${value}`]} />
            <Bar dataKey="uv" fill="black" barSize={12} shape={<CustomBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Replace this with a real Firestore fetch function
const fetchNewsFromFirestore = async (): Promise<NewsItem[]> => {
  const querySnapshot = await getDocs(collection(db, "businesses"));
  const newsData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: doc.data().timestamp, // assuming timestamp is a Firebase Timestamp
  })) as NewsItem[];
  return newsData;
};

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await fetchNewsFromFirestore();
      setNews(newsData);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <Graph news={news} />
    </div>
  );
};

export default App;
