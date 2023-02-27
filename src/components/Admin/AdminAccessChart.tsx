import { Box, Flex, Text } from "@chakra-ui/react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      date: '27/2/2023',
      access: 24,
    },
    {
      date: '28/2/2023',
      access: 13,
    },
    {
      date: '1/3/2023',
      access: 98,
    },
    {
      date: '2/3/2023',
      access: 39,
    },
    {
      date: '3/3/2023',
      access: 48,
    },
    {
      date: '4/3/2023',
      access: 38,
    },
    {
      date: '5/3/2023',
      access: 43,
    },
  ];
  
const AdminAccessChart : React.FC = () => {
    return(
        <>
        <Box p="14px 8px" borderBottom="2px solid" borderColor="white">
          <Text fontSize={22} fontWeight={900} >Access Chart</Text>
        </Box>
        <Flex
        align="center"
        p="5px 0px"
        border='1px solid'
        direction="column"
        borderColor='brand.900'>
         <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={13} tickMargin={12} dataKey="date" />
          <YAxis fontSize={13} />
          <Tooltip />
          <Legend/>
          <Line name="Total of Access" type="monotone" dataKey="access" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
        </Flex>
        </>
    );
};
export default AdminAccessChart;