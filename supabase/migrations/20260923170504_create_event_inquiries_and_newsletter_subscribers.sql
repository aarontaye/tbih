/*
# Create public event inquiry and newsletter signup tables

1. New Tables
- `event_inquiries` stores event proposal requests submitted by visitors.
- `newsletter_subscribers` stores email addresses submitted to the hotel's newsletter.
- Both tables include created timestamps and workflow/status fields for staff review.

2. Security
- Row-level security is enabled on both tables.
- Anonymous and authenticated visitors may submit records because this site has no sign-in flow.
- Read, update, and delete access is restricted to authenticated roles for staff workflows.

3. Important Notes
- These tables are intentionally single-tenant and do not include user ownership columns.
- Email uniqueness prevents duplicate newsletter subscriptions.
*/

CREATE TABLE IF NOT EXISTS public.event_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_date date NOT NULL,
  guest_count integer NOT NULL CHECK (guest_count > 0),
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'responded', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.event_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_submit_event_inquiries" ON public.event_inquiries;
CREATE POLICY "public_submit_event_inquiries" ON public.event_inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "staff_read_event_inquiries" ON public.event_inquiries;
CREATE POLICY "staff_read_event_inquiries" ON public.event_inquiries
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_update_event_inquiries" ON public.event_inquiries;
CREATE POLICY "staff_update_event_inquiries" ON public.event_inquiries
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "staff_delete_event_inquiries" ON public.event_inquiries;
CREATE POLICY "staff_delete_event_inquiries" ON public.event_inquiries
  FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "public_submit_newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "public_submit_newsletter_subscribers" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "staff_read_newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "staff_read_newsletter_subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_update_newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "staff_update_newsletter_subscribers" ON public.newsletter_subscribers
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "staff_delete_newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "staff_delete_newsletter_subscribers" ON public.newsletter_subscribers
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS event_inquiries_created_at_idx ON public.event_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS event_inquiries_status_idx ON public.event_inquiries (status);
