"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, CheckCircle2, Clock, XCircle, LayoutGrid } from "lucide-react";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface DealSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

export default function SearchFilter({ 
  searchQuery, 
  onSearchChange, 
  filterType, 
  setFilterType 
}: DealSearchFilterProps) {
  
  const getFilterLabel = (type: string) => {
    switch (type) {
      case "all": return "All Deals";
      case "active": return "Active";
      case "pending": return "Pending";
      case "expired": return "Expired";
      default: return type;
    }
  };

  return (
    <Motion>
      <Card className=" rounded-none mt-14 border-none shadow-none overflow-hidden">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between min-w-0 p-0"> 
        
        {/* Search Input Box */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none" />
          
          <Input
            placeholder="Search deals by name or promo code..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="relative pl-12 h-10 min-w-0 text-base border-2 focus:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
          />
        </div>

        {/* Filter Dropdown Controls */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 h-10 w-auto min-w-0 justify-center border-2 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm px-4"
            >
              <Filter className="h-5 w-5" />
              <span className="font-medium capitalize">{getFilterLabel(filterType)}</span>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-52 border-2 shadow-xl p-1">
            <DropdownMenuItem 
              onClick={() => setFilterType("all")} 
              className="py-3 px-4 cursor-pointer rounded-lg flex items-center gap-2 hover:bg-secondary/20 transition-colors"
            >
              <LayoutGrid size={16} className="text-muted-foreground" />
              <span>All Deals</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setFilterType("active")} 
              className="py-3 px-4 cursor-pointer rounded-lg flex items-center gap-2 hover:bg-secondary/20 transition-colors"
            >
              <CheckCircle2 size={16} className="text-primary" />
              <span>Active</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setFilterType("pending")} 
              className="py-3 px-4 cursor-pointer rounded-lg flex items-center gap-2 hover:bg-secondary/20 transition-colors"
            >
              <Clock size={16} className="text-muted-foreground" />
              <span>Pending</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setFilterType("expired")} 
              className="py-3 px-4 cursor-pointer rounded-lg flex items-center gap-2 hover:bg-secondary/20 transition-colors"
            >
              <XCircle size={16} className="text-rose-500" />
              <span>Expired</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
    </Motion>
  );
}