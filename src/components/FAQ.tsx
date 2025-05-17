
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of images work best with Prompt2CAD?",
    answer: "Clear, well-lit images with good contrast work best. We recommend providing multiple angles of the same object for optimal results, though our AI can work with single images as well. Images should have the object clearly visible against a simple background."
  },
  {
    question: "What file formats do you support for input images?",
    answer: "We support common image formats including JPG, PNG, and WEBP. The maximum file size is 10MB per image."
  },
  {
    question: "What 3D file formats can I export to?",
    answer: "You can export your 3D models in OBJ, STL, GLTF, and FBX formats, making them compatible with virtually any 3D software, game engine, or 3D printing service."
  },
  {
    question: "How accurate are the 3D models?",
    answer: "Our AI produces highly accurate 3D models, especially for hard-surface objects. Organic shapes may require some additional editing, which you can do directly in our editor. The accuracy depends on image quality and object complexity."
  },
  {
    question: "Do I own the 3D models I create?",
    answer: "Yes, you retain full ownership of any 3D models created from your images. You're free to use them for personal or commercial projects without restrictions."
  },
  {
    question: "Can I use Prompt2CAD for commercial projects?",
    answer: "Absolutely! Our Pro and Enterprise plans are specifically designed for commercial use, with higher resolution outputs and more export options."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black/30" id="faq">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about Prompt2CAD and how it works.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center text-primary hover:underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10" />
    </section>
  );
};

export default FAQ;
