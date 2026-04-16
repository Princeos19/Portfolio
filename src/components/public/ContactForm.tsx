import { useState, type FormEvent } from 'react';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import type { ContactFormProps } from '../../types/contact.types';

export function ContactForm({ setFormStatus }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    const payload = {
      name: typeof data.name === 'string' ? data.name.trim() : '',
      email: typeof data.email === 'string' ? data.email.trim() : '',
      message: typeof data.message === 'string' ? data.message.trim() : '',
    };

    if (!payload.name || !payload.email || !payload.message) {
      setFormStatus('Please complete all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/public/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormStatus('Sent!');
        form.reset();
      } else {
        const response = await res.json().catch(() => null);
        setFormStatus(
          response && typeof response.error === 'string' ? response.error : 'Something went wrong.',
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          label="Your Name"
          name="name"
          placeholder="John Doe"
          required
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="hello@example.com"
          required
        />
      </div>

      <FormTextarea
        label="Message"
        name="message"
        placeholder="Tell us about your project..."
        required
      />

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-3 bg-primary text-on-primary px-12 py-5 rounded-xl font-headline font-extrabold text-lg transition-all hover:shadow-[0_10px_40px_-10px_rgba(0,218,243,0.5)] active:scale-95 w-full md:w-auto"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </form>
  );
}
