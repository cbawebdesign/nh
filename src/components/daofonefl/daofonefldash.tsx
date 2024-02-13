import React, { useMemo, useState } from 'react';
import { Line, ResponsiveContainer, LineChart, XAxis, LabelList, BarChart, Bar, CartesianGrid, YAxis, Tooltip, Legend, Label } from 'recharts';
import Tile from '~/core/ui/Tile';
import Heading from '~/core/ui/Heading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/core/ui/Table';
import { useUserSession } from '~/core/hooks/use-user-session';
import styles from './daofonefl.module.css'; // Import your CSS file

export default function Daofonefldash() {
  const mrr = useMemo(() => generateDemoData(), []);

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <UserGreetings />
      <p>IN DEVELOPMENT-DRAFT</p>
      <div>
        <Tile>
        <Tile.Heading>
  <span style={{ color: '#0000FF' }}>DAOF I Fund Level Overview</span>
  <h4>All capital deployment figures in $ in millions unless otherwise noted</h4>

</Tile.Heading>           <Tile.Body>
            <StackedBarChart />
          </Tile.Body>
        </Tile>
      </div>
    </div>
  );
}

function UserGreetings() {
  const user = useUserSession();
  const userDisplayName = user?.auth?.displayName ?? user?.auth?.email ?? '';

  return (
    <div>
      <Heading type={4}>Welcome Back, {userDisplayName}</Heading>
      <p className={'text-gray-500 dark:text-gray-400'}>
        Here is what is happening across your business
      </p>
    </div>
  );
}

function Chart(props: React.PropsWithChildren<{ data: { value: string; name: string }[] }>) {
    return (
      <div className={'h-36'}>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2.5} dot={false} />
            <XAxis dataKey="name" height={15} dy={10} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

function CustomersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>2023-03-15</TableCell>
          <TableCell>Product A</TableCell>
          <TableCell>$100.00</TableCell>
          <TableCell>Completed</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function generateDemoData() {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    // ... more data
  ];

  return [data, data[data.length - 1].value.toString()];
}

// Define an interface for CustomizedLabel props
interface LabelProps {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  value?: any; // Can be more specific based on your data
  index?: number;
}

const CustomizedLabel: React.FC<LabelProps & { dataKey: string, chartData: any[] }> = ({ x = 0, y = 0, width = 0, index, dataKey, height, chartData }) => {
  const numX = typeof x === 'number' ? x : parseFloat(x || '0');
  const numY = typeof y === 'number' ? y : parseFloat(y || '0');
  const numWidth = typeof width === 'number' ? width : parseFloat(width || '0');

  // Convert the height to a number
  const numericHeight = typeof height === 'number' ? height : parseFloat(height || '0');

  // Ensure index is defined and a number
  const validIndex = typeof index === 'number' && index >= 0;
  const value = validIndex ? chartData[index][dataKey] : '';

  // Ensure that both y and numericHeight are treated as numbers before addition
  const adjustedY = numY + numericHeight * 0.5; // Adjust this factor as needed

  // Define the font size
  const fontSize = 12; // Adjust the font size as needed

  return (
    <text x={numX + numWidth / 2} y={adjustedY} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>
      {validIndex ? `${dataKey}: ${value}` : ''}
    </text>
  );
};
const StackedBarChart = () => {
  const [chartData, setChartData] = useState([
    { name: 'Q2-2021', Investments: 1.3, Fees: 2, FeeReserve: 6.9, DryPowder: 91.6},
    { name: 'Q3-2021', Investments: 5.0, Fees: 2, FeeReserve: 6.9, DryPowder: 87.9 },
    { name: 'Q4-2021', Investments: 21.5, Fees: 2, FeeReserve: 6.9, DryPowder: 71.4 },
    { name: 'Q1-2022', Investments: 37.8, Fees: 2, FeeReserve: 6.9, DryPowder: 55.1 },
    { name: 'Q2-2022', Investments: 42.6, Fees: 2, FeeReserve: 6.9, DryPowder: 50.3 },
    { name: 'Q3-2022', Investments: 50.0, Fees: 2, FeeReserve: 6.9, DryPowder: 42.9 },
    { name: 'Q4-2022', Investments: 51.5, Fees: 2, FeeReserve: 6.9, DryPowder: 41.4},
    { name: 'Q1-2023', Investments: 75.5, Fees: 2, FeeReserve: 6.9, DryPowder: 17.7 },
    { name: 'Q2-2023', Investments: 76.7, Fees: 2, FeeReserve: 6.9, DryPowder: 16.2 },
    { name: 'Q3-2023', Investments: 80.5, Fees: 2, FeeReserve: 6.9, DryPowder: 12.4 },
    { name: 'Q4-2023', Investments: 81.0, Fees: 2, FeeReserve: 6.9, DryPowder: 11.9}



  ]);



  const renderCustomizedLabel = (props: LabelProps, dataKey: string) => {
    return <CustomizedLabel {...props} dataKey={dataKey} chartData={chartData} />;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
    <div style={{ position: 'relative', width: '100%', paddingTop: '36.25%' }}>
      <iframe 
        title="DAOF 1 Visuals v2" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        src="https://app.fabric.microsoft.com/reportEmbed?reportId=994ee472-3526-4259-8f4e-82290090e83f&autoAuth=true&ctid=f63e5255-d676-4605-926f-8136f95168b5" 
        frameBorder="0" 
        allowFullScreen={true}
      ></iframe>
    </div>
  </ResponsiveContainer>

  );

};