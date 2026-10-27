import { Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

//  Simple Mock Data
const CART_ITEMS = [
  { id: 1, name: "SaintMartin Hotel", price: 10999, qty: 1 },
  { id: 2, name: "Wireless HotelDex", price: 67845, qty: 2 },
];

export default function CartPage() {
  // Calculate total
const total = CART_ITEMS.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="size-6" /> Your Cart
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Side: List of items */}
        <div className="md:col-span-2 space-y-4">
          {CART_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price} x {item.qty}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">${item.price * item.qty}</span>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Simple Summary */}
        <div className="bg-muted/30 p-6 rounded-lg h-fit border">
          <h2 className="font-semibold mb-4 text-lg">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-muted-foreground">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Button className="w-full" size="lg">
            Checkout
          </Button>
        </div>


      </div>
    </div>
  )
}