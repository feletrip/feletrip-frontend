import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Link } from 'lucide-react';
import { Input } from '../ui/input';
import Pricing from './pricingSubs';

const subscription = () => {
    return (
      <div>
        {/* pricing */}
      <Pricing />
        {/* subscription */}
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 -mt-20">
        <Card className="backdrop-blur">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Hotel Mania Premium Club
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Unlock exclusive room rates and luxury stay perks
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Join our curated newsletter to receive private offers, seasonal getaway drops, and concierge updates.
              </p>
            </div>
            <form className="flex w-full max-w-md items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 border-border bg-background"
              />
              <Button className="h-11 px-5">
                <Link href="/login">
                Subscribe
                </Link>

                <ArrowRight className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
            
        </div>
        </div>
    );
};

export default subscription;