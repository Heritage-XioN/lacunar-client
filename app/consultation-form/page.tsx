import { ConsultationFormTemplate } from "@/components/template/consultation-form-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Consultation Form | Vantage Strategy",
  description: "Book your free initial consultation with Vantage Strategy.",
}

export default function ConsultationFormPage() {
  return (
    <ConsultationFormTemplate />
  )
}
