import { useState, useRef, useEffect, useId } from 'react';

/* ─────────────────────────────────────────────────────────────
   CONFIGURATION
   ─────────────────────────────────────────────────────────────
   To receive real emails via Formspree:
     1. Create a free account at https://formspree.io
     2. Create a new form → copy the endpoint ID (e.g. "xpwzabcd")
     3. Set VITE_FORMSPREE_ID=xpwzabcd in a .env file at the
        project root (never commit the .env to git).
   When VITE_FORMSPREE_ID is absent the form falls back to
   a mailto: link and honestly tells the visitor what happened.
   ───────────────────────────────────────────────────────────── */
const RAW_FORMSPREE = import.meta.env.VITE_FORMSPREE_ID || 'mqpebwnl';
const FORMSPREE_URL = RAW_FORMSPREE
  ? (RAW_FORMSPREE.startsWith('http') ? RAW_FORMSPREE : `https://formspree.io/f/${RAW_FORMSPREE}`)
  : null;

const EMAIL   = 'dhanrajvlgopi@gmail.com';
const PHONE   = '+91 9353427917';
const TEL     = 'tel:+919353427917';

/* ── Quick-contact items (left column) ── */
const CONTACT_ITEMS = [
  { icon: '📧', label: 'Email',    value: EMAIL,                   href: `mailto:${EMAIL}` },
  { icon: '📱', label: 'Phone',    value: PHONE,                   href: TEL },
  { icon: '📍', label: 'Location', value: 'Bengaluru, India',      href: null },
  { icon: '🎓', label: 'College',  value: 'Atria Institute of Technology', href: null },
];

/* ── Validation helpers ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim())               errors.name    = 'Your name is required.';
  if (!form.email.trim())              errors.email   = 'Your email is required.';
  else if (!EMAIL_RE.test(form.email)) errors.email   = 'Please enter a valid email address.';
  if (!form.message.trim())            errors.message = 'Please write a message.';
  return errors;
}

/* ── Spinner icon ── */
function Spinner() {
  return (
    <svg
      width="18" height="18"
      viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      aria-hidden="true"
      style={{ animation: 'btn-spin 0.8s linear infinite', flexShrink: 0 }}
    >
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}

/* ── Field component (keeps JSX DRY) ── */
function Field({ id, label, optional, error, touched, children }) {
  const hasError = touched && error;
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
        {optional && <span className="form-label-optional"> (optional)</span>}
      </label>
      {children}
      {hasError && (
        <span
          className="form-error"
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function Contact() {
  const uid = useId(); // collision-safe id prefix
  const mkId = s => `${uid}-${s}`;

  /* Form state */
  const INIT = { name: '', email: '', subject: '', message: '' };
  const [form,     setForm]     = useState(INIT);
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});
  const [status,   setStatus]   = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMsg,setServerMsg]= useState('');

  /* IntersectionObserver for fade-in */
  const itemRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    itemRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Handlers ── */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Re-validate field on change once it's been touched
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(form);
    setErrors(prev => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Touch all fields to surface all errors at once
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return; // stop if invalid

    setStatus('submitting');

    /* ── Real delivery via Formspree ── */
    if (FORMSPREE_URL) {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:    form.name,
            email:   form.email,
            subject: form.subject || 'Portfolio Enquiry',
            message: form.message,
            _replyto: form.email,
          }),
        });

        if (res.ok) {
          setStatus('success');
          setForm(INIT);
          setTouched({});
          setErrors({});
        } else {
          const data = await res.json().catch(() => ({}));
          setServerMsg(
            data?.errors?.[0]?.message ||
            'Something went wrong on the server. Please try again.'
          );
          setStatus('error');
        }
      } catch {
        setServerMsg('Network error — please check your connection and try again.');
        setStatus('error');
      }
      return;
    }

    /* ── Fallback: open mailto: (no backend configured) ── */
    const subject = encodeURIComponent(form.subject || 'Portfolio Enquiry');
    const body    = encodeURIComponent(
      `Hi Dhanraj,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setStatus('mailto');
  };

  const handleReset = () => {
    setForm(INIT);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setServerMsg('');
  };

  /* ── Input class helper ── */
  const inputCls = name =>
    `form-input${touched[name] && errors[name] ? ' form-input--error' : touched[name] && !errors[name] ? ' form-input--valid' : ''}`;

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Let's Connect</span>
          <h2 className="section-title" id="contact-title">Get In Touch</h2>
          <div className="section-divider" aria-hidden="true" />
        </div>

        <div className="contact__grid">

          {/* ══ LEFT: info + quick-action buttons ══ */}
          <div
            className="contact__info fade-in"
            ref={el => (itemRefs.current[0] = el)}
          >
            <p className="contact__intro">
              I'm open to internship opportunities, project collaborations, and
              conversations around AI, Data Science and technology.
              Feel free to reach out — I'd love to connect!
            </p>

            {/* Quick-action CTA buttons */}
            <div className="contact__cta-row">
              <a
                id="contact-email-btn"
                href={`mailto:${EMAIL}`}
                className="btn btn-primary contact__cta-btn"
                aria-label={`Email Dhanraj at ${EMAIL}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Me
              </a>

              <a
                id="contact-call-btn"
                href={TEL}
                className="btn btn-gold contact__cta-btn"
                aria-label={`Call Dhanraj at ${PHONE}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19 19.45 19.45 0 0 1 5 12.39 19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Me
              </a>
            </div>

            {/* Contact info cards */}
            {CONTACT_ITEMS.map(item => (
              <div
                key={item.label}
                className="glass-card contact-item"
                aria-label={`${item.label}: ${item.value}`}
              >
                <div className="contact-item__icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <p className="contact-item__label">{item.label}</p>
                  <p className="contact-item__value">
                    {item.href
                      ? <a href={item.href}>{item.value}</a>
                      : item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Formspree status notice */}
            <div className={`contact__service-notice ${FORMSPREE_URL ? 'contact__service-notice--live' : ''}`}>
              {FORMSPREE_URL ? (
                <>
                  <span className="contact__service-dot contact__service-dot--green" aria-hidden="true"/>
                  <span>Messages delivered via <strong>Formspree</strong></span>
                </>
              ) : (
                <>
                  <span className="contact__service-dot contact__service-dot--amber" aria-hidden="true"/>
                  <span>
                    Email delivery not configured.{' '}
                    <a
                      href="https://formspree.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Learn how to configure Formspree (opens in new tab)"
                    >
                      Set up Formspree
                    </a>{' '}
                    and add <code>VITE_FORMSPREE_ID</code> to your&nbsp;
                    <code>.env</code> file.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* ══ RIGHT: contact form ══ */}
          <div
            className="glass-card contact__form-card fade-in delay-2"
            ref={el => (itemRefs.current[1] = el)}
          >

            {/* ── Success state ── */}
            {status === 'success' && (
              <div className="contact__state-panel" role="alert" aria-live="polite">
                <div className="contact__state-icon contact__state-icon--success" aria-hidden="true">✅</div>
                <h3 className="contact__state-title">Message Sent!</h3>
                <p className="contact__state-body">
                  Thank you — your message has been delivered to{' '}
                  <strong>{EMAIL}</strong>. I'll get back to you soon.
                </p>
                <button className="btn btn-outline" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            )}

            {/* ── Mailto fallback state ── */}
            {status === 'mailto' && (
              <div className="contact__state-panel" role="alert" aria-live="polite">
                <div className="contact__state-icon contact__state-icon--info" aria-hidden="true">📨</div>
                <h3 className="contact__state-title">Email Client Opened</h3>
                <p className="contact__state-body">
                  Your default email client should have opened with the message
                  pre-filled. If it didn't, please email me directly at{' '}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
                <p className="contact__state-note">
                  <strong>Want real in-app delivery?</strong> Configure{' '}
                  <a href="https://formspree.io" target="_blank" rel="noopener noreferrer">
                    Formspree
                  </a>{' '}
                  — see the notice on the left.
                </p>
                <button className="btn btn-outline" onClick={handleReset}>
                  Go Back
                </button>
              </div>
            )}

            {/* ── Error state ── */}
            {status === 'error' && (
              <div className="contact__state-panel" role="alert" aria-live="polite">
                <div className="contact__state-icon contact__state-icon--error" aria-hidden="true">⚠️</div>
                <h3 className="contact__state-title">Submission Failed</h3>
                <p className="contact__state-body">{serverMsg}</p>
                <button className="btn btn-outline" onClick={handleReset}>
                  Try Again
                </button>
              </div>
            )}

            {/* ── Form (idle / submitting) ── */}
            {(status === 'idle' || status === 'submitting') && (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                aria-label="Contact form"
                noValidate
              >
                <h3 className="contact__form-title">Send Me a Message</h3>

                {/* Name */}
                <Field
                  id={mkId('name')}
                  label="Your Name"
                  error={errors.name}
                  touched={touched.name}
                >
                  <input
                    id={mkId('name')}
                    className={inputCls('name')}
                    type="text"
                    name="name"
                    placeholder="e.g. Ravi Kumar"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? `${mkId('name')}-error` : undefined}
                    autoComplete="name"
                    disabled={status === 'submitting'}
                  />
                </Field>

                {/* Email */}
                <Field
                  id={mkId('email')}
                  label="Your Email"
                  error={errors.email}
                  touched={touched.email}
                >
                  <input
                    id={mkId('email')}
                    className={inputCls('email')}
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? `${mkId('email')}-error` : undefined}
                    autoComplete="email"
                    disabled={status === 'submitting'}
                  />
                </Field>

                {/* Subject (optional) */}
                <Field id={mkId('subject')} label="Subject" optional>
                  <input
                    id={mkId('subject')}
                    className="form-input"
                    type="text"
                    name="subject"
                    placeholder="e.g. Internship Opportunity"
                    value={form.subject}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={status === 'submitting'}
                  />
                </Field>

                {/* Message */}
                <Field
                  id={mkId('message')}
                  label="Message"
                  error={errors.message}
                  touched={touched.message}
                >
                  <textarea
                    id={mkId('message')}
                    className={`form-textarea${touched.message && errors.message ? ' form-input--error' : touched.message && !errors.message ? ' form-input--valid' : ''}`}
                    name="message"
                    placeholder="Tell me about your project, opportunity or just say hi…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? `${mkId('message')}-error` : undefined}
                    disabled={status === 'submitting'}
                  />
                </Field>

                {/* Submit */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'submitting'}
                  aria-label={status === 'submitting' ? 'Sending message…' : 'Send message to Dhanraj'}
                >
                  {status === 'submitting' ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                {/* Honest delivery note */}
                <p className="contact__form-note">
                  {FORMSPREE_URL
                    ? '✅ Messages are delivered directly to my inbox via Formspree.'
                    : '⚠️ No email service configured — submitting will open your email client instead.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
