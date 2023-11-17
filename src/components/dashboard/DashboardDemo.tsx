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

export default function DashboardDemo() {
  // ... other useMemo hooks for your data ...

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <UserGreetings />
      <p>IN DEVELOPMENT-DRAFT</p>

      {/* Your existing tiles and charts */}

      {/* StackedBarChart with editable inputs */}
      <div>
       
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
<div className="flex items-center justify-center h-screen">
{/* Replace 'your-gif-url.gif' with the URL of your desired GIF */}
<img src="your-gif-url.gif" alt="Your GIF" className="w-full h-auto" />
</div>

