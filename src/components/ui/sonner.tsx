import { useTheme } from "@/components/theme-provider"

interface SonnerProps {
  // Add any props you need here
  children?: React.ReactNode;
}

function Sonner(props: SonnerProps) {
  const { theme } = useTheme()
  
  return (
    <div data-theme={theme} {...props}>
      {props.children}
    </div>
  )
}

// Export as both Sonner and Toaster for compatibility
export { Sonner, Sonner as Toaster }
