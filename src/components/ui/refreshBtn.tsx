import { RefreshCcw } from "lucide-react";
import { Button } from "./button";

export default function RefreshBtn({
  refetch,
  isRefetching,
}: {
  refetch: () => void;
  isRefetching: boolean;
}) {
  return (
    <Button variant="outline" onClick={refetch} disabled={isRefetching}>
      <RefreshCcw
        className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
      />
      {isRefetching ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
