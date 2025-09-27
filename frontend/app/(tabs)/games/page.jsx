"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import BreadcrumbComp from "@/components/Breadcrumb";
import { usePathname } from "next/navigation";

const GamesMarketplace = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([100]);
  const pathname = usePathname();

  // Sample game data
  const games = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      originalPrice: 59.99,
      salePrice: 29.99,
      rating: 4.2,
      reviews: 1547,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      genre: "RPG",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: true,
    },
    {
      id: 2,
      title: "The Witcher 3: Wild Hunt",
      originalPrice: 39.99,
      salePrice: 19.99,
      rating: 4.8,
      reviews: 2341,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      genre: "RPG",
      platform: ["PC", "PS5", "Xbox", "Switch"],
      onSale: true,
      featured: true,
    },
    {
      id: 3,
      title: "Call of Duty: Modern Warfare",
      originalPrice: 69.99,
      salePrice: 34.99,
      rating: 4.1,
      reviews: 987,
      image:
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
      genre: "FPS",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: false,
    },
    {
      id: 4,
      title: "Assassin's Creed Valhalla",
      originalPrice: 59.99,
      salePrice: 24.99,
      rating: 4.3,
      reviews: 1876,
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
      genre: "Action",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: true,
    },
    {
      id: 5,
      title: "FIFA 24",
      originalPrice: 69.99,
      salePrice: 39.99,
      rating: 3.9,
      reviews: 743,
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
      genre: "Sports",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: false,
    },
    {
      id: 6,
      title: "Elden Ring",
      originalPrice: 59.99,
      salePrice: 44.99,
      rating: 4.7,
      reviews: 2156,
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      genre: "RPG",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: true,
    },
    {
      id: 7,
      title: "Grand Theft Auto V",
      originalPrice: 29.99,
      salePrice: 14.99,
      rating: 4.4,
      reviews: 3421,
      image:
        "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop",
      genre: "Action",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: false,
    },
    {
      id: 8,
      title: "Red Dead Redemption 2",
      originalPrice: 59.99,
      salePrice: 29.99,
      rating: 4.6,
      reviews: 2987,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      genre: "Action",
      platform: ["PC", "PS5", "Xbox"],
      onSale: true,
      featured: true,
    },
  ];

  const filteredGames = useMemo(() => {
    let filtered = games.filter(
      (game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterBy === "all" || game.genre.toLowerCase() === filterBy) &&
        game.salePrice <= priceRange[0]
    );

    // Sort games
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.salePrice - b.salePrice;
        case "price-high":
          return b.salePrice - a.salePrice;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return b.reviews - a.reviews; // popularity
      }
    });

    return filtered;
  }, [searchTerm, filterBy, sortBy, priceRange]);

  const GameCard = ({ game }) => (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {game.onSale && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            -
            {Math.round(
              ((game.originalPrice - game.salePrice) / game.originalPrice) * 100
            )}
            %
          </Badge>
        )}
        {game.featured && (
          <Badge className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-8 w-8 p-0">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
          {game.title}
        </CardTitle>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground ml-1">
              {game.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({game.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{game.genre}</Badge>
          <div className="flex gap-1">
            {game.platform.slice(0, 2).map((platform, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {platform}
              </Badge>
            ))}
            {game.platform.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{game.platform.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              ${game.salePrice}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${game.originalPrice}
            </span>
          </div>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: pathname.replace("/", ""), href: pathname },
  ];

  return (
    <div className="min-h-screen bg-background container mx-auto">
      {/* Breadcrumb */}
      <BreadcrumbComp items={breadcrumbItems} />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Search Games</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search games..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={filterBy}
                  onValueChange={setFilterBy}
                  className="space-y-2"
                >
                  {["all", "rpg", "fps", "action", "sports"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <RadioGroupItem value={category} id={category} />
                      <Label
                        htmlFor={category}
                        className="text-sm font-normal capitalize"
                      >
                        {category === "all" ? "All Games" : category}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Price Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>${priceRange[0]}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Showing {filteredGames.length} of {games.length} games
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">
                          Sort by Popularity
                        </SelectItem>
                        <SelectItem value="rating">Sort by Rating</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="name">Sort by Name</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Games Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* No Results */}
            {filteredGames.length === 0 && (
              <Card className="text-center py-12">
                <CardContent className="pt-6">
                  <div className="text-muted-foreground mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <CardTitle className="mb-2">No games found</CardTitle>
                  <CardDescription>
                    Try adjusting your search or filters
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            {/* Load More */}
            {filteredGames.length > 0 && (
              <div className="text-center mt-12">
                <Button size="lg">Load More Games</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesMarketplace;
