"use client";

import React from "react";
import { CircularProgress, Card, CardBody } from "@nextui-org/react";

export default function Timer(props: { timeValue: number; maxTime: number }) {
  const { timeValue, maxTime } = props;

  const percentage = Math.round((timeValue / maxTime) * 100);

  return (
    <Card className='h-full w-2/3 border-none bg-slate-950'>
      <CardBody className='justify-center items-center p-8'>
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={percentage}
          strokeWidth={4}
          showValueLabel={true}
          valueLabel={timeValue.toString()}
          aria-label='Label Value'
        />
      </CardBody>
    </Card>
  );
}
