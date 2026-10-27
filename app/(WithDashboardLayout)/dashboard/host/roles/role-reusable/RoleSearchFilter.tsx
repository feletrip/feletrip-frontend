import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter } from "lucide-react";

interface RoleSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

export default function RoleSearchFilter({ searchQuery, onSearchChange, filterType, setFilterType }: RoleSearchFilterProps) {
  return (
    <Card className="w-full bg-card border border-border p-4 shadow-sm overflow-hidden">
      <CardContent className="p-0 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search roles by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 h-14 min-w-0 text-base border-2 focus:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 h-14 w-auto min-w-0 justify-center border-2 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm px-4"
            >
              <Filter className="h-5 w-5" />
              <span className="font-medium">{filterType === "all" ? "All" : filterType}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 border-2 shadow-xl">
            <DropdownMenuItem onClick={() => setFilterType("all")} className="py-3 px-4 cursor-pointer hover:bg-primary/10">
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("admin")} className="py-3 px-4 cursor-pointer hover:bg-purple-500/10">
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("host")} className="py-3 px-4 cursor-pointer hover:bg-blue-500/10">
              Host
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("user")} className="py-3 px-4 cursor-pointer hover:bg-green-500/10">
              User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
