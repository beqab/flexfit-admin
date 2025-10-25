"use client";

import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikProps,
  FormikHelpers,
} from "formik";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ISingleFacility, TDayOfWeek } from "@/lib/types/serviceTypes";
import { facilityFormSchema, FacilityFormData } from "../../zod";
import { X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormField from "@/components/ui/form/formField";
import FieldArrayWrapper from "./fieldArrayWrapper";
import SelectCategory from "./selectCategory";
import { useAddEditFacility } from "../../hooks/useAddEditFacility";

interface AddEditFacilityDialogProps {
  facility?: ISingleFacility; // Optional for add mode
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (facility: ISingleFacility) => void;
  availableLanguages?: string[];
}

export default function AddEditFacilityDialog({
  facility,
  open,
  onOpenChange,
  onSave,
  availableLanguages = ["en", "ka"],
}: AddEditFacilityDialogProps) {
  // Determine if this is add or edit mode
  const isEditMode = !!facility?._id;
  const { mutate: addEditFacility } = useAddEditFacility();

  // Create default facility data for add mode
  const defaultFacility: ISingleFacility = {
    _id: "",
    name: availableLanguages.reduce(
      (acc, lang) => ({ ...acc, [lang]: "" }),
      {}
    ),
    address: availableLanguages.reduce(
      (acc, lang) => ({ ...acc, [lang]: "" }),
      {}
    ),
    phone: "",
    email: "",
    website: "",
    about: availableLanguages.reduce(
      (acc, lang) => ({ ...acc, [lang]: "" }),
      {}
    ),
    imgs: [],
    new: false,
    popular: false,
    location: { Lat: 0, Lon: 0 },
    img: "",
    workingHours: [],
    categories: [],
    prices: [],
    rating: {
      equipmentAverage: 0,
      equipmentCount: 0,
      hygieneAverage: 0,
      hygieneCount: 0,
      overallAverage: 0,
      overallCount: 0,
      staffAverage: 0,
      staffCount: 0,
    },
    price: 0,
    payoutSum: 0,
  };

  // Use provided facility or default for add mode
  const facilityData = facility || defaultFacility;
  const initialValues: FacilityFormData = {
    _id: facilityData._id,
    name: facilityData.name as { [key: string]: string },
    address: facilityData.address as { [key: string]: string },
    phone: facilityData.phone,
    email: facilityData.email || "",
    imgs: (facilityData.imgs || []) as string[],
    new: facilityData.new,
    popular: facilityData.popular || true,
    location: facilityData.location,
    about: facilityData.about as { [key: string]: string },
    img: facilityData.img || "",
    workingHours: facilityData.workingHours.map((wh) => ({
      ...wh,
      day: wh.day.trim() as TDayOfWeek, // Clean up any trailing spaces
      activities: wh.activities.map((activity) => ({
        ...activity,
        description: activity.description as { [key: string]: string },
      })),
    })),

    categories: facilityData.categories.map((cat) => ({
      ...cat,
      name: cat.name as { [key: string]: string },
    })),
    prices: facilityData.prices.map((price) => ({
      ...price,
      text: price.text as { [key: string]: string },
    })),
    rating: facilityData.rating,
    price: facilityData.price,
  };

  const handleSubmit = async (
    values: FacilityFormData,
    { setSubmitting }: FormikHelpers<FacilityFormData>
  ) => {
    console.log("🚀 FORM SUBMISSION STARTED");
    console.log("📝 Form values:", values);
    console.log("🔍 Working hours:", values.workingHours);
    try {
      // Convert back to ISingleFacility format
      const facilityData: ISingleFacility = {
        _id: values._id || "",
        name: values.name,
        about: values.about,
        address: values.address,
        phone: values.phone,
        email: values.email || "",
        website: values.website || "",
        imgs: values.imgs.filter(
          (img) => img !== undefined && img !== ""
        ) as string[],
        new: values.new,
        popular: values.popular || false,
        location: values.location,
        img: values.img || "",
        workingHours: values.workingHours,
        categories: values.categories,
        prices: values.prices,
        rating: values.rating,
        price: values.price,
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      addEditFacility(facilityData, {
        onSuccess: () => {
          toast.success(
            isEditMode
              ? "Facility updated successfully!"
              : "Facility created successfully!"
          );
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(
            isEditMode
              ? "Failed to update facility"
              : "Failed to create facility"
          );
          console.error(
            `Error ${isEditMode ? "updating" : "creating"} facility:`,
            error
          );
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    } catch (error) {
      toast.error("Failed to update facility");
      console.error("Error updating facility:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to render language inputs for multilingual fields
  const renderLanguageInputs = (
    fieldName: string,
    placeholder: string,
    required: boolean = false,
    type: string = "text"
  ) => {
    return availableLanguages.map((lang) => (
      <FormField
        key={lang}
        label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        name={`${fieldName}.${lang}`}
        type={type}
        placeholder={`${placeholder} (${lang.toUpperCase()})`}
        required={required}
      />
    ));
  };

  // Helper function to render price language inputs
  const renderPriceLanguageInputs = (
    priceIndex: number,
    formik: FormikProps<FacilityFormData>
  ) => {
    return availableLanguages.map((lang) => (
      <Field key={lang} name={`prices.${priceIndex}.text.${lang}`}>
        {({ field, meta }: any) => (
          <Input
            {...field}
            placeholder={`Plan Name (${lang.toUpperCase()})`}
            className={`flex-1 ${
              meta.error && meta.touched ? "border-red-500" : ""
            }`}
          />
        )}
      </Field>
    ));
  };

  // Helper function to render working hours language inputs
  const renderWorkingHoursLanguageInputs = (
    dayIndex: number,
    activityIndex: number,
    formik: FormikProps<FacilityFormData>
  ) => {
    return availableLanguages.map((lang) => (
      <Field
        key={lang}
        name={`workingHours.${dayIndex}.activities.${activityIndex}.description.${lang}`}
      >
        {({ field, meta }: any) => (
          <Input
            {...field}
            placeholder={`Activity Description (${lang.toUpperCase()})`}
            className={`flex-1 ${
              meta.error && meta.touched ? "border-red-500" : ""
            }`}
          />
        )}
      </Field>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Facility" : "Add New Facility"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the facility information. Click save when you're done."
              : "Fill in the facility information. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(facilityFormSchema)}
          onSubmit={handleSubmit}
          enableReinitialize
          validate={(values) => {
            console.log("🔍 Form validation triggered with values:", values);

            // Use Zod schema to validate and get detailed errors
            try {
              const result = facilityFormSchema.safeParse(values);
              console.log("✅ Zod validation result:", result);

              if (!result.success) {
                console.log("❌ Zod validation errors:", result.error.issues);
                console.log(
                  "❌ Formatted validation errors:",
                  result.error.format()
                );

                // Convert Zod errors to Formik format
                const formikErrors: any = {};
                result.error.issues.forEach((error: any) => {
                  const path = error.path.join(".");
                  formikErrors[path] = error.message;
                });

                console.log("❌ Formik errors object:", formikErrors);
                return formikErrors;
              } else {
                console.log("✅ Validation passed!");
                return {};
              }
            } catch (validationError) {
              console.error("💥 Validation error:", validationError);
              return {};
            }
          }}
        >
          {(formik) => {
            return (
              <Form>
                {/* Validation Error Display */}
                {Object.keys(formik.errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h4 className="text-red-800 font-semibold mb-2">
                      ⚠️ Validation Errors Found:
                    </h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      {Object.entries(formik.errors).map(([field, error]) => (
                        <li key={field}>
                          • {field}: {String(error)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Debug Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs">
                  <h4 className="font-semibold mb-2">🔍 Debug Info:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Form Valid: {formik.isValid ? "✅ Yes" : "❌ No"}</div>
                    <div>Form Dirty: {formik.dirty ? "✅ Yes" : "❌ No"}</div>
                    <div>
                      Form Submitting:{" "}
                      {formik.isSubmitting ? "⏳ Yes" : "❌ No"}
                    </div>
                    <div>Error Count: {Object.keys(formik.errors).length}</div>
                  </div>
                </div>

                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {renderLanguageInputs(
                        "name",
                        "Premium Fitness Center",
                        true
                      )}

                      <FormField
                        label="Phone"
                        name="phone"
                        type="text"
                        placeholder="+995 555 123 456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {renderLanguageInputs(
                        "address",
                        "123 Main Street, City, Country",
                        true
                      )}
                    </div>

                    <FormField
                      label="Main Image URL"
                      name="img"
                      type="text"
                      placeholder="https://example.com/image.jpg"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      {renderLanguageInputs(
                        "about",
                        "Tell us about this facility...",
                        false,
                        "textarea"
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        label="Base Price (ლ)"
                        name="price"
                        type="number"
                        placeholder="50"
                      />

                      <div className="space-y-2">
                        <Label>Status</Label>
                        <div className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2">
                            <Field
                              name="new"
                              type="checkbox"
                              className="w-4 h-4"
                            />
                            <span className="text-sm">New</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <Field
                              name="popular"
                              type="checkbox"
                              className="w-4 h-4"
                            />
                            <span className="text-sm">Popular</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Location Coordinates
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Longitude"
                        name="location.Lon"
                        type="number"
                        placeholder="44.8271"
                      />
                      <FormField
                        label="Latitude"
                        name="location.Lat"
                        type="number"
                        placeholder="41.7151"
                      />
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <FieldArrayWrapper
                    title="Gallery Images"
                    addButtonTitle="Add Image"
                  >
                    <FieldArray name="imgs">
                      {({ form, push, remove }) => (
                        <div className="space-y-2">
                          {form.values.imgs.map(
                            (img: string, index: number) => (
                              <div key={index} className="flex gap-2">
                                <FormField
                                  label="Image URL"
                                  name={`imgs.${index}`}
                                  type="text"
                                  placeholder="https://example.com/image.jpg"
                                  wrapperClassName="flex w-full space-y-0 justify-between"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => remove(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </FieldArray>
                  </FieldArrayWrapper>

                  {/* Categories */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                        Categories
                      </h3>
                      <FieldArray name="categories">
                        {({ push }: { push: (value: any) => void }) => {
                          const addCategory = () => {
                            // Add an empty category object that will be filled by SelectCategory
                            push({
                              _id: `cat-${Date.now()}`,
                              name: { en: "", ka: "" },
                              key: "",
                            });
                          };
                          return (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addCategory}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Category
                            </Button>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <FieldArray name="categories">
                      {({
                        form,
                        remove,
                      }: {
                        form: FormikProps<FacilityFormData>;
                        remove: (index: number) => void;
                      }) => (
                        <div className="space-y-2">
                          {form.values.categories.map(
                            (category: any, index: number) => (
                              <div key={category._id} className="space-y-2">
                                <div className="flex gap-2">
                                  <div className="flex-1">
                                    <SelectCategory
                                      name={`categories.${index}`}
                                      label="Category"
                                      placeholder="Select a category"
                                      required={true}
                                      selectedCategories={
                                        form.values.categories
                                      }
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="self-end"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  {/* Pricing Plans */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                        Pricing Plans
                      </h3>
                      <FieldArray name="prices">
                        {({ push }: { push: (value: any) => void }) => {
                          const addPrice = () => {
                            const textObject: { [key: string]: string } = {};
                            availableLanguages.forEach((lang) => {
                              textObject[lang] = "";
                            });
                            push({
                              _id: `price-${Date.now()}`,
                              price: 0,
                              payout: 0,
                              text: textObject,
                            });
                          };
                          return (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addPrice}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Price
                            </Button>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <FieldArray name="prices">
                      {({
                        form,
                        remove,
                      }: {
                        form: FormikProps<FacilityFormData>;
                        remove: (index: number) => void;
                      }) => (
                        <div className="space-y-2">
                          {form.values.prices.map(
                            (priceItem: any, index: number) => (
                              <div key={priceItem._id} className="space-y-2">
                                <div className="flex gap-2">
                                  {renderPriceLanguageInputs(index, formik)}
                                </div>
                                <div className="flex gap-2">
                                  <Field name={`prices.${index}.price`}>
                                    {({ field, meta }: any) => (
                                      <>
                                        <Input
                                          {...field}
                                          type="number"
                                          placeholder="Price"
                                          className={`flex-1 ${
                                            meta.error && meta.touched
                                              ? "border-red-500"
                                              : ""
                                          }`}
                                        />
                                        {meta.error && meta.touched && (
                                          <p className="text-xs text-red-500">
                                            {meta.error}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </Field>
                                  <Field name={`prices.${index}.payout`}>
                                    {({ field, meta }: any) => (
                                      <>
                                        <Input
                                          {...field}
                                          type="number"
                                          placeholder="Payout"
                                          className={`flex-1 ${
                                            meta.error && meta.touched
                                              ? "border-red-500"
                                              : ""
                                          }`}
                                        />
                                        {meta.error && meta.touched && (
                                          <p className="text-xs text-red-500">
                                            {meta.error}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </Field>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => remove(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  {/* Working Hours */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Working Hours
                    </h3>
                    <FieldArray name="workingHours">
                      {({ form }) => (
                        <>
                          {form.values.workingHours.map(
                            (schedule: any, dayIndex: number) => (
                              <div
                                key={schedule.day}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-sm">
                                    {schedule.day}
                                  </h4>
                                  <FieldArray
                                    name={`workingHours.${dayIndex}.activities`}
                                  >
                                    {({
                                      push,
                                    }: {
                                      push: (value: any) => void;
                                    }) => {
                                      const addActivity = () => {
                                        const descriptionObject: {
                                          [key: string]: string;
                                        } = {};
                                        availableLanguages.forEach((lang) => {
                                          descriptionObject[lang] = "";
                                        });
                                        push({
                                          time: "",
                                          description: descriptionObject,
                                        });
                                      };
                                      return (
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={addActivity}
                                        >
                                          <Plus className="h-4 w-4 mr-1" />
                                          Add Activity
                                        </Button>
                                      );
                                    }}
                                  </FieldArray>
                                </div>
                                <FieldArray
                                  name={`workingHours.${dayIndex}.activities`}
                                >
                                  {({
                                    form,
                                    remove,
                                  }: {
                                    form: FormikProps<FacilityFormData>;
                                    remove: (index: number) => void;
                                  }) => (
                                    <div className="space-y-2">
                                      {schedule.activities.map(
                                        (
                                          activity: any,
                                          activityIndex: number
                                        ) => (
                                          <div
                                            key={activityIndex}
                                            className="space-y-2"
                                          >
                                            <div className="flex gap-2">
                                              {renderWorkingHoursLanguageInputs(
                                                dayIndex,
                                                activityIndex,
                                                formik
                                              )}
                                            </div>
                                            <div className="flex gap-2">
                                              <Field
                                                name={`workingHours.${dayIndex}.activities.${activityIndex}.time`}
                                              >
                                                {({ field, meta }: any) => (
                                                  <>
                                                    <Input
                                                      {...field}
                                                      placeholder="09:00 - 18:00"
                                                      className={`flex-1 ${
                                                        meta.error &&
                                                        meta.touched
                                                          ? "border-red-500"
                                                          : ""
                                                      }`}
                                                    />
                                                    {meta.error &&
                                                      meta.touched && (
                                                        <p className="text-xs text-red-500">
                                                          {meta.error}
                                                        </p>
                                                      )}
                                                  </>
                                                )}
                                              </Field>
                                              <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                  remove(activityIndex)
                                                }
                                              >
                                                <X className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </FieldArray>
                              </div>
                            )
                          )}
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={formik.isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    onClick={() =>
                      console.log(
                        "Save button clicked, isSubmitting:",
                        formik.isSubmitting
                      )
                    }
                  >
                    {formik.isSubmitting
                      ? "Saving..."
                      : isEditMode
                      ? "Save Changes"
                      : "Create Facility"}
                  </Button>
                </DialogFooter>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
