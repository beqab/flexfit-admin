"use client";

import { TActivity, TWorkingHours, TDayOfWeek } from "@/lib/types/serviceTypes";
import { ActivityIcon, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";

// Get current day of the week
const getCurrentDay = (): TDayOfWeek => {
  const days: TDayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
};

// All days of the week in order
const ALL_DAYS: TDayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface ActivityItemProps {
  workingHours: TWorkingHours;
}

export default function ActivityItem({ workingHours }: ActivityItemProps) {
  const currentDay = getCurrentDay();
  const [expandedDays, setExpandedDays] = useState<Set<TDayOfWeek>>(
    new Set([currentDay])
  );

  const toggleDay = (day: TDayOfWeek) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  // Create a map for quick lookup
  const workingHoursMap = new Map(
    workingHours.map((wh) => [wh.day, wh.activities])
  );

  return (
    <div className="space-y-2">
      {ALL_DAYS.map((day) => {
        const activities = workingHoursMap.get(day) || [];
        const isExpanded = expandedDays.has(day);
        const isToday = day === currentDay;

        return (
          <div
            key={day}
            className={`border rounded-lg overflow-hidden transition-all ${
              isToday ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
          >
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isToday
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${
                      isToday ? "text-blue-700" : "text-gray-900"
                    }`}
                  >
                    {day}
                    {isToday && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activities.length > 0
                      ? `${activities.length} ${
                          activities.length === 1 ? "activity" : "activities"
                        }`
                      : "No activities"}
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Activities List */}
            {isExpanded && (
              <div className="border-t border-gray-200 bg-white">
                {activities.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {activities.map((activity, index) => (
                      <div
                        key={`${activity.description}-${activity.time}-${index}`}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <ActivityIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No activities scheduled for this day
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
