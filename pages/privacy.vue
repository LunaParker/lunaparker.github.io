<script setup lang="ts">
import { onMounted } from 'vue'

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl ?? 'https://shyowlstudios.com')

definePageMeta({ viewTransition: true })

useHead({
  title: 'Privacy Policy — Luna Parker',
})
useSeoMeta({
  description: 'Privacy policy for lunaparker.dev and shyowlstudios.com — what data we collect, who processes it, and how to reach us.',
  ogTitle: 'Privacy Policy — Luna Parker',
  ogDescription: 'Privacy policy for lunaparker.dev and shyowlstudios.com.',
  ogUrl: `${siteUrl}/privacy`,
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
})
</script>

<template>
  <article :style="{ minHeight: '100vh', padding: '120px 0 80px' }">
    <div class="container" :style="{ maxWidth: '760px' }">
      <div class="label section-kicker" :style="{ color: 'var(--on-surface-variant)', marginBottom: '20px' }">
        <span>Last updated April 28, 2026</span>
      </div>

      <h1 class="title">
        <span class="gradient">Privacy Policy</span>
      </h1>

      <div class="prose">
        <p>
          Hi there! Welcome to the privacy policy for Luna Parker's portfolio. We appreciate you taking the time to
          check out how we process and use your information. To get started: we're not in the data analytics business
          — we're a personal portfolio and consultancy — so you can rest assured we're not attempting to mine or sell
          your data. We only directly collect your information in order to respond to your contact inquiries.
        </p>
        <p>
          This site is operated by Luna Parker, trading as Shy Owl Studios. All references to "us", "we", and/or
          "the site" refer to this operation. The site is reachable at both <b>shyowlstudios.com</b> and
          <b>lunaparker.dev</b>; this policy applies to both.
        </p>
        <p>
          This page serves to inform you of our policies regarding the collection, use, and very limited disclosure
          of personal data when you visit the site, and the choices you have to limit or modify that data. Please
          note that this policy only applies to the interactions and data collection while you visit this website,
          and not when you contact us via alternative methods, such as email or phone, nor when we collect your
          information for billing or support purposes using alternative technologies or communication methods.
        </p>
        <p>
          If you have any questions regarding the use of your data or this policy, please reach out to us for assistance.
        </p>

        <h2>Personal data</h2>
        <p>
          While using this site, you may notice that there are sections that ask you to provide us with certain
          personally identifiable information that can be used to contact or identify you ("Personal Data"). Below is
          the specific information you might (or might have already) provided to us, and when it was collected:
        </p>
        <ul>
          <li><b>Your email address</b> — provided explicitly by you via a contact form.</li>
          <li><b>Your name</b> — provided explicitly by you via a contact form.</li>
          <li><b>Your intellectual property and ideas</b> — provided explicitly by you via a contact form.</li>
          <li>
            <b>Your IP address</b> — collected automatically by Cloudflare and forwarded to Cloudflare Turnstile when
            you submit the contact form, for the purpose of bot and abuse detection.
          </li>
        </ul>
        <p>
          As you can see, all data collected by us directly is only collected when you <i>explicitly</i> provide it,
          for the purposes of fulfilling and responding to your inquiry.
        </p>
        <p>
          Please note that the service providers we use may collect some information that we do not have access to,
          or which is anonymized such that we do not have access to any personally identifiable data about you. See
          the section below for more information.
        </p>

        <h2>Service provider data collection</h2>

        <h3>Cloudflare (Pages, Workers, Turnstile, DNS)</h3>
        <p>
          This site is hosted on Cloudflare Pages, served through Cloudflare's CDN, and uses Cloudflare DNS. The
          contact form is processed by a Cloudflare Worker. When you visit the site or submit the contact form,
          Cloudflare may log information about your visit, including your IP address, user-agent, and request
          metadata, in order to operate its services and protect against abuse.
        </p>
        <p>
          The contact form is also protected by Cloudflare Turnstile (a CAPTCHA replacement). When the form verifies
          that you are human, Turnstile may collect device and browser fingerprinting data and your IP address. Per
          Cloudflare's policy, Turnstile uses this data only for bot and abuse detection and does not use it for
          advertising.
        </p>
        <p>
          For more information regarding this data collection, please visit
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare's Privacy Policy</a>.
        </p>

        <h3>Discord</h3>
        <p>
          When you submit the contact form, the message contents (your name, email, and message), along with the IP
          address recorded by the Worker, are forwarded via a webhook to a private Discord channel that we monitor
          for inquiries. Discord stores these messages on its servers as part of normal operation. Please visit
          <a href="https://discord.com/privacy" target="_blank" rel="noreferrer">Discord's Privacy Policy</a> for more information.
        </p>

        <h2>Use of data</h2>
        <p>We use your collected personal information for various purposes:</p>
        <ul>
          <li>
            <b>To contact you regarding your inquiries</b> — when you provide your personal information using a
            contact form, we use that contact information to respond to your inquiry via the communication
            method(s) you provided.
          </li>
          <li>
            <b>To detect, prevent and address technical issues, spam, and abuse</b> — when a spammer or bad actor
            visits the site, we may block future access to protect the site and reduce spam.
          </li>
        </ul>

        <h2>Disclosure of data</h2>

        <h3>Legal requirements</h3>
        <p>
          We may disclose your Personal Data in the good faith belief that such action is necessary to comply with
          a legal obligation, to protect or defend our rights or reputation, to protect the safety of the public,
          or to protect against legal liability. We will only do this when, in good faith, we believe someone may
          be in danger, or when we feel that we are at significant risk or liability for the content you posted.
        </p>

        <h3>For processing and storage</h3>
        <p>
          As mentioned above, this site uses Cloudflare Workers to process contact form submissions, Cloudflare
          Turnstile to verify those submissions are not from bots, and a Discord webhook to deliver the message
          to a private channel we monitor. As a result, your message contents (and your IP address, in the case
          of Turnstile and Discord) may be retained by Cloudflare and Discord for record-keeping and operational
          purposes.
        </p>

        <h2>Links to other sites</h2>
        <p>
          This site may contain links to other sites that are not operated by us. If you click on a third-party
          link, you will be directed to that third party's site. We strongly advise that you review the privacy
          policy of any third-party sites linked to.
        </p>
        <p>
          We have no control over and assume no responsibility for the content, privacy policies, or practices of
          any third-party sites or services.
        </p>

        <h2>Children's data collection</h2>
        <p>
          We do not knowingly store the information of children. If you believe we are storing the information of
          a child, please contact us.
        </p>

        <h2>Changes to this privacy policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes are effective when they are posted on this page.
        </p>

        <h2>Contact us</h2>
        <p>
          We hope this page was helpful in providing information about the privacy practices we use while you're
          visiting the site.
        </p>
        <p>
          If you have any questions about this privacy policy, please feel free to
          <NuxtLink to="/#contact">get in touch</NuxtLink>.
        </p>
      </div>

      <div :style="{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid var(--outline-variant)' }">
        <NuxtLink to="/" class="btn btn-outlined">
          <UiIcon name="chev" :size="16" :style="{ transform: 'rotate(180deg)' }" /> Back to portfolio
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 0.92;
  margin: 0 0 48px;
}
.gradient {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.prose {
  font-size: 1.075rem;
  line-height: 1.7;
  color: var(--on-surface);

  p {
    margin: 0 0 20px;
    color: var(--on-surface-variant);
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    margin: 56px 0 18px;
    color: var(--on-surface);
  }

  h3 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    margin: 32px 0 12px;
    color: var(--primary-text);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    display: grid;
    gap: 14px;
  }

  li {
    position: relative;
    padding-left: 19px;
    color: var(--on-surface-variant);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--primary);
    }
  }

  b { color: var(--on-surface); font-weight: 600; }
  i { color: var(--on-surface); }

  a {
    color: var(--primary);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity var(--dur-short);
  }
  a:hover { opacity: 0.75; }
}
</style>
