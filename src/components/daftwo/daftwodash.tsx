


import React, { useMemo, useRef, useState } from 'react';
  import { Line, ResponsiveContainer, LineChart, XAxis, LabelList, ComposedChart } from 'recharts';
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
  
  import styles from './daftwo.module.css'; // Import your CSS file
import { LargeNumberLike } from 'crypto';
  
  export default function Daftwo() {

    return (
      <div className={'flex flex-col space-y-6 pb-36'}>
        <UserGreetings />
        <p>IN DEVELOPMENT-DRAFT</p>
  
        <div>
          <Tile>
          <Tile.Heading>
    <span style={{ color: '#0000FF' }}>DAF II Capital Deployment</span>
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
  
  const CustomizedLabel: React.FC<LabelProps & { dataKey: string, chartData: any[] }> = ({ x = 0, y = 0, width = 0, index, height, dataKey, chartData }) => {
    const numX = typeof x === 'number' ? x : parseFloat(x || '0');
    const numY = typeof y === 'number' ? y : parseFloat(y || '0');
    const numWidth = typeof width === 'number' ? width : parseFloat(width || '0');
    const numericHeight = typeof height === 'number' ? height : parseFloat(height || '0');
    const validIndex = typeof index === 'number' && index >= 0;
  
    // Access the value using the dataKey
    const value = validIndex && chartData[index] ? chartData[index][dataKey] : '';
  
    const adjustedY = numY + numericHeight * 0.5;
    const fontSize = 12;
  
    return (
      <text x={numX + numWidth / 2} y={adjustedY} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>
        {validIndex ? value : ''}
      </text>
    );
  };
 
  const StackedBarChart = () => {
    // Assuming the type for a single data item
    const [showLine1, setShowLine1] = useState(true);
    const [showLine2, setShowLine2] = useState(true);
    const [showLine3, setShowLine3] = useState(true);
    const [showLine4, setShowLine4] = useState(true);
    const [showLine5, setShowLine5] = useState(true);
    const [showLine6, setShowLine6] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    interface ChartDataItem {


      WeLinkGroup: number,
      WeLinkRS: number,
      WeLinkOpCo: number,

      DTIQGroup: number,
      DTIQOpCo: number,
      DTIQRS: number,

      E8Group: number,
      E8OpCo: number,
      E8RS: number,

      QwiltPSGroup:number,
      Qwilt: number,
      PS: number,

      RPMA: number,

      PFUnitasRS: number,

      BCTVRS: number,

      Tarana: number,

      OtherGroup:number,
      BCTVTS: number,
      ShareCare: number,


      name: string;

      FeesActual: number;
      FeeReserve: number;
      DryPowder: number;
      MOIC: number;
      IRR: number;
      FundGrossIRR: number | null,
      FundNetIRR: number | null;
      PortGrossIRR: number | null;
      PortNetIRR: number | null;
      NAV: number | null;


    }
  
    const initialChartData: ChartDataItem[] = [
      
      { name: 'Q4-2022', FundGrossIRR: 29, FundNetIRR: 24, PortGrossIRR: 49, PortNetIRR: 42, NAV: 708.7, IRR: 5,MOIC: 5, Tarana: 0, WeLinkGroup: 0, WeLinkRS: 22.7,WeLinkOpCo: 45.1, DTIQGroup:0, DTIQOpCo: 123.4, DTIQRS: 0, E8Group: 0, E8OpCo:0,E8RS: 0, QwiltPSGroup: 0, Qwilt: 10, PS: 64.3, OtherGroup: 0, BCTVTS: 0,ShareCare: 15, RPMA: 12, PFUnitasRS: 198.9, BCTVRS:0.4,FeesActual: .38, FeeReserve: 105.6, DryPowder: 458.4 },
      { name: 'Q1-2023', FundGrossIRR: 29, FundNetIRR: 24, PortGrossIRR: 49, PortNetIRR: 42, NAV: 708.7,IRR: 5, MOIC: 8,Tarana: 0, WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 16.5, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 0, E8Group: 0, E8OpCo:0,E8RS: 0, QwiltPSGroup: 0, Qwilt: 0, PS: 0.5, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:2.4,FeesActual: .38, FeeReserve: 105.6, DryPowder: 439 },
      { name: 'Q2-2023', FundGrossIRR: 18, FundNetIRR: 14.8, PortGrossIRR: 30.5, PortNetIRR: 26.9, NAV: 928.9,IRR: 5, MOIC: 9, Tarana: 40,WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 13.5, DTIQGroup:0, DTIQOpCo: 5, DTIQRS: 1.5, E8Group: 0, E8OpCo:20,E8RS: 0, QwiltPSGroup: 0, Qwilt: 0, PS: 1.4, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:13.3,FeesActual: .38, FeeReserve: 105.6, DryPowder: 344.3 },
      { name: 'Q3-2023', FundGrossIRR: 18, FundNetIRR: 14.8, PortGrossIRR: 26.2, PortNetIRR: 22.80, NAV: 928.9,IRR: 0, MOIC: 9, Tarana: 0, WeLinkGroup: 0, WeLinkRS: 3.1,WeLinkOpCo: 2.0, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 2, E8Group: 0, E8OpCo:4.1,E8RS: 55.8, QwiltPSGroup: 0, Qwilt: 0, PS: 0.2, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 10, BCTVRS:3.0,FeesActual: .38, FeeReserve: 105.6, DryPowder: 264.2 },
      { name: 'Q4-2023', FundGrossIRR: 18, FundNetIRR: 14.8, PortGrossIRR: 26.2, PortNetIRR: 22.80, NAV: 928.9,IRR: 0, MOIC:9, Tarana: 0, WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 1.2, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 0, E8Group: 0, E8OpCo:22.5,E8RS: 7.5, QwiltPSGroup: 0, Qwilt: 0, PS: 0.1, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:2.8,FeesActual: .38, FeeReserve: 105.6, DryPowder: 230.1},
      { name: 'Q1-2024P', FundGrossIRR: null, FundNetIRR: null, PortGrossIRR: null, PortNetIRR: null, NAV: null,IRR: 5, MOIC: 11,Tarana: 0, WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 0, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 0, E8Group: 0, E8OpCo:0,E8RS: 0, QwiltPSGroup: 0, Qwilt: 0, PS: 0, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:0,FeesActual: .38, FeeReserve: 105.6, DryPowder: 230.1 },
      { name: 'Q2-2024P', FundGrossIRR: null,FundNetIRR: null, PortGrossIRR: null, PortNetIRR: null, NAV: null,IRR: 5, MOIC: 12,Tarana: 0, WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 0, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 0, E8Group: 0, E8OpCo:0,E8RS: 0, QwiltPSGroup: 0, Qwilt: 0, PS: 0, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:0,FeesActual: .38, FeeReserve: 105.6, DryPowder: 230.1 },
      { name: 'Q3-2024P', FundGrossIRR: null, FundNetIRR: null, PortGrossIRR: null, PortNetIRR: null, NAV: null,IRR: 8, MOIC:13,Tarana: 0, WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 0, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 0, E8Group: 0, E8OpCo:0,E8RS: 0, QwiltPSGroup: 0, Qwilt: 0, PS: 0, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:0,FeesActual: .38, FeeReserve: 105.6, DryPowder: 230.1 },
      { name: 'Q4-2024P', FundGrossIRR: null, FundNetIRR: null, PortGrossIRR: null, PortNetIRR: null, NAV: null,IRR: 9, MOIC: 14, Tarana: 0, WeLinkGroup: 0, WeLinkRS: 0,WeLinkOpCo: 0, DTIQGroup:0, DTIQOpCo: 0, DTIQRS: 0, E8Group: 0, E8OpCo:0,E8RS: 0, QwiltPSGroup: 0, Qwilt: 0, PS: 0, OtherGroup: 0, BCTVTS: 0,ShareCare: 0, RPMA: 0, PFUnitasRS: 0, BCTVRS:0,FeesActual: .38, FeeReserve: 105.6, DryPowder: 230.1 },


    ];
  
    const initialLineData: { name: string, NAV: number | null, FundGrossIRR: number | null, FundNetIRR: number | null, PortGrossIRR: number | null, PortNetIRR: number | null, IRR: number,MOIC: number }[] = initialChartData.map(item => ({
      name: item.name,
      MOIC: item.MOIC,
      IRR: item.IRR,
      FundGrossIRR: item.FundGrossIRR,
      FundNetIRR: item.FundNetIRR,
      PortGrossIRR: item.PortGrossIRR,
      PortNetIRR: item.PortNetIRR,
      NAV: item.NAV,

    }));
// Create a state to track which inputs are empty
const [emptyInputs, setEmptyInputs] = useState<Record<string, Record<string, boolean>>>({});
    const handleDataChange = (page: string, key: keyof ChartDataItem, value: string) => {
      const numericValue = value === '' ? 0 : Number(value);

      // If the value is empty, treat it as zero
     
      setEmptyInputs(prevState => ({
        ...prevState,
        [page]: {
          ...(prevState[page] || {}),
          [key]: value === '',
        },
      }));
    

      // Find the index of the quarter being updated
      const pageIndex = inputChartData.findIndex(item => item.name === page);
      const updatedInputChartData = [...inputChartData];
      
      if (pageIndex !== -1) {
        // Update the value for the current quarter
        updatedInputChartData[pageIndex] = {
          ...updatedInputChartData[pageIndex],
          [key]: numericValue
        };
       
      
        // Recalculate group sums for the updated quarter
        updatedInputChartData[pageIndex] = calculateGroupSums([updatedInputChartData[pageIndex]])[0];
    
        // Adjust DryPowder for the current quarter
        const changeInValue = numericValue - (inputChartData[pageIndex][key] as number);
        updatedInputChartData[pageIndex].DryPowder -= changeInValue;
    
        // Adjust DryPowder for subsequent quarters
        for (let i = pageIndex + 1; i < updatedInputChartData.length; i++) {
          updatedInputChartData[i].DryPowder -= changeInValue;
        }
      }
    
      // Recalculate cumulative data for the output table
      const newCumulativeChartData = calculateCumulativeOutputData(updatedInputChartData);
    
      // Update the state for both input and output chart data
      setInputChartData(updatedInputChartData);
      setCumulativeChartData(newCumulativeChartData);
    };
    const calculateGroupSums = (data: ChartDataItem[]): ChartDataItem[] => {
      return data.map(item => ({
        ...item,
        WeLinkGroup: item.WeLinkRS + item.WeLinkOpCo,
        DTIQGroup: item.DTIQOpCo + item.DTIQRS,
        E8Group: item.E8OpCo + item.E8RS,
        QwiltPSGroup: item.Qwilt + item.PS,
        OtherGroup: item.BCTVRS + item.ShareCare
      }));
    };
    // The function to calculate cumulative data for the output table
    const calculateCumulativeOutputData = (inputData: ChartDataItem[]) => {
      let cumulativeValues: ChartDataItem = {
        name: '',
        // Assume default values for all individual fields
        // Initialize cumulative sums for groups
        OtherGroup: 0,
        FeesActual: inputData[0]?.FeesActual || 0,
        FeeReserve: inputData[0]?.FeeReserve || 0,
        DryPowder: inputData[0]?.DryPowder || 0,
        WeLinkGroup: 0,
        WeLinkRS: 0,
        WeLinkOpCo: 0,
        DTIQGroup: 0,
        DTIQOpCo: 0,
        DTIQRS: 0,
        E8Group: 0,
        E8OpCo: 0,
        E8RS: 0,
        QwiltPSGroup: 0,
        Qwilt: 0,
        PS: 0,
        RPMA: 0,
        PFUnitasRS: 0,
        BCTVRS: 0,
        BCTVTS: 0,
        ShareCare: 0,
        Tarana:0,
        MOIC: 0,
        IRR: 0,
        FundGrossIRR: 0,
        FundNetIRR: 0,
        PortGrossIRR: 0,
        PortNetIRR: 0,
        NAV: 0,
      };
    
      // Calculate cumulative values, including group sums
      return inputData.map(item => {
        // Update cumulative sums for each group
        parseFloat((cumulativeValues.WeLinkGroup += item.WeLinkRS + item.WeLinkOpCo).toFixed(1));
        cumulativeValues.DTIQGroup += item.DTIQOpCo + item.DTIQRS;
        cumulativeValues.E8Group += item.E8OpCo + item.E8RS;
        cumulativeValues.QwiltPSGroup += item.Qwilt + item.PS;
        cumulativeValues.OtherGroup += item.BCTVTS + item.ShareCare;
cumulativeValues.WeLinkRS += item.WeLinkRS;
cumulativeValues.PFUnitasRS += item.PFUnitasRS;
cumulativeValues.WeLinkOpCo += item.WeLinkOpCo;
cumulativeValues.DTIQOpCo += item.DTIQOpCo;
cumulativeValues.DTIQRS += item.DTIQRS;
cumulativeValues.E8OpCo += item.E8OpCo;
cumulativeValues.E8RS += item.E8RS;
cumulativeValues.PS += item.PS;
cumulativeValues.Qwilt += item.Qwilt;
cumulativeValues.BCTVTS += item.BCTVTS;
cumulativeValues.ShareCare += item.ShareCare;
cumulativeValues.RPMA += item.RPMA;
cumulativeValues.BCTVRS += item.BCTVRS;
cumulativeValues.Tarana += item.Tarana;
        // Return new item with cumulative values
        return {
          ...item,
          WeLinkGroup: parseFloat((cumulativeValues.WeLinkGroup).toFixed(1)),
          DTIQGroup: parseFloat((cumulativeValues.DTIQGroup).toFixed(1)),
          E8Group: parseFloat((cumulativeValues.E8Group).toFixed(1)),
          QwiltPSGroup: parseFloat((cumulativeValues.QwiltPSGroup).toFixed(1)),
          OtherGroup: parseFloat((cumulativeValues.OtherGroup).toFixed(1)),
WeLinkRS: cumulativeValues.WeLinkRS,
PFUnitasRS: cumulativeValues.PFUnitasRS,
WeLinkOpCo: cumulativeValues.WeLinkOpCo,
DTIQOpCo: cumulativeValues.DTIQOpCo,
DTIQRS: cumulativeValues.DTIQRS,
E8OpCo: cumulativeValues.E8OpCo,
E8RS: cumulativeValues.E8RS,
PS: cumulativeValues.PS,
Qwilt: cumulativeValues.Qwilt,
BCTVTS: cumulativeValues.BCTVTS,
ShareCare: cumulativeValues.ShareCare,
RPMA: cumulativeValues.RPMA,
BCTVRS: parseFloat((cumulativeValues.BCTVRS).toFixed(1)),
Tarana: cumulativeValues.Tarana,
          FeesActual: cumulativeValues.FeesActual,
          FeeReserve: cumulativeValues.FeeReserve,
          DryPowder: parseFloat((item.DryPowder).toFixed(1)),
          MOIC: item.MOIC,
          IRR: item.IRR

        };
      });
    };
      // In your handleDataChange function, call this after updating input data
      const [inputChartData, setInputChartData] = useState<ChartDataItem[]>(calculateGroupSums(initialChartData));
      const [cumulativeChartData, setCumulativeChartData] = useState<ChartDataItem[]>(calculateCumulativeOutputData(inputChartData));
    
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
        
          <div className={`flex ${styles.tableWrapper}`}>
      <div>
      <h1 style={{ textDecoration: 'underline' }}>Input: Incremental Deployment by Quarter</h1>
      <div className={styles.table}>
        <Table>
          <TableHeader>
          <TableRow>
    <TableHead colSpan={1}></TableHead> {/* Empty Cell for Quarter Column */}
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        WeLink
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        DTIQ
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        E8
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Qwilt/PS
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Other
      </div>
    </TableHead>
    <TableHead colSpan={3}></TableHead> {/* Span for the rest of the columns */}
  </TableRow>
  <TableRow>
                
                <TableHead>Quarter</TableHead>

              <TableHead>WeLink RS</TableHead>
              <TableHead>WeLink OpCo</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}>WeLink Group</TableHead> {/* Apply the border style here */}

              <TableHead>DTIQ OpCo</TableHead>
              <TableHead>DTIQ RS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}>DTIQ Group</TableHead>

              <TableHead>E8 OpCo</TableHead>
              <TableHead>E8 RS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}>E8 Group</TableHead>


              <TableHead>Qwilt</TableHead>
              <TableHead>PS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}>Qwilt/PS Group</TableHead>


              <TableHead>ShareCare</TableHead>
              <TableHead>BCTV RS</TableHead>

              <TableHead style={{  borderRight: '2px solid black' }}>Other Group</TableHead>


              <TableHead>RPMA</TableHead>

              <TableHead>PF Unitas RS</TableHead>


              <TableHead>Tarana</TableHead>


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
  value={emptyInputs[item.name]?.['WeLinkRS'] ? '' : item.WeLinkRS}
  onChange={(e) => handleDataChange(item.name, 'WeLinkRS', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.WeLinkRS === 0) {
      handleDataChange(item.name, 'WeLinkRS', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['WeLinkOpCo'] ? '' : item.WeLinkOpCo}
  onChange={(e) => handleDataChange(item.name, 'WeLinkOpCo', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.WeLinkOpCo === 0) {
      handleDataChange(item.name, 'WeLinkOpCo', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['WeLinkGroup'] ? '' : item.WeLinkGroup}
  onChange={(e) => handleDataChange(item.name, 'WeLinkGroup', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.WeLinkGroup === 0) {
      handleDataChange(item.name, 'WeLinkGroup', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['DTIQOpCo'] ? '' : item.DTIQOpCo}
  onChange={(e) => handleDataChange(item.name, 'DTIQOpCo', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.DTIQOpCo === 0) {
      handleDataChange(item.name, 'DTIQOpCo', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell>
 <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['DTIQRS'] ? '' : item.DTIQRS}
  onChange={(e) => handleDataChange(item.name, 'DTIQRS', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.DTIQRS === 0) {
      handleDataChange(item.name, 'DTIQRS', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['DTIQGroup'] ? '' : item.DTIQGroup}
  onChange={(e) => handleDataChange(item.name, 'DTIQGroup', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.DTIQGroup === 0) {
      handleDataChange(item.name, 'DTIQGroup', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['E8OpCo'] ? '' : item.E8OpCo}
  onChange={(e) => handleDataChange(item.name, 'E8OpCo', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.E8OpCo === 0) {
      handleDataChange(item.name, 'E8OpCo', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['E8RS'] ? '' : item.E8RS}
  onChange={(e) => handleDataChange(item.name, 'E8RS', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.E8RS === 0) {
      handleDataChange(item.name, 'E8RS', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['E8Group'] ? '' : item.E8Group}
  onChange={(e) => handleDataChange(item.name, 'E8Group', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.E8Group === 0) {
      handleDataChange(item.name, 'E8Group', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['Qwilt'] ? '' : item.Qwilt}
  onChange={(e) => handleDataChange(item.name, 'Qwilt', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.Qwilt === 0) {
      handleDataChange(item.name, 'Qwilt', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['PS'] ? '' : item.PS}
  onChange={(e) => handleDataChange(item.name, 'PS', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.PS === 0) {
      handleDataChange(item.name, 'PS', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['QwiltPSGroup'] ? '' : item.QwiltPSGroup}
  onChange={(e) => handleDataChange(item.name, 'QwiltPSGroup', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.QwiltPSGroup === 0) {
      handleDataChange(item.name, 'QwiltPSGroup', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
             
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['ShareCare'] ? '' : item.ShareCare}
  onChange={(e) => handleDataChange(item.name, 'ShareCare', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.ShareCare === 0) {
      handleDataChange(item.name, 'ShareCare', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell>
               <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['BCTVRS'] ? '' : item.BCTVRS}
  onChange={(e) => handleDataChange(item.name, 'BCTVRS', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.BCTVRS === 0) {
      handleDataChange(item.name, 'BCTVRS', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['OtherGroup'] ? '' : item.OtherGroup}
  onChange={(e) => handleDataChange(item.name, 'OtherGroup', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.OtherGroup === 0) {
      handleDataChange(item.name, 'OtherGroup', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['RPMA'] ? '' : item.RPMA}
  onChange={(e) => handleDataChange(item.name, 'RPMA', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.RPMA === 0) {
      handleDataChange(item.name, 'RPMA', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['PFUnitasRS'] ? '' : item.PFUnitasRS}
  onChange={(e) => handleDataChange(item.name, 'PFUnitasRS', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.PFUnitasRS === 0) {
      handleDataChange(item.name, 'PFUnitasRS', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
          
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['Tarana'] ? '' : item.Tarana}
  onChange={(e) => handleDataChange(item.name, 'Tarana', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.Tarana === 0) {
      handleDataChange(item.name, 'Tarana', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={isPastQuarter(item.name, currentYear)}
/>
                </TableCell>
             
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['FeeReserve'] ? '' : item.FeeReserve}
  onChange={(e) => handleDataChange(item.name, 'FeeReserve', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.FeeReserve === 0) {
      handleDataChange(item.name, 'FeeReserve', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
                <TableCell>
                <input
  className={styles.dataInput}
  type="number"
  value={emptyInputs[item.name]?.['DryPowder'] ? '' : item.DryPowder}
  onChange={(e) => handleDataChange(item.name, 'DryPowder', e.target.value)}
  onBlur={() => {
    setIsFocused(false);
    if (item.DryPowder === 0) {
      handleDataChange(item.name, 'DryPowder', '0');
    }
  }}
  onFocus={(e) => {
    setIsFocused(true);
    e.target.select();
  }}
  disabled={true}
/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
      
       
      
      </div>
      <div style={{ position: 'relative',height: '550px' }}>
  
  <ResponsiveContainer width="100%" height="100%" className="chartContainer">
    <ComposedChart  data={cumulativeChartData}>
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" label={{ value: 'Millions Deployed', angle: -90, position: 'insideLeft' }} />
<YAxis yAxisId="right" orientation="right" label={{ value: 'Gross and Net IRR %', angle: 90, position: 'insideRight' }} />
      <Legend />
      <Tooltip />
          <Bar yAxisId="left" dataKey="WeLinkGroup" stackId="a" fill="#21675e">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="WeLinkGroup" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="DTIQGroup" stackId="a" fill="#468499">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="DTIQGroup" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="E8Group" stackId="a" fill="#8884d8">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="E8Group" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="QwiltPSGroup" stackId="a" fill="#808080">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="QwiltPSGroup" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="OtherGroup" stackId="a" fill="#f27d52">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="OtherGroup" chartData={cumulativeChartData} />} />
          </Bar>       
          <Bar yAxisId="left" dataKey="RPMA" stackId="a" fill="#89CFF0">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="RPMA" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="PFUnitasRS" stackId="a" fill="#7393B3">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="PFUnitasRS" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="BCTVRS" stackId="a" fill="#191970">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="BCTVRS" chartData={cumulativeChartData} />} />
          </Bar>
          <Bar yAxisId="left" dataKey="Tarana" stackId="a" fill="#FFC300">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="Tarana" chartData={cumulativeChartData} />} />
          </Bar>
        
          <Bar yAxisId="left" dataKey="FeeReserve" stackId="a" fill="#a52a2a">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="FeeReserve" chartData={cumulativeChartData} />} />
          </Bar>
        
          <Bar  yAxisId="left"dataKey="DryPowder" stackId="a" fill="#D2B48C">
          <LabelList content={(props) => <CustomizedLabel {...props} dataKey="DryPowder" chartData={cumulativeChartData} />} />
          </Bar>
      
          
        </ComposedChart>
        
      </ResponsiveContainer>
      </div>
      <div>
      <h1 style={{ textDecoration: 'underline' }}>Outputs: Cumulative Deployment by Quarter</h1>
            <div className={styles.tableWrapper}>
  
      <div className={styles.table}>
        {/* Second table code */}
        <Table>
        <TableHeader>
  <TableRow>
    <TableHead colSpan={1}></TableHead> {/* Empty Cell for Quarter Column */}
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        WeLink
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        DTIQ
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        E8
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Qwilt/PS
      </div>
    </TableHead>
    <TableHead colSpan={3} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Other
      </div>
    </TableHead>
    <TableHead colSpan={3}></TableHead> {/* Span for the rest of the columns */}
  </TableRow>
    <TableRow>
      <TableHead>Quarter</TableHead>

      <TableHead>WeLink RS</TableHead>
      <TableHead>WeLink OpCo</TableHead>
      <TableHead style={{  borderRight: '2px solid black' }}>WeLink Group</TableHead> {/* Apply the border style here */}

      <TableHead>DTIQ OpCo</TableHead>
      <TableHead>DTIQ RS</TableHead>
     <TableHead style={{  borderRight: '2px solid black' }}>DTIQ Group</TableHead>


     <TableHead>E8 OpCo</TableHead>
     <TableHead>E8 RS</TableHead>
      <TableHead style={{  borderRight: '2px solid black' }}>E8 Group</TableHead>
      
      <TableHead>Qwilt</TableHead>
      <TableHead>PS</TableHead>
      <TableHead style={{  borderRight: '2px solid black' }}>Qwilt/PS Group</TableHead>

      <TableHead>ShareCare</TableHead>
      <TableHead>BCTV RS</TableHead>

      <TableHead style={{  borderRight: '2px solid black' }}>Other Group</TableHead>


      <TableHead>RPMA</TableHead>
      <TableHead>PF Unitas RS</TableHead>
      <TableHead>Tarana</TableHead>

      <TableHead>FeeReserve</TableHead>
      <TableHead>DryPowder</TableHead>
    </TableRow>
  </TableHeader>
          <TableBody>
                {cumulativeChartData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>

                <TableCell>{item.WeLinkRS}</TableCell>
                <TableCell>{item.WeLinkOpCo}</TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>{item.WeLinkGroup}</TableCell>

                <TableCell>{item.DTIQOpCo}</TableCell>
                <TableCell>{item.DTIQRS}</TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>{item.DTIQGroup}</TableCell>

                <TableCell>{item.E8OpCo}</TableCell>
                <TableCell>{item.E8RS}</TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>{item.E8Group}</TableCell>

              <TableCell>{item.Qwilt}</TableCell>
              <TableCell>{item.PS}</TableCell>
                <TableCell style={{  borderRight: '2px solid black'}}>{item.QwiltPSGroup}</TableCell>

                <TableCell>{item.ShareCare}</TableCell>
                <TableCell>{item.BCTVRS}</TableCell>

                <TableCell style={{  borderRight: '2px solid black'}}>{item.OtherGroup}</TableCell>


                <TableCell>{item.RPMA}</TableCell>
                <TableCell>{item.PFUnitasRS}</TableCell>
                <TableCell>{item.Tarana}</TableCell>

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
  