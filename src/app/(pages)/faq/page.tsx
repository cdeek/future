import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../_components/ui/accordion";

export default function Faq() {
 return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How can I place an order?</AccordionTrigger>
          <AccordionContent>
           <p>
            You can easily place an order by browsing our products, 
            adding items to your cart, and following the checkout process.
           </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
           <p>
            We accept major cards, paystack, and PayPal for secure and convenient payments.
           </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How can I track my order?</AccordionTrigger>
          <AccordionContent>
           <p>
            Once your order is shipped, you will receive a tracking number and a link to track your order in real-time.
           </p>
          </AccordionContent>
        </AccordionItem>
    </Accordion>
  </div>
  )
}