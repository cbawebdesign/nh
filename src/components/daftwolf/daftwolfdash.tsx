import React, { useMemo, useState } from 'react';
import { Line, ResponsiveContainer, LineChart, XAxis } from 'recharts';
import Tile from '~/core/ui/Tile';
import Heading from '~/core/ui/Heading';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

import { useUserSession } from '~/core/hooks/use-user-session';
import { BarChart, Bar, CartesianGrid, YAxis, Tooltip, Legend } from 'recharts';

import styles from './daftwolf.module.css'; // Import your CSS file

export default function Daftwolfdash() {
  const mrr = useMemo(() => generateDemoData(), []);

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <UserGreetings />
      <p>IN DEVELOPMENT-DRAFT</p>

      <div>
        <Tile>
        <Tile.Heading>
  <span style={{ color: '#0000FF' }}>DAF II Fund Level Overview</span>
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
        Here&apos;s what&apos;s happening across your business
      </p>
    </div>
  );
}

function Chart(props: React.PropsWithChildren<{ data: { value: string; name: string }[] }>) {
    return (
      <div className={'h-36'}>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart data={props.data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2.5}
              dot={false}
            />
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
        {/* Sample table rows */}
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>2023-03-15</TableCell>
          <TableCell>Product A</TableCell>
          <TableCell>$100.00</TableCell>
          <TableCell>Completed</TableCell>
        </TableRow>
        {/* Add more rows as needed */}
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

const StackedBarChart = () => {
  const [chartData, setChartData] = useState([
    { name: 'Q1-2023', Starlite: 5, UnitasGlobal: 2400, WeLink: 1000, FeesActual: 500, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q2-2023', Starlite: 5, UnitasGlobal: 1398, WeLink: 1200, FeesActual: 700, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q3-2023', Starlite: 5, UnitasGlobal: 9800, WeLink: 1100, FeesActual: 600, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q4-2023', Starlite: 5, UnitasGlobal: 3908, WeLink: 1500, FeesActual: 800, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q1-2024P', Starlite: 5, UnitasGlobal: 4800, WeLink: 1600, FeesActual: 500, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q2-2024P', Starlite: 5, UnitasGlobal: 3800, WeLink: 1700, FeesActual: 700, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q3-2024P', Starlite: 5, UnitasGlobal: 4300, WeLink: 1800, FeesActual: 900, FeeReserve: 10, DryPowder: 10 },
    { name: 'Q4-2024P', Starlite: 5, UnitasGlobal: 4300, WeLink: 1800, FeesActual: 900, FeeReserve: 10, DryPowder: 10 }
  ]);

  
  const handleDataChange = (page: string, key: string, value: string) => {
    const newData = chartData.map(item =>
      item.name === page ? { ...item, [key]: parseFloat(value) } : item
    );
    setChartData(newData);
  };

  return (
    <div>


      <div style={{ padding: '10px', maxWidth: '800px', margin: 'auto' }}>
      <div className={styles.dataInputRow}>
          <label className={styles.columnHeader}>Quarter</label>
          <label className={styles.columnHeader}>Starlite</label>
          <label className={styles.columnHeader}>UnitasGlobal</label>
          <label className={styles.columnHeader}>WeLink</label>
          <label className={styles.columnHeader}>FeesActual</label>
          <label className={styles.columnHeader}>FeeReserve</label>
          <label className={styles.columnHeader}>DryPowder</label>
        </div>
        {chartData.map((item, index) => (
          <div className={styles.dataInputRow} key={index}>
            <div className={styles.dataCell}>{item.name}</div>
            <div className={styles.dataCell}>
              <input
                className={styles.dataInput}
                type="number"
                value={item.Starlite}
                onChange={(e) => handleDataChange(item.name, 'Starlite', e.target.value)}
              />
            </div>
            {/* Repeat for other fields */}
            <div className={styles.dataCell}>
              <input
                className={styles.dataInput}
                type="number"
                value={item.UnitasGlobal}
                onChange={(e) => handleDataChange(item.name, 'UnitasGlobal', e.target.value)}
              />
            </div>
            <div className={styles.dataCell}>
              <input
                className={styles.dataInput}
                type="number"
                value={item.WeLink}
                onChange={(e) => handleDataChange(item.name, 'WeLink', e.target.value)}
              />
            </div>
            <div className={styles.dataCell}>
              <input
                className={styles.dataInput}
                type="number"
                value={item.FeesActual}
                onChange={(e) => handleDataChange(item.name, 'FeesActual', e.target.value)}
              />
            </div>
            <div className={styles.dataCell}>
              <input
                className={styles.dataInput}
                type="number"
                value={item.FeeReserve}
                onChange={(e) => handleDataChange(item.name, 'FeeReserve', e.target.value)}
              />
            </div>
            <div className={styles.dataCell}>
              <input
                className={styles.dataInput}
                type="number"
                value={item.DryPowder}
                onChange={(e) => handleDataChange(item.name, 'DryPowder', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Starlite" stackId="a" fill="#8884d8" />
          <Bar dataKey="UnitasGlobal" stackId="a" fill="#89CFF0" />
          <Bar dataKey="WeLink" stackId="a" fill="#191970" />
          <Bar dataKey="FeesActual" stackId="a" fill="#a52a2a" />
          <Bar dataKey="FeeReserve" stackId="a" fill="#a52a2a" />
          <Bar dataKey="DryPowder" stackId="a" fill="#D2B48C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
