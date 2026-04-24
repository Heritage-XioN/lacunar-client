import * as React from "react"
import * as RPNInput from "react-phone-number-input"
import 'react-phone-number-input/style.css'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type PhoneInputProps = React.ComponentProps<typeof RPNInput.default>

const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <RPNInput.default
        ref={ref}
        className={cn("flex", className)}
        inputComponent={InputComponent}
        onChange={(value) => onChange?.(value || "")}
        {...props}
      />
    )
  }
)
PhoneInput.displayName = "PhoneInput"

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn("rounded-e-md rounded-s-none", className)}
      {...props}
      ref={ref}
    />
  )
)
InputComponent.displayName = "InputComponent"

export { PhoneInput }
