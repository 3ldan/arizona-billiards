"use client";

import React from "react";
import { Button } from "@nextui-org/react";

export default function CustomButton(props: {
  size?: any;
  label: any;
  color?: any;
  onPress: any;
  isDisabled?: any;
}) {
  const { size = 120, label, color, onPress, isDisabled } = props;
  return (
    <div className='flex gap-4 items-center p-2'>
      <Button
        isDisabled={isDisabled}
        color={color}
        variant='shadow'
        style={{ width: size, height: size / 2 }}
        onPress={onPress}
        className={color ? "" : "bg-white"}>
        <h1 className='text-lg text-slate-950'>{label}</h1>
      </Button>
    </div>
  );
}
