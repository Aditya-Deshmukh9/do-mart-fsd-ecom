import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const StarRating = ({
    rating = 3.5,
    maxRating = 5,
    size = "w-5 h-5",
    filledColor = "fill-yellow-400 text-yellow-400",
    emptyColor = "text-gray-300",
    showRating = true,
    ratingClassName = "ml-2 text-sm text-foreground/70",
    containerClassName = "flex items-center gap-1",
    starClassName = "",
    customColors = null
}) => {
    const stars = [];

    // Custom color variants
    const colorVariants = {
        yellow: "fill-yellow-400 text-yellow-400",
        orange: "fill-orange-400 text-orange-400",
        red: "fill-red-400 text-red-400",
        green: "fill-green-400 text-green-400",
        blue: "fill-blue-400 text-blue-400",
        purple: "fill-purple-400 text-purple-400",
        pink: "fill-pink-400 text-pink-400",
        gold: "fill-amber-400 text-amber-400"
    };

    const actualFilledColor = customColors?.filled || filledColor;
    const actualEmptyColor = customColors?.empty || emptyColor;

    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            // Full star
            stars.push(
                <Star
                    key={i}
                    className={cn(size, actualFilledColor, starClassName)}
                />
            );
        } else if (i - 0.5 <= rating) {
            // Half star
            stars.push(
                <div key={i} className={cn("relative", size)}>
                    <Star className={cn("absolute", size, actualEmptyColor)} />
                    <div className="absolute overflow-hidden w-1/2">
                        <Star className={cn(size, actualFilledColor)} />
                    </div>
                </div>
            );
        } else {
            // Empty star
            stars.push(
                <Star
                    key={i}
                    className={cn(size, actualEmptyColor, starClassName)}
                />
            );
        }
    }

    return (
        <div className={cn(containerClassName)}>
            {stars}
            {showRating && (
                <span className={cn(ratingClassName)}>({rating})</span>
            )}
        </div>
    );
};

// Predefined star rating variants for common use cases
export const StarRatingVariants = {
    // Size variants
    small: { size: "w-3 h-3", ratingClassName: "ml-1 text-xs text-foreground/70" },
    medium: { size: "w-5 h-5", ratingClassName: "ml-2 text-sm text-foreground/70" },
    large: { size: "w-6 h-6", ratingClassName: "ml-2 text-base text-foreground/70" },
    xlarge: { size: "w-8 h-8", ratingClassName: "ml-3 text-lg text-foreground/70" },

    // Color variants
    gold: { filledColor: "fill-amber-400 text-amber-400" },
    orange: { filledColor: "fill-orange-400 text-orange-400" },
    red: { filledColor: "fill-red-400 text-red-400" },
    green: { filledColor: "fill-green-400 text-green-400" },
    blue: { filledColor: "fill-blue-400 text-blue-400" },
    purple: { filledColor: "fill-purple-400 text-purple-400" },

    // Style variants
    minimal: { showRating: false, containerClassName: "flex items-center gap-0.5" },
    compact: { size: "w-4 h-4", containerClassName: "flex items-center gap-0.5", showRating: false },
    spaced: { containerClassName: "flex items-center gap-2" }
};

// Easy-to-use preset components
export const GoldStarRating = (props) => (
    <StarRating {...StarRatingVariants.gold} {...props} />
);

export const SmallStarRating = (props) => (
    <StarRating {...StarRatingVariants.small} {...props} />
);

export const LargeStarRating = (props) => (
    <StarRating {...StarRatingVariants.large} {...props} />
);

export const MinimalStarRating = (props) => (
    <StarRating {...StarRatingVariants.minimal} {...props} />
);