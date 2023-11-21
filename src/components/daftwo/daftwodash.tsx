import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
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
import styles from './daftwo.module.css'; // Import your CSS file

interface ChartData {
  name: string;
  Investments: number;
  Fees: number;
  DryPowder: number;
}

export default function Daftwo() {
  const [chartData, setChartData] = useState<ChartData[]>([
    { name: 'Q2-2021', Investments: 1.3, Fees: 2, DryPowder: 91.6 },
    { name: 'Q3-2021', Investments: 5.0, Fees: 2, DryPowder: 87.9 },
    { name: 'Q4-2021', Investments: 21.5, Fees: 2, DryPowder: 71.4 },
    { name: 'Q1-2022', Investments: 37.8, Fees: 2, DryPowder: 55.1 },
    { name: 'Q2-2022', Investments: 42.6, Fees: 2, DryPowder: 50.3 },
    { name: 'Q3-2022', Investments: 50.0, Fees: 2, DryPowder: 42.9 },
    { name: 'Q4-2022', Investments: 51.5, Fees: 2, DryPowder: 41.4 },
    { name: 'Q1-2023', Investments: 75.5, Fees: 2, DryPowder: 17.7 },
    { name: 'Q2-2023', Investments: 76.7, Fees: 2, DryPowder: 16.2 },
    { name: 'Q3-2023', Investments: 80.5, Fees: 2, DryPowder: 12.4 },
    { name: 'Q4-2023', Investments: 81.0, Fees: 2, DryPowder: 11.9 },
  ]);

  // Function to calculate cumulative values
  const calculateCumulativeValues = () => {
    let cumulativeInvestments = 0;
    let cumulativeFees = 0;
    let cumulativeDryPowder = 0;

    const newSumData = chartData.map((item) => {
      cumulativeInvestments += item.Investments;
      cumulativeFees += item.Fees;
      cumulativeDryPowder += item.DryPowder;

      return { name: item.name, Investments: cumulativeInvestments, Fees: cumulativeFees, DryPowder: cumulativeDryPowder };
    });

    setSumData(newSumData);
  };

  const [sumData, setSumData] = useState<ChartData[]>([]);

  const handleDataChange = (page: string, key: keyof ChartData, value: string) => {
    // Find the index of the selected data
    const pageIndex = chartData.findIndex((item) => item.name === page);

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

    // Recalculate cumulative values
    calculateCumulativeValues();
  };

  return (
    <div className={`flex flex-col space-y-6 pb-36 ${styles.tablesContainer}`}>
      <div>
        <Tile>
          <Tile.Heading>
            <span style={{ color: '#0000FF' }}>Capital Deployment Inputs</span>
          </Tile.Heading>
          <Tile.Body>
            <div className={`flex ${styles.tableWrapper}`}>
              <div className={styles.table}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Investments</TableHead>
                      <TableHead>Fees</TableHead>
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
                            value={item.Investments}
                            onChange={(e) => handleDataChange(item.name, 'Investments', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            className={styles.dataInput}
                            type="number"
                            value={item.Fees}
                            onChange={(e) => handleDataChange(item.name, 'Fees', e.target.value)}
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
            </div>
          </Tile.Body>
        </Tile>
      </div>
      <div>
        <Tile>
          <Tile.Heading>
            <span style={{ color: '#0000FF' }}>Capital Deployment Outputs</span>
          </Tile.Heading>
          <Tile.Body>
            <div className={`flex ${styles.tableWrapper}`}>
              <div className={styles.table}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Cumulative Investments</TableHead>
                      <TableHead>Cumulative Fees</TableHead>
                      <TableHead>Cumulative DryPowder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sumData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.Investments}</TableCell>
                        <TableCell>{item.Fees}</TableCell>
                        <TableCell>{item.DryPowder}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Tile.Body>
        </Tile>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Investments" stackId="a" fill="#8884d8" />
          <Bar dataKey="Fees" stackId="a" fill="#82ca9d" />
          <Bar dataKey="DryPowder" stackId="a" fill="#A020F0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}