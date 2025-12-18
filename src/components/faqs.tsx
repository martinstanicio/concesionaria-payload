import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function FAQs(props: React.ComponentProps<'section'>) {
  const payload = await getPayload({ config })

  const faqs = await payload.find({
    collection: 'frequently-asked-questions',
    depth: 1,
    pagination: false,
  })

  if (!faqs.totalDocs) return

  return (
    <section {...props}>
      <div className="container mx-auto space-y-12 px-4 py-24">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue={'0'}
          className="mx-auto w-full max-w-3xl space-y-4"
        >
          {faqs.docs.map(({ question, answer }, i) => (
            <AccordionItem value={i.toString()} key={i}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                <RichText data={answer} className="prose dark:prose-invert max-w-none" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-center">
          ¿Aún tenés dudas?{' '}
          <Button variant="link" asChild>
            <Link href="/contacto">Contactanos</Link>
          </Button>
        </p>
      </div>
    </section>
  )
}
