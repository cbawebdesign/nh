


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
  import { BarChart, ComposedChart, Bar, CartesianGrid, YAxis, Tooltip, Legend } from 'recharts';
  
  import styles from './daofone.module.css'; // Import your CSS file
  
  export default function FundOne() {
  
    return (
      <div className={'flex flex-col space-y-6 pb-36'}>
        <UserGreetings />
        <p>IN DEVELOPMENT-DRAFT</p>
  
        <div>
          <Tile>
          <Tile.Heading>
    <span style={{ color: '#0000FF' }}>DAOF I Capital Deployment</span>
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

    const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(true);
    // Assuming the type for a single data item
    interface ChartDataItem {
      QuantelaOpCo: number;
      DARSII: number,
      LiquidRS: number,
      StripeSCCIRS: number,
      StarliteRS: number,

      PacketFabricOpCo:number,
      UnitasOpCo: number,
      UnitasRS: number,
      PFRSNewNetwork: number,


      WeLinkRS: number,
      EnergyBoxRS: number,
      MDSLPRS: number,

      name: string;

      QuantelaGroup: number;
      PacketFabricGroup: number;
      OtherGroup: number;

      PacketFabric:number;
      FeesActual: number;
      FeeReserve: number;
      DryPowder: number;
      MOIC: number;
      IRR: number;
    }
  
    const initialChartData: ChartDataItem[] = [
      { name: 'Q2-2021', IRR: -20, MOIC: -20, QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 1.27, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, PacketFabricGroup: 0, StarliteRS: 0, PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 91.6 },
      { name: 'Q3-2021', IRR: -15,MOIC: -15,QuantelaOpCo: 1.0, QuantelaGroup: 0,DARSII: 1.79, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0.93, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 87.9 },
      { name: 'Q4-2021', IRR: -10,MOIC: -10, QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 3, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 12, WeLinkRS: 0,EnergyBoxRS: 1.50, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 71.4 },
      { name: 'Q1-2022', IRR: -5,MOIC: -5, QuantelaOpCo: 1.0, QuantelaGroup: 0,DARSII: .57, OtherGroup:0, LiquidRS: 3.91, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 2, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 8, WeLinkRS: 0,EnergyBoxRS: 0.85, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 55.1 },
      { name: 'Q2-2022', IRR: 2,MOIC: 2,QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 1.86, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 2.95, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 50.3 },
      { name: 'Q3-2022', IRR: 5,MOIC: 5,QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 4.33, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 2.99, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 42.9 },
      { name: 'Q4-2022', IRR: 7,MOIC: 7, QuantelaOpCo: 1.55, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 41.4 },
      { name: 'Q1-2023', IRR: 9,MOIC: 9, QuantelaOpCo: 1.96, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 4.56, StripeSCCIRS: 0, StarliteRS: 5, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 2, UnitasRS: 8, PFRSNewNetwork: 0, WeLinkRS: 2.16,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 17.7 },
      { name: 'Q2-2023', IRR: 9, MOIC: 9,  QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 1.04, MDSLPRS: 0.43, FeesActual: .38, FeeReserve: 6.9, DryPowder: 16.2 },
      { name: 'Q3-2023',IRR: 8,MOIC: 8, QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 1.15, MDSLPRS: 2.72, FeesActual: .38, FeeReserve: 6.9, DryPowder: 12.4 },
      { name: 'Q4-2023', IRR: 11,MOIC: 11,QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0.48, FeesActual: .38, FeeReserve: 6.9, DryPowder: 11.9 },
      { name: 'Q1-2024P', IRR: 11,MOIC: 11, QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 11.9 },
      { name: 'Q2-2024P',IRR: 11,MOIC: 11,  QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 11.9 },
      { name: 'Q3-2024P',IRR: 11,MOIC: 11,QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 11.9 },
      { name: 'Q4-2024P', IRR: 11,MOIC: 11,QuantelaOpCo: 0, QuantelaGroup: 0,DARSII: 0, OtherGroup:0, LiquidRS: 0, StripeSCCIRS: 0, StarliteRS: 0, PacketFabricGroup:0,PacketFabric: 0, PacketFabricOpCo: 0, UnitasOpCo: 0, UnitasRS: 0, PFRSNewNetwork: 0, WeLinkRS: 0,EnergyBoxRS: 0, MDSLPRS: 0, FeesActual: .38, FeeReserve: 6.9, DryPowder: 11.9 },

    ];
    const initialLineData: { name: string, IRR: number,MOIC: number }[] = initialChartData.map(item => ({
      name: item.name,
      MOIC: item.MOIC,
      IRR: item.IRR
    }));
    
    const handleDataChange = (page: string, key: keyof ChartDataItem, value: string) => {
      const numericValue = parseFloat(value);
    
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
        QuantelaGroup: item.QuantelaOpCo + item.DARSII + item.LiquidRS + item.StripeSCCIRS + item.StarliteRS,
        PacketFabricGroup: item.PacketFabric + item.PacketFabricOpCo + item.UnitasOpCo + item.UnitasRS + item.PFRSNewNetwork,
        OtherGroup: item.WeLinkRS + item.EnergyBoxRS + item.MDSLPRS,
      }));
    };
    // The function to calculate cumulative data for the output table
    const calculateCumulativeOutputData = (inputData: ChartDataItem[]) => {
      let cumulativeValues: ChartDataItem = {
        name: '',
        // Assume default values for all individual fields
        // Initialize cumulative sums for groups
        QuantelaGroup: 0,
        PacketFabricGroup: 0,
        OtherGroup: 0,
        FeesActual: inputData[0]?.FeesActual || 0,
        FeeReserve: inputData[0]?.FeeReserve || 0,
        DryPowder: inputData[0]?.DryPowder || 0,
        QuantelaOpCo: 0,
        DARSII: 0,
        LiquidRS: 0,
        StripeSCCIRS: 0,
        StarliteRS: 0,
        PacketFabricOpCo: 0,
        UnitasOpCo: 0,
        UnitasRS: 0,
        PFRSNewNetwork: 0,
        WeLinkRS: 0,
        EnergyBoxRS: 0,
        MDSLPRS: 0,
        PacketFabric: 0,
        MOIC: 0,
        IRR: 0,
      };
    
      // Calculate cumulative values, including group sums
      return inputData.map(item => {
        // Update cumulative sums for each group
        parseFloat((cumulativeValues.QuantelaGroup += item.QuantelaOpCo + item.DARSII + item.LiquidRS + item.StripeSCCIRS + item.StarliteRS).toFixed(1));
        cumulativeValues.OtherGroup += item.WeLinkRS + item.EnergyBoxRS + item.MDSLPRS;
        cumulativeValues.PacketFabricGroup += item.PacketFabricOpCo + item.UnitasOpCo + item.UnitasRS + item.PFRSNewNetwork;
        cumulativeValues.QuantelaOpCo += item.QuantelaOpCo;
        cumulativeValues.DARSII += item.DARSII;
        cumulativeValues.LiquidRS += item.LiquidRS;
        cumulativeValues.StarliteRS += item.StarliteRS;
        cumulativeValues.StripeSCCIRS += item.StripeSCCIRS;
        cumulativeValues.PacketFabricOpCo += item.PacketFabricOpCo;
        cumulativeValues.UnitasOpCo += item.UnitasRS;
        cumulativeValues.UnitasRS += item.UnitasRS;
        cumulativeValues.PFRSNewNetwork += item.PFRSNewNetwork;
        cumulativeValues.WeLinkRS += item.WeLinkRS;
        cumulativeValues.EnergyBoxRS += item.EnergyBoxRS;
        cumulativeValues.MDSLPRS += item.MDSLPRS;
    
        // Return new item with cumulative values
        return {
          ...item,
          QuantelaGroup: parseFloat((cumulativeValues.QuantelaGroup).toFixed(1)),
          PacketFabricGroup: parseFloat((cumulativeValues.PacketFabricGroup).toFixed(1)),
          OtherGroup: parseFloat((cumulativeValues.OtherGroup).toFixed(1)),
          FeesActual: cumulativeValues.FeesActual,
          FeeReserve: cumulativeValues.FeeReserve,
          DryPowder: parseFloat((item.DryPowder).toFixed(1)),
          
          QuantelaOpCo: cumulativeValues.QuantelaOpCo,
          DARSII: cumulativeValues.DARSII,
          LiquidRS: parseFloat((cumulativeValues.LiquidRS).toFixed(1)),
          StarliteRS: cumulativeValues.StarliteRS,
          StripeSCCIRS: cumulativeValues.StripeSCCIRS,
          PacketFabricOpCo: cumulativeValues.PacketFabricOpCo,
          UnitasOpCo: cumulativeValues.UnitasOpCo,
          UnitasRS: cumulativeValues.UnitasRS,
          PFRSNewNetwork: cumulativeValues.PFRSNewNetwork,
          WeLinkRS: cumulativeValues.WeLinkRS,
          EnergyBoxRS: parseFloat((cumulativeValues.EnergyBoxRS).toFixed(1)),
          MDSLPRS: parseFloat((cumulativeValues.MDSLPRS).toFixed(1)),
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
<div style={{ position: 'relative',height: '550px' }}>
   
   <ResponsiveContainer width="100%" height="100%" className="chartContainer">
 <ComposedChart  data={cumulativeChartData}>
   <XAxis dataKey="name" />
   <YAxis yAxisId="left" label={{ value: 'Millions Deployed', angle: -90, position: 'insideLeft' }} />
<YAxis yAxisId="right" orientation="right" label={{ value: 'Gross and Net IRR', angle: 90, position: 'insideRight' }} />
   <Legend />
   <Bar yAxisId="left" dataKey="QuantelaGroup" stackId="a" fill="#89CFF0">
   <LabelList content={(props) => <CustomizedLabel {...props} dataKey="QuantelaGroup" chartData={cumulativeChartData} />} />
 </Bar>
 <Bar yAxisId="left" dataKey="PacketFabricGroup" stackId="a" fill="#7393B3">
   <LabelList content={(props) => <CustomizedLabel {...props} dataKey="PacketFabricGroup" chartData={cumulativeChartData} />} />
 </Bar>
 <Bar yAxisId="left" dataKey="OtherGroup" stackId="a" fill="#191970">
   <LabelList content={(props) => <CustomizedLabel {...props} dataKey="OtherGroup" chartData={cumulativeChartData} />} />
 </Bar>
 <Bar yAxisId="left" dataKey="FeesActual" stackId="a" fill="#a52a2a">
   <LabelList content={(props) => <CustomizedLabel {...props} dataKey="FeesActual" chartData={cumulativeChartData} />} />
 </Bar>
 <Bar yAxisId="left" dataKey="FeeReserve" stackId="a" fill="#a52a2a">
   <LabelList content={(props) => <CustomizedLabel {...props} dataKey="FeeReserve" chartData={cumulativeChartData} />} />
 </Bar>
 <Bar yAxisId="left" dataKey="DryPowder" stackId="a" fill="#D2B48C">
   <LabelList content={(props) => <CustomizedLabel {...props} dataKey="DryPowder" chartData={cumulativeChartData} />} />
 </Bar>      
     <Tooltip />
  <Tooltip />


 </ComposedChart>
</ResponsiveContainer>
</div>
    <div className={`flex ${styles.tableWrapper}`}>
      <div>
      <h1>Input: Incremental Deployment by Quarter</h1>
      <div className={styles.table}>
        <Table>
          <TableHeader>
          <TableRow>
    <TableHead colSpan={1}></TableHead> {/* Empty Cell for Quarter Column */}
    <TableHead colSpan={6} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Quantela
      </div>
    </TableHead>
    <TableHead colSpan={5} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Packet Fabric Group
      </div>
    </TableHead>
    <TableHead colSpan={4} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Other Group
      </div>
    </TableHead>

    <TableHead colSpan={3}></TableHead> {/* Span for the rest of the columns */}
  </TableRow>
  <TableRow>

                <TableHead>Quarter</TableHead>
              
              <TableHead>Quantela OpCo</TableHead>
              <TableHead>DA RS II</TableHead>
              <TableHead>Liquid RS</TableHead>
              <TableHead>Starlite RS</TableHead>
              <TableHead>Stripe SCCI RS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}>QuantelaGroup</TableHead>

              <TableHead>PacketFabric OpCo</TableHead>
              <TableHead>Unitas OpCo</TableHead>
              <TableHead>Unitas RS</TableHead>
              <TableHead>PF RS New Network</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}> PF Group</TableHead>

              <TableHead>WeLinkRS</TableHead>
              <TableHead>EnergyBox RS</TableHead>
              <TableHead>MDSLP RS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}> Other Group</TableHead>


              <TableHead>Fees Actual</TableHead>

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
                    value={item.QuantelaOpCo}
                    onChange={(e) => handleDataChange(item.name, 'QuantelaOpCo', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.DARSII}
                    onChange={(e) => handleDataChange(item.name, 'DARSII', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.LiquidRS}
                    onChange={(e) => handleDataChange(item.name, 'LiquidRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.StarliteRS}
                    onChange={(e) => handleDataChange(item.name, 'StarliteRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.StripeSCCIRS}
                    onChange={(e) => handleDataChange(item.name, 'StripeSCCIRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black' }}>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.QuantelaGroup}
                    onChange={(e) => handleDataChange(item.name, 'QuantelaGroup', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.PacketFabricOpCo}
                    onChange={(e) => handleDataChange(item.name, 'PacketFabricOpCo', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.UnitasOpCo}
                    onChange={(e) => handleDataChange(item.name, 'UnitasOpCo', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.UnitasRS}
                    onChange={(e) => handleDataChange(item.name, 'UnitasRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.PFRSNewNetwork}
                    onChange={(e) => handleDataChange(item.name, 'PFRSNewNetwork', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black' }}>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.PacketFabricGroup}
                    onChange={(e) => handleDataChange(item.name, 'PacketFabricGroup', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.WeLinkRS}
                    onChange={(e) => handleDataChange(item.name, 'WeLinkRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.EnergyBoxRS}
                    onChange={(e) => handleDataChange(item.name, 'EnergyBoxRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.MDSLPRS}
                    onChange={(e) => handleDataChange(item.name, 'MDSLPRS', e.target.value)}
                     disabled={isPastQuarter(item.name, currentYear)}
                  />
                </TableCell>
                <TableCell style={{  borderRight: '2px solid black' }}>
                  <input
                    className={styles.dataInput}
                    type="number"
                    value={item.OtherGroup}
                    onChange={(e) => handleDataChange(item.name, 'OtherGroup', e.target.value)}
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
      
       
      
      </div>
     
     
      <div>
      <h1>Outputs: Cumulative Deployment by Quarter</h1>
      <div className={styles.tableWrapper}>
  
      <div className={styles.table}>
        {/* Second table code */}
        <Table>
          <TableHeader>
          <TableRow>
    <TableHead colSpan={1}></TableHead> {/* Empty Cell for Quarter Column */}
    <TableHead colSpan={6} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Quantela
      </div>
    </TableHead>
    <TableHead colSpan={5} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Packet Fabric Group
      </div>
    </TableHead>
    <TableHead colSpan={4} style={{ position: 'relative' }}> {/* Span for WeLink Columns */}
      <div style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        borderBottom: '2px solid black'
      }}>
        Other Group
      </div>
    </TableHead>

    <TableHead colSpan={3}></TableHead> {/* Span for the rest of the columns */}
  </TableRow>
    <TableRow>            <TableHead>Quarter</TableHead>
              
            <TableHead>Quantela OpCo</TableHead>
              <TableHead>DA RS II</TableHead>
              <TableHead>Liquid RS</TableHead>
              <TableHead>Starlite RS</TableHead>
              <TableHead>Stripe SCCI RS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}>
QuantelaGroup</TableHead>


              <TableHead>PacketFabric OpCo</TableHead>
              <TableHead>Unitas OpCo</TableHead>
              <TableHead>Unitas RS</TableHead>
              <TableHead>PF RS New Network</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}> PF Group</TableHead>


              <TableHead>WeLinkRS</TableHead>
              <TableHead>EnergyBox RS</TableHead>
              <TableHead>MDSLP RS</TableHead>
              <TableHead style={{  borderRight: '2px solid black' }}> Other Group</TableHead>




              <TableHead>FeesActual</TableHead>
              <TableHead>FeeReserve</TableHead>
              <TableHead>DryPowder</TableHead>
  
            </TableRow>
          </TableHeader>
          <TableBody>
                {cumulativeChartData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.QuantelaOpCo}</TableCell>
                <TableCell>{item.DARSII}</TableCell>
                <TableCell>{item.LiquidRS}</TableCell>
                <TableCell>{item.StarliteRS}</TableCell>
                <TableCell>{item.StripeSCCIRS}</TableCell>
                 <TableCell  style={{  borderRight: '2px solid black'}}>{ item.QuantelaGroup}</TableCell>

                 <TableCell>{item.PacketFabricOpCo}</TableCell>
                 <TableCell>{item.UnitasOpCo}</TableCell>
                 <TableCell>{item.UnitasRS}</TableCell>
                 <TableCell>{item.PFRSNewNetwork}</TableCell>
                <TableCell  style={{  borderRight: '2px solid black' }}>{item.PacketFabricGroup}</TableCell>


                <TableCell>{item.WeLinkRS}</TableCell>
                <TableCell>{item.EnergyBoxRS}</TableCell>
                <TableCell>{item.MDSLPRS}</TableCell>
                <TableCell  style={{  borderRight: '2px solid black' }}>{item.OtherGroup}</TableCell>

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
  