const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';

/* --------------------------------------------------------------- buttons */
const BTNS = [
  ['.btn-filled', 'Primary action', 'Accent fill. On hover it flips to the neutral --on-surface with a soft ring, rather than darkening.'],
  ['.btn-tonal', 'Secondary action', 'Secondary container. No hover change — it is a resting affordance.'],
  ['.btn-outlined', 'Tertiary action', 'Hairline --outline. Inverts to a solid neutral fill on hover.'],
  ['.btn-brand', 'Neutral emphasis', 'Neutral at rest, accent on hover. Built from --on-surface / --surface, so it inverts with the theme.'],
  ['.btn-gradient', 'Studio CTA', 'Cross-fades to --brand-gradient-135 on a ::before. The /shy-owl page only.'],
];

const buttons = {
  group: 'Components',
  name: 'Buttons',
  subtitle: 'Six variants, all fully round, rest + hover',
  path: 'components/buttons.html',
  width: 1240, height: 1830,
  desc: 'Every button is a full pill — the variants separate on fill, not on radius. Hover is a colour inversion rather than a tint, and press is a uniform <code>scale(0.96)</code> on <code>--spring-fast</code>, so the whole set feels like one control.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Variants</h2>
      <div class="ds-stack" style="gap: 18px;">
        ${BTNS.map(([cls, label, note]) => `
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">${cls}</div>
          <div class="ds-states">
            <span class="ds-states__tag">rest</span>
            <button class="btn ${cls.slice(1)}">${label}</button>
            <span class="ds-states__tag">hover</span>
            <span class="ds-hover"><button class="btn ${cls.slice(1)}">${label}</button></span>
          </div>
          <p class="ds-cap" style="margin-top: 8px;">${note}</p>
        </div>`).join('')}
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">.btn-text</div>
          <div class="ds-row"><button class="btn btn-text">Read the case study</button></div>
          <p class="ds-cap" style="margin-top: 8px;">Uses --primary-text and tighter padding. The only variant that is not a filled shape.</p>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">With an icon</h2>
      <div class="ds-row">
        <button class="btn btn-filled">View project ${ARROW}</button>
        <button class="btn btn-outlined">GitHub ${ARROW}</button>
      </div>
      <p class="ds-cap">Icons sit in the 0.6rem flex gap at 14px. The label always names what happens, so the icon is confirmation rather than the message.</p>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">On dark</h2>
      <div class="ds-pane" data-theme="dark">
        <div class="ds-pane__tag">dark</div>
        <div class="ds-row">
          <button class="btn btn-filled">Primary action</button>
          <button class="btn btn-tonal">Secondary</button>
          <button class="btn btn-outlined">Tertiary</button>
          <button class="btn btn-brand">Neutral emphasis</button>
          <button class="btn btn-gradient">Studio CTA</button>
        </div>
        <p class="ds-note">--btn-brand inverts automatically: white fill on dark, black on light.</p>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Geometry</h2>
      <div class="ds-row">
        ${[['padding', '0.85rem 1.5rem'], ['radius', '--shape-full'], ['weight', '600'], ['size', '0.95rem'], ['tracking', '-0.005em'], ['press', 'scale(0.96)']].map(([k, v]) => `
        <div class="card card-outlined" style="padding: 12px 16px; border-radius: var(--shape-md);">
          <div class="ds-spec">${k}</div>
          <div style="font-family: var(--font-mono); font-size: 13px; color: var(--on-surface); margin-top: 2px;">${v}</div>
        </div>`).join('')}
      </div>
    </div>`,
};

/* ---------------------------------------------------------------- fields */
const fields = {
  group: 'Components',
  name: 'Form fields',
  subtitle: 'M3 filled field — label swaps typeface on float',
  path: 'components/fields.html',
  width: 1240, height: 1256,
  desc: 'A filled Material 3 field on <code>--surface-container-high</code> with a 16px radius and no underline. The distinctive part is the float: the label does not merely shrink, it changes family, from 15px body sans to 11px mono uppercase, and the border picks up the accent. Selects keep the label floated permanently, because the closed control already shows its placeholder text.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">States</h2>
      <div class="ds-split">
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">rest — label at 15px body sans</div>
          <label class="m3-field">
            <span class="m3-field__label">Your name</span>
            <input class="m3-field__input" type="text" value="">
          </label>
        </div>
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">focused + filled — label at 11px mono</div>
          <label class="m3-field m3-field--active m3-field--focused">
            <span class="m3-field__label">Your name</span>
            <input class="m3-field__input" type="text" value="Luna Parker">
          </label>
        </div>
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">filled, not focused</div>
          <label class="m3-field m3-field--active">
            <span class="m3-field__label">Email</span>
            <input class="m3-field__input" type="email" value="luna@lunaparker.dev">
          </label>
        </div>
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">select — label always floated</div>
          <label class="m3-field m3-field--active m3-field--select">
            <span class="m3-field__label">Project type</span>
            <select class="m3-field__input m3-field__input--select">
              <option>Website or web app</option>
              <option>Custom software</option>
              <option>Consultation</option>
            </select>
          </label>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Multiline</h2>
      <label class="m3-field m3-field--active" style="max-width: 640px;">
        <span class="m3-field__label">What are you building?</span>
        <textarea class="m3-field__input m3-field__input--multiline" rows="4">A booking system for a clinic with three locations. Needs to talk to their existing billing software.</textarea>
      </label>
      <p class="ds-cap">Five rows by default, <code>resize: vertical</code> only — horizontal resize would break the form grid.</p>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">On dark</h2>
      <div class="ds-pane" data-theme="dark">
        <div class="ds-pane__tag">dark</div>
        <div class="ds-split">
          <label class="m3-field">
            <span class="m3-field__label">Your name</span>
            <input class="m3-field__input" type="text" value="">
          </label>
          <label class="m3-field m3-field--active m3-field--focused">
            <span class="m3-field__label">Email</span>
            <input class="m3-field__input" type="email" value="luna@lunaparker.dev">
          </label>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Anatomy</h2>
      <div class="ds-row">
        ${[['fill', '--surface-container-high'], ['radius', '16px'], ['border rest', '--outline-variant'], ['border focus', '--primary'], ['label rest', '15px body / 400'], ['label float', '11px mono / 600 / 0.06em'], ['label colour', '--primary-text on focus'], ['chevron', 'two linear-gradients, 5×5px']].map(([k, v]) => `
        <div class="card card-outlined" style="padding: 12px 16px; border-radius: var(--shape-md);">
          <div class="ds-spec">${k}</div>
          <div style="font-family: var(--font-mono); font-size: 12px; color: var(--on-surface); margin-top: 2px;">${v}</div>
        </div>`).join('')}
      </div>
      <p class="ds-cap">The select chevron is drawn from two overlapping linear-gradients — no icon font, no SVG request, and it recolours with <code>--on-surface-variant</code>.</p>
    </div>`,
};

/* ----------------------------------------------------------------- chips */
const chips = {
  group: 'Components',
  name: 'Chips',
  subtitle: 'Four fills at 8px radius',
  path: 'components/chips.html',
  width: 1240, height: 810,
  desc: 'Chips are the one component that stays nearly square, at <code>--shape-sm</code>. That is deliberate: it keeps a dense row of technology tags from reading as a row of buttons.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Variants</h2>
      <div class="ds-stack" style="gap: 16px;">
        ${[['.chip', 'Default — container fill, hairline border', ['Laravel', 'WordPress', 'Nuxt']], ['.chip-tonal', 'Tonal — 10% of --on-surface, no border', ['TypeScript', 'Python', 'C#']], ['.chip-primary', 'Primary — accent container', ['Cloudflare Workers', 'Vue 3']], ['.chip-linked', 'Linked — resolves to a project, so it takes a tint and a help cursor', ['Stylus', 'Vite']]].map(([cls, note, items]) => `
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">${cls}</div>
          <div class="ds-row">${items.map((i) => `<span class="chip ${cls.slice(1) === 'chip' ? '' : cls.slice(1)}">${i}</span>`).join('')}</div>
          <p class="ds-cap" style="margin-top: 6px;">${note}</p>
        </div>`).join('')}
      </div>
    </div>
    <div class="ds-block">
      <h2 class="ds-block__name">On dark</h2>
      <div class="ds-pane" data-theme="dark">
        <div class="ds-pane__tag">dark</div>
        <div class="ds-row">
          <span class="chip">Laravel</span>
          <span class="chip chip-tonal">TypeScript</span>
          <span class="chip chip-primary">Cloudflare Workers</span>
          <span class="chip chip-linked">Stylus</span>
        </div>
      </div>
    </div>`,
};

/* ----------------------------------------------------------------- cards */
const PHOTO = 'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)';

const TILE = `
          <a class="project-card" style="aspect-ratio: 16/10;">
            <div style="position:absolute; inset:0; background: ${PHOTO}; opacity: 0.9;"></div>
            <div class="project-card__icon-bubble">${ARROW}</div>
            <div class="project-card__overlay">
              <div class="project-card__overlay-row">
                <div class="project-card__overlay-text">
                  <div class="project-card__overlay-tagline">EYOLF — quote and equipment portal</div>
                  <div class="project-card__overlay-meta">
                    <span class="project-card__overlay-meta-label">Lead developer</span>
                    <span class="project-card__overlay-meta-divider">·</span>
                    <span class="project-card__overlay-meta-url">eyolf.ca</span>
                  </div>
                </div>
                <div class="project-card__overlay-cta">${ARROW}</div>
              </div>
            </div>
          </a>`;

const cards = {
  group: 'Components',
  name: 'Cards',
  subtitle: 'Content card, outlined card, media tile with overlay',
  path: 'components/cards.html',
  width: 1240, height: 1335,
  desc: 'Two resting treatments — a filled container card and a hairline outlined one — plus the media tile used for project work. The tile lifts 6px and swaps its border to the accent on hover, while a blurred overlay slides up over the image; the corner bubble fades out as the overlay arrives, so only one affordance is ever visible.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Content cards</h2>
      <div class="ds-split">
        <div class="card">
          <div class="label" style="color: var(--on-surface-variant); margin-bottom: 12px;">.card</div>
          <div class="title" style="margin-bottom: 8px;">Build.</div>
          <p class="body" style="color: var(--on-surface-variant);">High-performance websites and web applications using modern frameworks and battle-tested platforms.</p>
        </div>
        <div class="card card-outlined">
          <div class="label" style="color: var(--on-surface-variant); margin-bottom: 12px;">.card-outlined</div>
          <div class="title" style="margin-bottom: 8px;">Consult.</div>
          <p class="body" style="color: var(--on-surface-variant);">Direct collaboration with clients to identify requirements, recommend stacks, and manage timelines.</p>
        </div>
      </div>
      <p class="ds-cap"><strong>--shape-xl</strong> (28px), 1.75rem padding, no shadow at rest. The filled card sits on --surface-container; the outlined card is transparent with an --outline-variant hairline.</p>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Media tile — rest / hover</h2>
      <div class="ds-split">
        <div>
          <div class="ds-spec" style="margin-bottom: 8px;">rest</div>
          ${TILE}
        </div>
        <div class="ds-hover">
          <div class="ds-spec" style="margin-bottom: 8px;">hover</div>
          ${TILE}
        </div>
      </div>
      <p class="ds-cap">The overlay is <code>color-mix(in oklch, #000 72%, transparent)</code> with a 12px backdrop blur, so it stays legible over any image without needing a gradient scrim baked into the asset.</p>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">On dark</h2>
      <div class="ds-pane" data-theme="dark">
        <div class="ds-pane__tag">dark</div>
        <div class="ds-split">
          <div class="card">
            <div class="title" style="margin-bottom: 8px;">Design.</div>
            <p class="body" style="color: var(--on-surface-variant);">User-friendly interfaces that align with an organization's brand and help them accomplish their goals.</p>
          </div>
          <div class="card card-outlined">
            <div class="title" style="margin-bottom: 8px;">Solve.</div>
            <p class="body" style="color: var(--on-surface-variant);">Custom software — from inventory systems to secure client portals — that makes businesses more productive.</p>
          </div>
        </div>
      </div>
    </div>`,
};

/* ------------------------------------------------------------ navigation */
const NAV_LINKS = ['About', 'Experience', 'Projects', 'Contact'];
const navMarkup = (scrolled) => `
<div class="nav ${scrolled ? 'nav--scrolled' : ''}" style="position: relative;">
  <div class="nav__container" style="padding: 0 24px;">
    <a class="nav__brand-text">Luna Parker</a>
    <ul class="nav__menu">
      ${NAV_LINKS.map((l, i) => `<li><a class="nav__link ${i === 2 ? 'nav__link--active' : ''}">${l}</a></li>`).join('')}
    </ul>
    <div style="display:flex; align-items:center; gap:10px;">
      <button class="btn btn-brand nav__cta">Start a project</button>
    </div>
  </div>
</div>`;

const navigation = {
  group: 'Components',
  name: 'Navigation',
  subtitle: 'Transparent → scrolled, links, mobile panel',
  path: 'components/navigation.html',
  width: 1280, height: 1141,
  desc: 'The bar starts fully transparent over the hero and earns its surface on scroll: padding tightens from 18px to 10px, a 78%-opacity backdrop with a saturating 14px blur fades in, and a hairline appears beneath. Links are pills that fill with <code>--surface-container-high</code> rather than changing colour.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">At rest — over the hero</h2>
      <div style="border-radius: var(--shape-xl); overflow: hidden; border: 1px solid var(--outline-variant);">
        <div style="background: var(--surface); padding-bottom: 28px;">
          ${navMarkup(false)}
          <div style="padding: 10px 24px 0;">
            <div class="display-sm" style="max-width: 18ch;">I build the whole thing end-to-end.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Scrolled — .nav--scrolled</h2>
      <div style="border-radius: var(--shape-xl); overflow: hidden; border: 1px solid var(--outline-variant); position: relative;">
        <div style="background: var(--surface);">
          <div style="position:absolute; inset:0; background: ${PHOTO}; opacity: 0.22;"></div>
          <div style="position: relative;">${navMarkup(true)}</div>
          <div style="padding: 18px 24px 28px; position: relative;">
            <p class="body" style="color: var(--on-surface-variant); max-width: 60ch;">Content passes beneath the blur. The tinted band behind this bar is a stand-in for page content, so the saturate(1.3) is visible.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Mobile panel</h2>
      <div class="ds-row ds-row--top">
        <!-- The real panel is position:absolute beneath the fixed bar, so the
             specimen needs a positioned box to sit inside. -->
        <div style="position: relative; width: 320px; height: 236px; flex: 0 0 auto;">
          <div class="nav__mobile-panel" style="top: 0; left: 0; right: 0; margin-top: 0;">
            <ul style="list-style:none; padding:0; margin:0; display:grid; gap:2px;">
              ${NAV_LINKS.map((l) => `<li><a class="nav__mobile-link">${l}</a></li>`).join('')}
            </ul>
          </div>
        </div>
        <p class="ds-cap" style="flex: 1; min-width: 240px;">Below 860px the menu collapses behind a toggle. The panel uses a 20px radius and 12px radius links — one step down from the desktop pill, because a stacked list of pills reads as buttons.</p>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">On dark</h2>
      <div class="ds-pane" data-theme="dark" style="padding: 0; overflow: hidden;">
        ${navMarkup(true)}
      </div>
    </div>`,
};

/* -------------------------------------------------------- section header */
const sectionHeader = {
  group: 'Patterns',
  name: 'Section header',
  subtitle: 'Gradient dot, numbered kicker, display title, action',
  path: 'patterns/section-header.html',
  width: 1280, height: 1388,
  desc: 'The repeating unit that opens every section of the site. A 12px brand-gradient dot leads a mono kicker, which is numbered because the sections genuinely are a sequence; the title is <code>.display-md</code> capped at 62 characters, and an optional action sits on the same baseline at the far right.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Full — kicker, title, sub, action</h2>
      <div class="ds-pane">
        <div class="section-header" style="margin-bottom: 0;">
          <div style="max-width: 62ch;">
            <div class="label section-kicker" style="color: var(--on-surface-variant); margin-bottom: 18px;"><span>03 — Projects</span></div>
            <h2 class="display-md" style="margin-bottom: 16px;">Selected work from the last few years.</h2>
            <p class="body-lg" style="color: var(--on-surface-variant); max-width: 58ch;">Client sites, internal tools, and a few things built purely because the problem was interesting.</p>
          </div>
          <div><button class="btn btn-outlined">All projects</button></div>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Minimal — kicker and title only</h2>
      <div class="ds-pane">
        <div class="section-header" style="margin-bottom: 0;">
          <div style="max-width: 62ch;">
            <div class="label section-kicker" style="color: var(--on-surface-variant); margin-bottom: 18px;"><span>01 — About</span></div>
            <h2 class="display-md">I build the whole thing end-to-end.</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">On dark</h2>
      <div class="ds-pane" data-theme="dark">
        <div class="section-header" style="margin-bottom: 0;">
          <div style="max-width: 62ch;">
            <div class="label section-kicker" style="color: var(--on-surface-variant); margin-bottom: 18px;"><span>04 — Field notes</span></div>
            <h2 class="display-md">Writing about the work.</h2>
          </div>
          <div><button class="btn btn-text">All posts</button></div>
        </div>
      </div>
      <p class="ds-cap">The gradient dot is fixed hex, so it is the one element that looks identical in both palettes — which is what makes it read as the brand mark.</p>
    </div>`,
};

export const components = [buttons, fields, chips, cards, navigation, sectionHeader];
