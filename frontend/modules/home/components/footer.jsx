import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import BrandLogo from "./logo";

function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <BrandLogo className={"mb-2"} />
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for the best games at unbeatable prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  RPG Games
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  Action Games
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  Sports Games
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  FPS Games
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  Contact Us
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  FAQ
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  Returns
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground"
                >
                  Shipping
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest games and deals
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2025 GameStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
