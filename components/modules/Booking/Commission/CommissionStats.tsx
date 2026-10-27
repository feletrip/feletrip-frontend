"use client"

import { commissionData } from "@/data/commissionData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Wallet } from "lucide-react"

export default function CommissionStats() {

  const totalBookings = commissionData.reduce(
    (acc, item) => acc + item.bookingAmount,
    0
  )

  const totalCommission = commissionData.reduce(
    (acc, item) => acc + item.commissionAmount,
    0
  )

  const totalEarning = commissionData.reduce(
    (acc, item) => acc + item.hostEarning,
    0
  )

  const stats = [
    {
      title: "Total Booking Value",
      value: totalBookings,
      icon: DollarSign,
    },
    {
      title: "Platform Commission",
      value: totalCommission,
      icon: TrendingUp,
    },
    {
      title: "Your Earnings",
      value: totalEarning,
      icon: Wallet,
    },
  ]

  return (
  <div className="grid gap-6 md:grid-cols-3">
  {stats.map((stat, index) => {
    const Icon = stat.icon;

    return (
      <Card
        key={index}
        className="bg-primary/10 border-primary/10 hover:shadow-md transition-all"
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          {/* Ensure the title is text-left and has no extra centering */}
          <CardTitle className="text-left text-2xl font-bold text-muted-foreground">
            {stat.title}
          </CardTitle>

          <div className="p-2 rounded-xl bg-primary/20 text-primary">
            <Icon className="w-5 h-5" />
          </div>
        </CardHeader>

        <CardContent>
          {/* The inner div handles the alignment best */}
          <div className="text-left text-2xl font-bold text-secondary-foreground ml-6">
            ${stat.value.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>

  )
}