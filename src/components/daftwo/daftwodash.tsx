



  import React, { useMemo, useState } from 'react';
  import { Line, ResponsiveContainer, LineChart, XAxis, LabelList } from 'recharts';
  import { TooltipProps } from 'recharts';

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
  import { BarChart, Bar, CartesianGrid, YAxis, Tooltip, Legend} from 'recharts';
  
  import styles from './daftwo.module.css'; // Import your CSS file

  interface TooltipDataItem {
    name: string;
    value: number;
    color: string;
  }
  
  // Define the payload as an array of TooltipDataItem
  type TooltipPayload = TooltipDataItem[];
  
  const CustomTooltip: React.FC<{ active?: boolean; payload?: TooltipPayload; label?: string }> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Cast payload to the defined type
      const typedPayload = payload as TooltipPayload;
  
      const activePayload = typedPayload.find(p => p.value > 0);
  
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
         <p><strong>{label}</strong></p>
          {activePayload && (
            <p style={{  color: activePayload.color }}>
              {`${activePayload.name}: ${activePayload.value}`}
            </p>
          )}
        </div>
      );
    }
  
    return null;
  };
  
  
  
  export default function Daftwo() {
  
    return (
      <div className={'flex flex-col space-y-6 pb-36'}>
        <UserGreetings />
        <p>IN DEVELOPMENT-DRAFT</p>
  
        <div>
          <Tile>
          <Tile.Heading>
    <span style={{ color: '#0000FF' }}>DAF II Capital Deployment</span>
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
      Element8: number;
      WeLink: number;
      DTIQ: number;
      QWILTPS: number;
      Tarana: number;
      PFUNITASRS:number;
      RPMA: number;
      FeesActual: number;
      FeeReserve: number;
      DryPowder: number;
      Other: number;
    }

    
    const initialChartData: ChartDataItem[] = [
      { name: 'Q4-2022', Other: 15.0, Element8: 0, WeLink: 67.8, DTIQ: 123.4, QWILTPS: 74.3, FeesActual: 1.9, Tarana: 0, RPMA:12.0, PFUNITASRS:198.9, FeeReserve: 105.6, DryPowder: 458.4 },
      { name: 'Q1-2023', Other: 0, Element8: 0, WeLink: 16.5, DTIQ: 0, QWILTPS: 0.5, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 439.0 },
      { name: 'Q2-2023', Other: 0, Element8: 20.0, WeLink: 13.5, DTIQ: 6.5, QWILTPS: 1.4, FeesActual: 1.9, Tarana: 40.0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 344.3 },
      { name: 'Q3-2023', Other: 0, Element8: 59.9, WeLink: 5.1, DTIQ: 2.0, QWILTPS: 0.2, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 264.2 },
      { name: 'Q4-2023', Other: 0, Element8: 30, WeLink: 1.2, DTIQ: 0, QWILTPS: 0.1, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.5, DryPowder: 230.1 },
      { name: 'Q1-2024P', Other: 0, Element8: 0, WeLink: 0, DTIQ: 0, QWILTPS: 0, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 230.1 },
      { name: 'Q2-2024P', Other: 0, Element8: 0, WeLink: 0, DTIQ: 0, QWILTPS: 0, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 230.1 },
      { name: 'Q3-2024P', Other: 0, Element8: 0, WeLink: 0, DTIQ: 0, QWILTPS: 0, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 230.1 },
      { name: 'Q4-2024P', Other: 0, Element8: 0, WeLink: 0, DTIQ: 0, QWILTPS: 0, FeesActual: 1.9, Tarana: 0, RPMA:0, PFUNITASRS:0, FeeReserve: 105.6, DryPowder: 230.1 },
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
        Other: 0, 
        Element8: 0, 
        WeLink: 0, 
        DTIQ: 0,
        QWILTPS: 0,
        Tarana:0,
        RPMA: 0,
        PFUNITASRS: 0,
        FeesActual: inputData[0]?.FeesActual || 0,
        FeeReserve: inputData[0]?.FeeReserve || 0, 
        DryPowder: inputData[0]?.DryPowder || 0 
      };
  
      return inputData.map(item => {
        return {
          name: item.name,
          Other: parseFloat((cumulativeValues.Other += item.Other).toFixed(1)),
          Element8: parseFloat((cumulativeValues.Element8 += item.Element8).toFixed(1)),
          WeLink: parseFloat((cumulativeValues.WeLink += item.WeLink).toFixed(1)),
          DTIQ: parseFloat((cumulativeValues.DTIQ += item.DTIQ).toFixed(1)),
          Tarana: parseFloat((cumulativeValues.Tarana += item.Tarana).toFixed(1)),
          RPMA: parseFloat((cumulativeValues.RPMA += item.RPMA).toFixed(1)),
          PFUNITASRS: parseFloat((cumulativeValues.PFUNITASRS += item.PFUNITASRS).toFixed(1)),
          QWILTPS: parseFloat((cumulativeValues.QWILTPS += item.QWILTPS).toFixed(1)),

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
  <div className={`flex flex-col space-y-6 pb-36 ${styles.tablesContainer}`}>
    {/* ... */}
  
    <div className={`flex ${styles.tableWrapper}`}>
      <div>
  <h1>Input: Incremental Deployment by Quarter</h1>
      <div className={styles.table}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quarter</TableHead>
              <TableHead>Other</TableHead>
              <TableHead>Element8</TableHead>
              <TableHead>WeLink</TableHead>
              <TableHead>DTIQ</TableHead>
              <TableHead>QWILTPS</TableHead>
              <TableHead>Tarana</TableHead>
              <TableHead>RPMA</TableHead>
              <TableHead>PFUNITASRS</TableHead>
              <TableHead>FeesActual</TableHead>
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
                    value={item.Other}
                    onChange={(e) => handleDataChange(item.name, 'Other', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.Element8}
                    onChange={(e) => handleDataChange(item.name, 'Element8', e.target.value)}
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
                    value={item.DTIQ}
                    onChange={(e) => handleDataChange(item.name, 'DTIQ', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
  
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.QWILTPS}
                    onChange={(e) => handleDataChange(item.name, 'QWILTPS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
  
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.Tarana}
                    onChange={(e) => handleDataChange(item.name, 'Tarana', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
  
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.RPMA}
                    onChange={(e) => handleDataChange(item.name, 'RPMA', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
  
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.PFUNITASRS}
                    onChange={(e) => handleDataChange(item.name, 'PFUNITASRS', e.target.value)}
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
      <div>
  <h1>Outputs: Cumulative Deployment by Quarter</h1>
      <div className={styles.tableWrapper}>
  
      <div className={styles.table}>
        {/* Second table code */}
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Quarter</TableHead>
              <TableHead>Other</TableHead>
              <TableHead>Element8</TableHead>
              <TableHead>WeLink</TableHead>
              <TableHead>DTIQ</TableHead>
              <TableHead>QWILTPS</TableHead>
              <TableHead>Tarana</TableHead>
              <TableHead>RPMA</TableHead>
              <TableHead>PFUNITASRS</TableHead>
              <TableHead>FeesActual</TableHead>
              <TableHead>DryPowder</TableHead>
  
            </TableRow>
          </TableHeader>
          <TableBody>
                {cumulativeChartData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.Other}</TableCell>
                <TableCell>{item.Element8}</TableCell>
                <TableCell>{item.WeLink}</TableCell>
                <TableCell>{item.DTIQ}</TableCell>
                <TableCell>{item.QWILTPS}</TableCell>
                <TableCell>{item.Tarana}</TableCell>
                <TableCell>{item.RPMA}</TableCell>
                <TableCell>{item.PFUNITASRS}</TableCell>

                <TableCell>{item.FeesActual}</TableCell>
                <TableCell>{item.DryPowder}</TableCell>
  
  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </div>
  
        
      </div>
        <ResponsiveContainer width="100%" height={800}>
        <BarChart data={cumulativeChartData}>
        <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
  <Legend />

          <Bar dataKey="Other" stackId="a" fill="#8884d8">
            
          </Bar>
          <Bar dataKey="Element8" stackId="a" fill="#82ca9d">
            <LabelList content={(props) => renderCustomizedLabel(props, 'Element8')} />

          </Bar>
          <Bar dataKey="WeLink" stackId="a" fill="#0000FF">
            <LabelList content={(props) => renderCustomizedLabel(props, 'WeLink')} />
          </Bar>
          <Bar dataKey="DTIQ" stackId="a" fill="#0000FF">
            <LabelList content={(props) => renderCustomizedLabel(props, 'DTIQ')} />
          </Bar>
          <Bar dataKey="QWILTPS" stackId="a" fill="#0000FF">
            <LabelList content={(props) => renderCustomizedLabel(props, 'QWILTPS')} />
          </Bar>
          <Bar dataKey="Tarana" stackId="a" fill="#0000FF">
            <LabelList content={(props) => renderCustomizedLabel(props, 'Tarana')} />
          </Bar>
          <Bar dataKey="RPMA" stackId="a" fill="#0000FF">
            <LabelList content={(props) => renderCustomizedLabel(props, 'RPMA')} />
          </Bar>
          <Bar dataKey="PFUNITASRS" stackId="a" fill="#0000FF">
            <LabelList content={(props) => renderCustomizedLabel(props, 'PFUNITASRS')} />
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
  