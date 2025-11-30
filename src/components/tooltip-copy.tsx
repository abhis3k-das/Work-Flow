"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface CopyWithTooltipProps {
  text: string;
  className?: string;
}

export default function CopyWithTooltip({ text, className }: CopyWithTooltipProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setOpen(true);

    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Copy
            onClick={handleCopy}
            className={`h-4 w-4 cursor-pointer text-gray-500 hover:text-black dark:hover:text-white ${className ?? ""}`}
          />
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{copied ? "Copied!" : "Copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
