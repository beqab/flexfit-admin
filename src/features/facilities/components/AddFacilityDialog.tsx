"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddEditFacilityDialog from "./addEditFacility/AddEditFacilityDialog";

export default function AddFacilityDialog() {
  const [open, setOpen] = useState(false);

  const handleSave = (facility: any) => {
    console.log("New facility created:", facility);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Facility
        </Button>
      </DialogTrigger>
      <AddEditFacilityDialog
        open={open}
        onOpenChange={setOpen}
        onSave={handleSave}
        availableLanguages={["en", "ka"]} // Example: can add more languages
      />
    </Dialog>
  );
}
