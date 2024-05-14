// Import necessary modules
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../../lib/utils";

// Define props interface
interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

// Define ScrollAreaPage component
const ScrollAreaPage: React.FC<ScrollAreaProps> = ({ children, className }) => (
  <div className={cn("relative overflow-hidden", className)}>
    <ScrollAreaPrimitive.Root className="h-full w-full">
      <ScrollAreaPrimitive.Viewport className="h-full w-full">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        style={{
          width: 10, // adjust width as needed
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <ScrollAreaPrimitive.Thumb className="w-full rounded-full bg-gray-500" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  </div>
);

// Export ScrollAreaPage component
export default ScrollAreaPage;