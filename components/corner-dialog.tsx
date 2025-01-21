import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Button } from './ui/button';
import { useState } from 'react';

export function AccordionComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={toggleAccordion} variant="default">
        {isOpen ? 'Close' : 'Open'} Accordion
      </Button>
      <Accordion open={isOpen}>
        <AccordionItem>
          <AccordionTrigger>Accordion Title</AccordionTrigger>
          <AccordionContent>
            {/* Embed other components here */}
            <div>Your content goes here!</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
