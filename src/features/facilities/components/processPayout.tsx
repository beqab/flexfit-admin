"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useStartPayout } from "../../facilities/hooks/useStartPayout";
import { useFinishPayout } from "../../facilities/hooks/useFinishPayout";

const ProcessPayout = ({
  payout,
  facilityId,
  pendingPayout,
}: {
  payout: number | undefined;
  facilityId: string;
  pendingPayout: number | undefined;
}) => {
  const [payoutInProgress, setPayoutInProgress] = useState(false);
  const startMutation = useStartPayout();
  const finishMutation = useFinishPayout();

  const handleStart = async () => {
    setPayoutInProgress(true);
    try {
      await startMutation.mutateAsync({
        facilityId,
        currentPayout: payout,
      });
    } catch (e) {
      setPayoutInProgress(false);
    }
  };

  const handleFinish = async () => {
    try {
      await finishMutation.mutateAsync({ facilityId });
    } finally {
      setPayoutInProgress(false);
    }
  };

  const isStarting = startMutation.isPending;
  const isFinishing = finishMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout</CardTitle>
      </CardHeader>
      <CardContent className="flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <div className="text-sm text-muted-foreground">Current payout:</div>
            <div className="font-semibold text-lg">{payout ?? 0} ლ</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Pending payout:</div>
            <div className="font-semibold text-lg">{pendingPayout ?? 0} ლ</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="default"
            onClick={handleStart}
            disabled={payoutInProgress || isStarting || pendingPayout !== 0}
          >
            {isStarting ? "Starting..." : "Start payout"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleFinish}
            disabled={isFinishing || pendingPayout === 0}
          >
            {isFinishing ? "Finishing..." : "Finish payout"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessPayout;
