import React, { useMemo, useState } from 'react';
import { Line, ResponsiveContainer, LineChart, XAxis, LabelList, Label } from 'recharts';
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
  <h6>All capital deployment figures in $ in millions unless otherwise noted</h6>

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
  const numericHeight = typeof height === 'number' ? height : parseFloat(height || '0');
  const validIndex = typeof index === 'number' && index >= 0;
  const value = validIndex ? chartData[index][dataKey] : '';
  const adjustedY = numY + numericHeight * 0.5;
  const fontSize = 12;

  return (
    <text x={numX + numWidth / 2} y={adjustedY} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>
      {validIndex ? `${dataKey}: ${value}` : ''}
    </text>
  );
};

const StackedBarChart = () => {
  // Assuming the type for a single data item
  interface ChartDataItem {
    name: string;
    Starlite: number;
    UnitasGlobal: number;
    WeLink: number;
    FeesActual: number;
    FeeReserve: number;
    DryPowder: number;
  }

  const initialChartData: ChartDataItem[] = [
    { name: 'Q1-2023', Starlite: 5, UnitasGlobal: 10, WeLink: 2.2, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 50.5 },
    { name: 'Q2-2023', Starlite: 0, UnitasGlobal: 0, WeLink: 0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 50.5 },
    { name: 'Q3-2023', Starlite: 0, UnitasGlobal: 0, WeLink: 0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 50.5 },
    { name: 'Q4-2023', Starlite: 0, UnitasGlobal: 0, WeLink: 5.9, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 44.6 },
    { name: 'Q1-2024P', Starlite: 0, UnitasGlobal: 0, WeLink: 0, FeesActual: 1.9, FeeReserve:5.6 , DryPowder: 44.6 },
    { name: 'Q2-2024P', Starlite: 0, UnitasGlobal: 0, WeLink: 0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 44.6 },
    { name: 'Q3-2024P', Starlite: 0, UnitasGlobal: 0, WeLink: 0, FeesActual: 1.9, FeeReserve: 5.6, DryPowder: 44.6 },
    { name: 'Q4-2024P', Starlite: 0, UnitasGlobal: 0, WeLink: 0, FeesActual: 1.9, FeeReserve:5.6, DryPowder: 44.6 }    // ... other initial data
  ];

 
  const handleDataChange = (page: string, key: keyof ChartDataItem, value: string) => {
    const numericValue = parseFloat(value);
  
    // Find the index of the quarter being updated
    const pageIndex = inputChartData.findIndex(item => item.name === page);
    const changeInValue = pageIndex !== -1 ? numericValue - (inputChartData[pageIndex][key] as number) : 0;
  
    // Update input chart data and adjust DryPowder for current and subsequent quarters
    const updatedInputChartData = inputChartData.map((item, index) => {
      if (index === pageIndex) {
        // Change the key's value and DryPowder for the current quarter
        return { ...item, [key]: numericValue, DryPowder: item.DryPowder - changeInValue };
      } else if (index > pageIndex && key !== 'DryPowder' && key !== 'FeeReserve' && key !== 'FeesActual') {
        // Only change DryPowder for subsequent quarters
        return { ...item, DryPowder: item.DryPowder - changeInValue };
      }
      return item;
    });
  
    // Calculate the cumulative data for the output table
    const newCumulativeChartData = calculateCumulativeOutputData(updatedInputChartData);
  
    // Update the state for both input and output chart data
    setInputChartData(updatedInputChartData);
    setCumulativeChartData(newCumulativeChartData);
  };
  
  // The function to calculate cumulative data for the output table
  const calculateCumulativeOutputData = (inputData: ChartDataItem[]) => {
    let cumulativeValues: ChartDataItem = { 
      name: '', 
      Starlite: 0, 
      UnitasGlobal: 0, 
      WeLink: 0, 
      FeesActual: inputData[0]?.FeesActual || 0,
      FeeReserve: inputData[0]?.FeeReserve || 0, 
      DryPowder: inputData[0]?.DryPowder || 0 
    };

    return inputData.map(item => {
      return {
        name: item.name,
        Starlite: parseFloat((cumulativeValues.Starlite += item.Starlite).toFixed(1)),
        UnitasGlobal: parseFloat((cumulativeValues.UnitasGlobal += item.UnitasGlobal).toFixed(1)),
        WeLink: parseFloat((cumulativeValues.WeLink += item.WeLink).toFixed(1)),
  
        FeesActual: item.FeesActual,
        FeeReserve: item.FeeReserve,
        DryPowder: item.DryPowder
      };
    });
  };
  const [inputChartData, setInputChartData] = useState<ChartDataItem[]>([...initialChartData]);
  const [cumulativeChartData, setCumulativeChartData] = useState<ChartDataItem[]>(calculateCumulativeOutputData([...initialChartData]));
  
    
    // In your handleDataChange function, call this after updating input data
    

  const renderCustomizedLabel = (props: LabelProps, dataKey: keyof ChartDataItem) => {
    return <CustomizedLabel {...props} dataKey={dataKey} chartData={cumulativeChartData} />;
  };
  function getCurrentQuarter() {
    const date = new Date();
    const month = date.getMonth();
    return Math.ceil((month + 1) / 3);
  }
  
  // Helper function to determine if a given quarter is in the past
  function isPastQuarter(quarter: string, currentYear: number) {
    const currentQuarter = getCurrentQuarter();
    const quarterYear = parseInt(quarter.split('-')[1]);
    const quarterNumber = parseInt(quarter.split('Q')[1].split('-')[0]);
  
    return quarterYear < currentYear || (quarterYear === currentYear && quarterNumber < currentQuarter);
  }
  
  // Inside your component
  const currentYear = new Date().getFullYear();
  return (
<div className={`flex flex-col space-y-4 pb-36 justify-start ${styles.tablesContainer}`}>    {/* ... */}
  {/* ... */}

  <div className={`flex ${styles.tableWrapper}`}>
  <h1>Input: Incremental Deployment by Quarter</h1>
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
              {inputChartData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.Starlite}
                  onChange={(e) => handleDataChange(item.name, 'Starlite', e.target.value)}
                   disabled={isPastQuarter(item.name, currentYear)}
                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.UnitasGlobal}
                  onChange={(e) => handleDataChange(item.name, 'UnitasGlobal', e.target.value)}
                   disabled={isPastQuarter(item.name, currentYear)}

                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.WeLink}
                  onChange={(e) => handleDataChange(item.name, 'WeLink', e.target.value)}
                   disabled={isPastQuarter(item.name, currentYear)}

                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.FeesActual}
                  onChange={(e) => handleDataChange(item.name, 'FeesActual', e.target.value)}
                   disabled={isPastQuarter(item.name, currentYear)}

                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.FeeReserve}
                  onChange={(e) => handleDataChange(item.name, 'FeeReserve', e.target.value)}
                   disabled={true}

                />
              </TableCell>
              <TableCell>
                <input
                  className={styles.dataInput}
                  type="number"
                  value={item.DryPowder}
                  onChange={(e) => handleDataChange(item.name, 'DryPowder', e.target.value)}
                   disabled={true}

                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      </div>
      
       
      
      
      <div className={`chartContainer ${styles.chartContainer}`}>      

      <ResponsiveContainer width="100%" height={650}>
      <BarChart data={cumulativeChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis>
        <Label value="Millions Deployed" angle={-90} position='insideLeft' />
      </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="Starlite" stackId="a" fill="#8884d8">
          <LabelList content={(props) => renderCustomizedLabel(props, 'Starlite')} />
        </Bar>
        <Bar dataKey="UnitasGlobal" stackId="a" fill="#82ca9d">
          <LabelList content={(props) => renderCustomizedLabel(props, 'UnitasGlobal')} />
        </Bar>
        <Bar dataKey="WeLink" stackId="a" fill="#89CFF0">
          <LabelList content={(props) => renderCustomizedLabel(props, 'WeLink')} />
        </Bar>
        <Bar dataKey="FeesActual" stackId="a" fill="#191970">
          <LabelList content={(props) => renderCustomizedLabel(props, 'FeesActual')} />
        </Bar>
        <Bar dataKey="FeeReserve" stackId="a" fill="#a52a2a">
          <LabelList content={(props) => renderCustomizedLabel(props, 'FeeReserve')} />
        </Bar>
      
        <Bar dataKey="DryPowder" stackId="a" fill="#D2B48C">
          <LabelList content={(props) => renderCustomizedLabel(props, 'DryPowder')} />
        </Bar>
      
      </BarChart>
      
    </ResponsiveContainer>

    
</div>
     
<div>
    <h1>Outputs: Cumulative Deployment by Quarter</h1>
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
              {cumulativeChartData.map((item, index) => (
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
        
      </div>
    );
  }; 