import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ResponsiveContainer, PieChart, Legend, Pie, Cell, Tooltip } from "recharts";

const data = [
  {
    name: 'Category 1',
    ideas: 24,
  },
  {
    name: 'Category 2',
    ideas: 13,
  },
  {
    name: 'Category 3',
    ideas: 98,
  },
  {
    name: 'Category 4',
    ideas: 39,
  },
  {
    name: 'Category 5',
    ideas: 48,
  },
];
 const COLORS = ['#9981ff', '#71acec', '#ff9cac', '#f374f9', '#ffa973'];
 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
        return (
            <text fontSize={15} fontWeight={500} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

const AdminCategoryChart: React.FC = () => {
    return(
        <>
        <Box p="14px 8px" >
          <Text fontSize={22} fontWeight={900} >Category</Text>
        </Box>
        <Flex
        align="center"
        direction="column">
         <ResponsiveContainer height={400}>
                            <PieChart >
                                <Legend wrapperStyle={{fontSize: "12px"}} layout="horizontal" verticalAlign="bottom"   />
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius="90%"
                                    fill="#8884d8"
                                    dataKey="ideas"

                                >
                                    {data.map((entry, index) => (
                                        <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
        </Flex>
        </>
    )
};
export default AdminCategoryChart;