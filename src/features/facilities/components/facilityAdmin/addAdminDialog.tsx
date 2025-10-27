"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddAdmin } from "../../hooks/useAddAdmin";
import { addAdminSchema, AddAdminFormData } from "../../zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormField from "@/components/ui/form/formField";

interface AddAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facilityId: string;
}

export default function AddAdminDialog({
  open,
  onOpenChange,
  facilityId,
}: AddAdminDialogProps) {
  const { mutate: addAdmin, isPending } = useAddAdmin();

  const initialValues: AddAdminFormData = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: AddAdminFormData,
    { setSubmitting, resetForm }: FormikHelpers<AddAdminFormData>
  ) => {
    addAdmin(
      {
        username: values.username,
        password: values.password,
        facilityId,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          resetForm();
          setSubmitting(false);
        },
        onError: () => {
          setSubmitting(false);
        },
      }
    );
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Facility Admin</DialogTitle>
          <DialogDescription>
            Create a new admin account for this facility.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addAdminSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid gap-4 py-4">
                <FormField
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                />
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isPending}>
                  {isSubmitting || isPending ? "Adding..." : "Add Admin"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
