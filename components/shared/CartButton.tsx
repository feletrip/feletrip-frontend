import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CartButton() {
  // Replace this
  const cartItemsCount = 1;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden sm:inline-flex relative"
      aria-label="Open cart"
      asChild
    >
      <Link href="/cart">
        <ShoppingCart className="size-5" />

        {cartItemsCount > 0 && (
          <Badge
            variant="outline"
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] bg-primary dark:bg-primary text-secondary-foreground text-xs"
          >
            {cartItemsCount > 9 ? "9+" : cartItemsCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
