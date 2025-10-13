import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function StatCard({
  stat,
  title,
  descriptionText,
  className,
  icon,
  progressData,
  progressType,
}: {
  stat: number;
  title: string;
  descriptionText?: string;
  className?: string;
  icon?: React.ReactNode;
  progressData?: string;
  progressType?: "green" | "red" | "yellow";
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          {progressData && (
            <span className={`text-${progressType}-600`}>{progressData}</span>
          )}{" "}
          {descriptionText}
        </p>
      </CardContent>
    </Card>
  );
}
