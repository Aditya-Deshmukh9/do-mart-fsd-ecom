import Link from "next/link";
import React from "react";

function BrandLogo({ className }) {
  return (
    <Link href="/" className={`flex-shrink-0 flex items-center ${className}`}>
      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-2">
        <div className="w-4 h-4 bg-background rounded-sm"></div>
      </div>
      <span className="text-xl font-bold text-foreground">WoodMarr.</span>
    </Link>
  );
}

export default BrandLogo;
