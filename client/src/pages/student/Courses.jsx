import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";

const Courses = () => {
  const isLoading = !true;

  const courses = [1,2,3,4,5,6];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl m-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10 text-gray-800 dark:text-gray-100">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            courses.map((_, index) => (
              <Course key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-none hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 dark:text-gray-200" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 dark:text-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full dark:text-gray-200" />
            <Skeleton className="h-4 w-20 dark:text-gray-200" />
          </div>
          <Skeleton className="h-4 w-16 dark:text-gray-200" />
        </div>
        <Skeleton className="h-4 w-1/4 dark:text-gray-200" />
      </div>
    </div>
  );
};