"use client";

import { useState } from "react";
import { useGetFacilityAdmins } from "../../hooks/useGetFacilityAdmins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus } from "lucide-react";
import AddAdminDialog from "./addAdminDialog";

export default function AdminsList({ facilityId }: { facilityId: string }) {
  const { data, isLoading, error } = useGetFacilityAdmins(facilityId);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const admins = data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Admins</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Admins</h2>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Failed to load facility admins: {error.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admins</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      {admins.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              <p className="mb-2 text-lg font-semibold">
                This facility doesn't have any admins
              </p>
              <p className="text-sm">
                Click "Add Admin" to create an admin account for this facility
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {admins.map((admin) => (
            <Card key={admin._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{admin.username}</CardTitle>
                  <Badge
                    variant={
                      admin.role === "super-admin" ? "default" : "secondary"
                    }
                  >
                    {admin.role}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Admin ID: {admin._id}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddAdminDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        facilityId={facilityId}
      />
    </div>
  );
}
