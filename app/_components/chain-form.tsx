"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { eos } from "viem/chains";
import { createPublicClient, http } from "viem";
const allChains = [
  {
    value: eos.network,
    label: eos.name,
  },
];

const ChainForm = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const client = createPublicClient({
    chain: eos,
    transport: http(),
  });

  return (
    <div>
      <div className="mb-1 text-lg font-medium tracking-tight">
        Select EOS EVM below:
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[1420px] justify-between"
          >
            {value
              ? allChains.find((chain) => chain.value === value)?.label
              : "Select a chain..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[1420px] p-0">
          <Command>
            <CommandInput placeholder="Search chain..." />
            <CommandEmpty>No chain found.</CommandEmpty>
            <CommandGroup>
              {allChains.map((chain) => (
                <CommandItem
                  key={chain.value}
                  value={chain.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === chain.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {chain.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChainForm;
