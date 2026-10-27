"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

type Review = {
    id: string
    reviewer: {
        name: string
        email: string
        image: string
    }
    content: string
    rating: number
    facilitiesType: string
}

export default function ReviewCard({ review }: { review: Review }) {
    return (
        <Card className="hover:shadow-md transition">
            <CardContent className="p-5 space-y-4">

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={review.reviewer.image} />
                        <AvatarFallback>
                            {review.reviewer.name[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="font-semibold">{review.reviewer.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {review.reviewer.email}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>

                {/* Review Content */}
                <p className="text-sm text-muted-foreground">
                    {review.content}
                </p>

                {/* Review Category */}
                <p className="text-xs text-primary font-medium capitalize">
                    {review.facilitiesType.replace("-", " ")}
                </p>

            </CardContent>
        </Card>
    )
}