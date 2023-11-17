import React, { useMemo, useState } from 'react';
import { Line, ResponsiveContainer, LineChart, XAxis, LabelList } from 'recharts';
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

import styles from './daoftwo.module.css'; // Import your CSS file

export default function daoftwo() {

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <UserGreetings />
      <p>IN DEVELOPMENT-DRAFT</p>

      <div>
        <Tile>
        <Tile.Heading>
  <span style={{ color: '#0000FF' }}>DAOF II Capital Deployment</span>
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
    { name: 'Q1-2023', Starlite: 5, UnitasGlobal: 10, WeLink: 2.2, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 50.5 },
    { name: 'Q2-2023', Starlite: 5, UnitasGlobal: 10, WeLink: 2.2, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 50.5 },
    { name: 'Q3-2023', Starlite: 5, UnitasGlobal: 10, WeLink: 2.2, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 50.5 },
    { name: 'Q4-2023', Starlite: 5, UnitasGlobal: 10, WeLink: 8.0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 44.6 },
    { name: 'Q1-2024P', Starlite: 5, UnitasGlobal: 10, WeLink: 8.0, FeesActual: 1.9, FeeReserve:5.6 , DryPowder: 44.6 },
    { name: 'Q2-2024P', Starlite: 5, UnitasGlobal: 10, WeLink: 8.0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 44.6 },
    { name: 'Q3-2024P', Starlite: 5, UnitasGlobal: 10, WeLink: 8.0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 44.6 },
    { name: 'Q4-2024P', Starlite: 5, UnitasGlobal: 10, WeLink: 8.0, FeesActual: 1.9, FeeReserve:5.6, DryPowder: 44.6 }
  ]);
  const handleDataChange = (page: string, key: keyof typeof chartData[0], value: string) => {
    // Find the index of the selected data
    const pageIndex = chartData.findIndex(item => item.name === page);
  
    if (pageIndex === -1) {
      // Data for the selected page is not found
      return;
    }
  
    // Convert the value to a number
    const numericValue = parseFloat(value);
  
    // Calculate the change in value for the selected key
    const currentPageData = chartData[pageIndex];
  
    if (!currentPageData) {
      return;
    }
  
    // Convert the current value to a number
    const currentValue = currentPageData[key] as number;
  
    // Calculate the change in value
    const changeInValue = numericValue - (currentValue || 0);
  
    // Update the selected key and 'DryPowder'
    const updatedData = chartData.map((item, index) => {
      if (index === pageIndex) {
        return {
          ...item,
          [key]: numericValue,
          DryPowder: (item.DryPowder || 0) - changeInValue,
        };
      }
      return item;
    });
  
    // Update the chartData state with the updated data
    setChartData(updatedData);
  };

  const renderCustomizedLabel = (props: LabelProps, dataKey: string) => {
    return <CustomizedLabel {...props} dataKey={dataKey} chartData={chartData} />;
  };

 

  return (
<div className={`flex flex-col space-y-6 pb-36 ${styles.tablesContainer}`}>
  {/* ... */}
  <div className={`flex ${styles.tableWrapper}`}>

    <div className={styles.table}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead>Starlite</TableHead>
            <TableHead>UnitasGlobal</TableHead>
            <TableHead>WeLink</TableHead>
            <TableHead>FeesActual</TableHead>
            <TableHead>FeeReserve</TableHead>
            <TableHead>DryPowder</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {chartData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.Starlite}
                  onChange={(e) => handleDataChange(item.name, 'Starlite', e.target.value)}

                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.UnitasGlobal}
                  onChange={(e) => handleDataChange(item.name, 'UnitasGlobal', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.WeLink}
                  onChange={(e) => handleDataChange(item.name, 'WeLink', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.FeesActual}
                  onChange={(e) => handleDataChange(item.name, 'FeesActual', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.FeeReserve}
                  onChange={(e) => handleDataChange(item.name, 'FeeReserve', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.DryPowder}
                  onChange={(e) => handleDataChange(item.name, 'DryPowder', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className={styles.tableWrapper}>


    <div className={styles.table}>
      {/* Second table code */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead>Starlite</TableHead>
            <TableHead>Unitas Global</TableHead>
            <TableHead>WeLink</TableHead>
            <TableHead>FeesActual</TableHead>
            <TableHead>FeeReserve</TableHead>
            <TableHead>DryPowder</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {chartData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.Starlite}</TableCell>
              <TableCell>{item.UnitasGlobal}</TableCell>
              <TableCell>{item.WeLink}</TableCell>
              <TableCell>{item.FeesActual}</TableCell>
              <TableCell>{item.FeeReserve}</TableCell>
              <TableCell>{item.DryPowder}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>

      
    </div>
      <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Starlite" stackId="a" fill="#8884d8">
          <LabelList content={(props) => renderCustomizedLabel(props, 'Starlite')} />
        </Bar>
        <Bar dataKey="UnitasGlobal" stackId="a" fill="#82ca9d">
          <LabelList content={(props) => renderCustomizedLabel(props, 'UnitasGlobal')} />
        </Bar>
        <Bar dataKey="WeLink" stackId="a" fill="#0000FF">
          <LabelList content={(props) => renderCustomizedLabel(props, 'WeLink')} />
        </Bar>
        <Bar dataKey="FeesActual" stackId="a" fill="#a52a2a">
          <LabelList content={(props) => renderCustomizedLabel(props, 'FeesActual')} />
        </Bar>
        <Bar dataKey="FeeReserve" stackId="a" fill="#a52a2a">
          <LabelList content={(props) => renderCustomizedLabel(props, 'FeeReserve')} />
        </Bar>
      
        <Bar dataKey="DryPowder" stackId="a" fill="#A020F0">
          <LabelList content={(props) => renderCustomizedLabel(props, 'DryPowder')} />
        </Bar>
      
      </BarChart>
      
    </ResponsiveContainer>

    
    </div>

    
  );
  
};
