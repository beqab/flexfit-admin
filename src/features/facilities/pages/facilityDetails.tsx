"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Edit,
  ArrowLeft,
  Clock,
  DollarSign,
  Tag,
  TrendingUp,
  Star,
  Languages,
} from "lucide-react";
import Image from "next/image";
import { IFacility, ISingleFacility } from "@/lib/types/serviceTypes";
import { useRouter } from "next/navigation";
import EditFacilityDialog from "../components/EditFacilityDialog";
import { useGetFacilityById } from "../hooks/getFacilityById";

enum Language {
  EN = "en",
  KA = "ka",
}

// Convert ISingleFacility to IFacility format
const convertToIFacility = (
  facility: ISingleFacility,
  language: Language
): IFacility => ({
  ...facility,
  name: facility.name[language] || "",
  address: facility.address[language] || "",
  workingHours: facility.workingHours.map((schedule) => ({
    ...schedule,
    activities: schedule.activities.map((activity) => ({
      ...activity,
      description: activity.description[language] || "",
    })),
  })),
  prices: facility.prices.map((price) => ({
    ...price,
    text: price.text[language] || "",
  })),
  categories: facility.categories.map((category) => ({
    ...category,
    name: category.name[language] || "",
  })),
});

export default function FacilityDetails({
  facilityId,
}: {
  facilityId: string;
}) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const {
    data: rawFacilityData,
    isLoading,
    error,
  } = useGetFacilityById(facilityId);

  const handleSaveFacility = (updatedFacility: ISingleFacility) => {
    // TODO: Call API to update facility data
    console.log("Updated facility:", updatedFacility);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!rawFacilityData) {
    return <div>Facility not found</div>;
  }

  // Convert multilingual data to single language
  const facilityData = convertToIFacility(rawFacilityData, language);

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{facilityData.name}</h1>
            <p className="text-muted-foreground">Facility Details</p>
          </div>
        </div>
        <Button onClick={() => setIsEditDialogOpen(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Facility
        </Button>
      </div>

      {/* Status Badges & Language Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {facilityData.new && <Badge variant="default">New</Badge>}
          {facilityData.popular && <Badge variant="secondary">Popular</Badge>}
          {/* Ratings */}
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{facilityData?.rating?.overallAverage}</span>
          </Badge>
        </div>

        {/* Language Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setLanguage(language === Language.EN ? Language.KA : Language.EN)
          }
          className="flex items-center gap-2"
        >
          <Languages className="h-4 w-4" />
          {language === Language.EN ? Language.EN : Language.KA}
        </Button>
      </div>

      {/* Edit Dialog */}
      <EditFacilityDialog
        facility={rawFacilityData}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveFacility}
        availableLanguages={[Language.EN, Language.KA]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {facilityData?.imgs?.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-48 rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={img}
                      alt={`${facilityData.name} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facilityData.workingHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="font-semibold text-sm mb-2">
                      {schedule.day}
                    </div>
                    <div className="space-y-1">
                      {schedule.activities.map((activity, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-muted-foreground">
                            {activity.description}
                          </span>
                          <span className="font-medium">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categories & Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {facilityData.categories.map((category) => (
                  <Badge key={category._id} variant="outline">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                activity prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilityData.prices.map((priceItem) => (
                  <div
                    key={priceItem._id}
                    className="border rounded-lg p-4 hover:bg-accent transition-colors"
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      {priceItem?.text}
                    </div>
                    <div className="text-2xl font-bold">
                      {priceItem?.price} Credits
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      payout: {priceItem?.payout} ლ
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact & Stats */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Total Payout
                </div>
                <div className="text-3xl font-bold">
                  {facilityData?.payoutSum?.toLocaleString()} ლ
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Base Price
                </div>
                <div className="text-3xl font-bold">{facilityData.price} ლ</div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Address</div>
                  <div className="font-medium">{facilityData.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <a
                    href={`tel:${facilityData.phone}`}
                    className="font-medium hover:underline"
                  >
                    {facilityData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a
                    href={`mailto:${facilityData.email}`}
                    className="font-medium hover:underline"
                  >
                    {facilityData.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card>
            <CardHeader>
              <CardTitle>Location Coordinates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latitude:</span>
                  <span className="font-medium">
                    {facilityData.location.Lat}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Longitude:</span>
                  <span className="font-medium">
                    {facilityData.location.Lon}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
