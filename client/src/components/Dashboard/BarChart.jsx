import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { isFragment } from "react-is";
const BarChart = ({totalIncome, totalExpense}) => {
  const data = [
    {
      name: "Total Income",
      uv: totalIncome,
      
      fill: "#22c55e",
    },
    {
      name: "Total Expense",
      uv: totalExpense,
     
      fill: "#db2777",
    },
  ];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="95%">
        
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="30%"
          barSize={10}
          data={data}
        >
            <Legend />
       
          <RadialBar background dataKey="uv"  />
              </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
