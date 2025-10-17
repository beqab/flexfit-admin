import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardListProps = {
  name: string;
  description: string;
  isLoading?: boolean;
  children: React.ReactNode;
  error?: string;
};

function DashboardList({
  name,
  description,
  children,
  isLoading,
  error,
}: DashboardListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error ? (
            <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/30">
              {error}
            </div>
          ) : isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-12 w-full rounded-md" />
            ))
          ) : (
            children
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardList;
