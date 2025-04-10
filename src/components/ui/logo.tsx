
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withText?: boolean;
}

export function Logo({ 
  className, 
  textClassName,
  size = "md", 
  withText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className={cn("aspect-square", sizeClasses[size], "bg-socse-DEFAULT rounded-md flex items-center justify-center overflow-hidden")}>
          <span className={cn("text-white font-bold", textSizeClasses[size])}>SoCSE</span>
        </div>
      </div>
      {withText && (
        <div className={cn("flex flex-col text-left", textClassName)}>
          <span className={cn("font-bold leading-tight", textSizeClasses[size])}>SoCSE</span>
          <span className="text-xs font-medium text-muted-foreground">Student Hub</span>
        </div>
      )}
    </div>
  );
}
