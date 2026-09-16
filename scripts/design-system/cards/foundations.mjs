import { oklch, contrast } from '../lib/oklch.mjs';

const H = 265, C = 0.19; // indigo — the shipped accent

const hexOf = (L, c, h) => oklch(L, c, h);

// name, css expression, L, C, H, foreground var for the chip label
const LIGHT = [
  ['--primary',               'oklch(0.50 var(--accent-c) var(--accent-h))',            0.50, C,     H,      'var(--on-primary)'],
  ['--primary-container',     'oklch(0.92 0.05 var(--accent-h))',                       0.92, 0.05,  H,      'var(--on-primary-container)'],
  ['--secondary',             'oklch(0.50 0.10 calc(var(--accent-h) + 60))',            0.50, 0.10,  H + 60, 'var(--on-secondary)'],
  ['--secondary-container',   'oklch(0.92 0.04 calc(var(--accent-h) + 60))',            0.92, 0.04,  H + 60, 'var(--on-secondary-container)'],
  ['--tertiary',              'oklch(0.55 0.11 calc(var(--accent-h) - 50))',            0.55, 0.11,  H - 50, 'var(--on-tertiary)'],
  ['--tertiary-container',    'oklch(0.92 0.045 calc(var(--accent-h) - 50))',           0.92, 0.045, H - 50, 'var(--on-tertiary-container)'],
  ['--error',                 'oklch(0.56 0.19 27)',                                    0.56, 0.19,  27,     'var(--on-error)'],
  ['--outline',               'oklch(0.55 0 0)',                                        0.55, 0,     0,      '#fff'],
];

const DARK = [
  ['--primary',               'oklch(0.55 calc(var(--accent-c) + 0.06) var(--accent-h))', 0.55, C + 0.06, H,      'var(--on-primary)'],
  ['--primary-container',     'oklch(0.35 0.12 var(--accent-h))',                         0.35, 0.12,    H,      'var(--on-primary-container)'],
  ['--secondary',             'oklch(0.82 0.08 calc(var(--accent-h) + 60))',              0.82, 0.08,    H + 60, 'var(--on-secondary)'],
  ['--secondary-container',   'oklch(0.35 0.08 calc(var(--accent-h) + 60))',              0.35, 0.08,    H + 60, 'var(--on-secondary-container)'],
  ['--tertiary',              'oklch(0.82 0.09 calc(var(--accent-h) - 50))',              0.82, 0.09,    H - 50, 'var(--on-tertiary)'],
  ['--tertiary-container',    'oklch(0.37 0.10 calc(var(--accent-h) - 50))',              0.37, 0.10,    H - 50, 'var(--on-tertiary-container)'],
  ['--error',                 'oklch(0.78 0.16 27)',                                      0.78, 0.16,    27,     'var(--on-error)'],
  ['--outline',               'oklch(0.58 0 0)',                                          0.58, 0,       0,      '#000'],
];

const sw = ([name, expr, L, c, h, fg]) => {
  const { hex, mapped } = hexOf(L, c, h);
  return `<div class="ds-sw">
  <div class="ds-sw__chip" style="background: var(${name}); color: ${fg};">${hex}${mapped ? '&thinsp;*' : ''}</div>
  <div class="ds-sw__meta">
    <div class="ds-sw__var">${name}</div>
    <div class="ds-sw__val">${expr}</div>
  </div>
</div>`;
};

const swGrid = (rows) => `<div class="ds-grid" style="grid-template-columns: repeat(2, minmax(0,1fr));">${rows.map(sw).join('')}</div>`;

/* ---------------------------------------------------------------- colour */
const color = {
  group: 'Foundations',
  name: 'Colour roles',
  subtitle: 'M3 tonal palette, light + dark, derived from two variables',
  path: 'foundations/colour.html',
  width: 1240, height: 1591,
  desc: 'Every colour role is computed in OKLCH from <code>--accent-h</code> and <code>--accent-c</code>. Secondary sits 60° clockwise of the source hue, tertiary 50° counter-clockwise, and the dark palette lifts lightness rather than swapping hue. Surfaces are deliberately excluded: they stay pure neutral so colour only ever means emphasis.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Source</h2>
      <div class="ds-row">
        <div class="card" style="padding: 18px 22px; border-radius: var(--shape-lg);">
          <div class="ds-spec">--accent-h</div>
          <div style="font-family: var(--font-display); font-size: 32px; font-weight: 700; letter-spacing: -0.03em;">265</div>
        </div>
        <div class="card" style="padding: 18px 22px; border-radius: var(--shape-lg);">
          <div class="ds-spec">--accent-c</div>
          <div style="font-family: var(--font-display); font-size: 32px; font-weight: 700; letter-spacing: -0.03em;">0.19</div>
        </div>
        <p class="ds-cap" style="margin: 0;">Change these two lines and every role below follows, in both palettes. <strong>Nothing else in the system hard-codes a colour</strong> except the brand gradient.</p>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Roles</h2>
      <div class="ds-split">
        <div class="ds-pane" data-theme="light">
          <div class="ds-pane__tag">Light</div>
          ${swGrid(LIGHT)}
        </div>
        <div class="ds-pane" data-theme="dark">
          <div class="ds-pane__tag">Dark</div>
          ${swGrid(DARK)}
        </div>
      </div>
      <p class="ds-note">* chroma-mapped into sRGB. The OKLCH expression is canonical; the hex is a reference only.</p>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Text-safe accent</h2>
      <div class="ds-split">
        <div class="ds-pane" data-theme="light">
          <div class="ds-pane__tag">Light</div>
          <p style="color: var(--primary-text); font-size: 17px; font-weight: 600;">Accent-coloured text uses --primary-text</p>
          <p class="ds-note">Identical to --primary in light. Contrast on --surface: ${contrast(hexOf(0.50, C, H).hex, '#FFFFFF').toFixed(1)}:1</p>
        </div>
        <div class="ds-pane" data-theme="dark">
          <div class="ds-pane__tag">Dark</div>
          <p style="color: var(--primary-text); font-size: 17px; font-weight: 600;">Accent-coloured text uses --primary-text</p>
          <p class="ds-note">Lifts to L 0.86 in dark. Contrast on --surface: ${contrast(hexOf(0.86, C, H).hex, oklch(0.11, 0, 0).hex).toFixed(1)}:1</p>
        </div>
      </div>
      <p class="ds-cap">Use <strong>--primary</strong> for fills, where the surface does the contrast work, and <strong>--primary-text</strong> for type, where it cannot.</p>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Accent presets</h2>
      <div class="ds-row">
        ${[['(default)', 'Indigo — lunaparker.dev', 265, 0.19], ['shy-owl', 'Magenta — /shy-owl studio page', 333, 0.17], ['cyan', 'Cyan — base system default', 195, 0.14]].map(([attr, label, h, c]) => `
        <div class="ds-sw" style="flex: 1; min-width: 190px;">
          <div class="ds-sw__chip" style="background: ${hexOf(0.50, c, h).hex}; color: #fff;">${hexOf(0.50, c, h).hex}</div>
          <div class="ds-sw__meta">
            <div class="ds-sw__var">data-accent="${attr}"</div>
            <div class="ds-sw__val">${label}<br>h ${h} · c ${c}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>`,
};

/* -------------------------------------------------------------- gradient */
const gradient = {
  group: 'Foundations',
  name: 'Brand gradient',
  subtitle: 'Plum → rose → amber, three angles, fixed hex',
  path: 'foundations/gradient.html',
  width: 1240, height: 1111,
  desc: 'The Shy Owl signature, and the one part of the system that never re-derives from the accent. It is rationed: a 12px dot beside a section kicker, occasional display type, and the studio button on hover. Used as a background wash it would flatten the neutral surfaces everything else depends on.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Stops</h2>
      <div class="ds-row">
        ${[['--brand-plum', '#8A2387', '0%'], ['--brand-rose', '#E94057', '50%'], ['--brand-amber', '#F27121', '100%']].map(([v, hex, pos]) => `
        <div class="ds-sw" style="flex: 1; min-width: 170px;">
          <div class="ds-sw__chip" style="background: ${hex}; color: #fff;">${hex}</div>
          <div class="ds-sw__meta"><div class="ds-sw__var">${v}</div><div class="ds-sw__val">stop ${pos}</div></div>
        </div>`).join('')}
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Angles</h2>
      <div class="ds-row ds-row--top" style="gap: 16px;">
        <div style="flex: 1; min-width: 280px;">
          ${[['--brand-gradient', '90deg', 'var(--brand-gradient)'], ['--brand-gradient-135', '135deg', 'var(--brand-gradient-135)']].map(([v, deg, bg]) => `
          <div style="margin-bottom: 14px;">
            <div style="height: 72px; border-radius: var(--shape-lg); background: ${bg};"></div>
            <div class="ds-spec" style="margin-top: 6px;">${v} &nbsp;·&nbsp; ${deg}</div>
          </div>`).join('')}
        </div>
        <div style="width: 150px; flex: 0 0 auto;">
          <div style="height: 158px; border-radius: var(--shape-lg); background: var(--brand-gradient-v);"></div>
          <div class="ds-spec" style="margin-top: 6px;">--brand-gradient-v &nbsp;·&nbsp; 180deg</div>
        </div>
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Applied</h2>
      <div class="ds-split">
        <div class="ds-pane">
          <div class="ds-pane__tag">.gradient-text</div>
          <div class="display-sm gradient-text">End-to-end</div>
          <p class="ds-note">background-clip: text. Reserve for one phrase, never a paragraph.</p>
        </div>
        <div class="ds-pane">
          <div class="ds-pane__tag">.section-kicker::before</div>
          <div class="label section-kicker" style="color: var(--on-surface-variant);"><span>03 — Projects</span></div>
          <p class="ds-note">A 12px dot. This is how a section announces itself.</p>
        </div>
        <div class="ds-pane">
          <div class="ds-pane__tag">.btn-gradient — rest / hover</div>
          <div class="ds-row">
            <button class="btn btn-gradient">Start a project</button>
            <span class="ds-hover"><button class="btn btn-gradient">Start a project</button></span>
          </div>
          <p class="ds-note">Neutral at rest; the gradient cross-fades in on a ::before.</p>
        </div>
        <div class="ds-pane">
          <div class="ds-pane__tag">.gradient-fill</div>
          <div class="gradient-fill" style="border-radius: var(--shape-lg); padding: 18px 20px; font-weight: 600;">Solid gradient fill</div>
          <p class="ds-note">Always with white type. Nothing else clears all three stops.</p>
        </div>
      </div>
    </div>`,
};

/* ------------------------------------------------------------ typography */
const TYPE = [
  ['.display-xl', 'clamp(4rem, 14vw, 14rem)', '800', '-0.05em', '0.88', 'Luna', 'display'],
  ['.display-lg', 'clamp(3rem, 9vw, 8rem)', '800', '-0.04em', '0.92', 'Selected work', 'display'],
  ['.display-md', 'clamp(2.25rem, 5.5vw, 4.5rem)', '700', '-0.03em', '0.98', 'I build the whole thing end-to-end', 'display'],
  ['.display-sm', 'clamp(1.75rem, 3.5vw, 3rem)', '700', '-0.025em', '1.05', 'From client kickoff to deployed code', 'display'],
  ['.headline', 'clamp(1.5rem, 2.6vw, 2.25rem)', '600', '-0.015em', '1.15', 'Laravel and WordPress, and whatever else the problem calls for', 'display'],
  ['.title', 'clamp(1.125rem, 1.6vw, 1.4rem)', '600', '-0.01em', '1.3', 'Shy Owl Studios', 'display'],
];

const typography = {
  group: 'Foundations',
  name: 'Type scale',
  subtitle: 'Plus Jakarta Sans / Roboto Flex / JetBrains Mono, 10 steps',
  path: 'foundations/typography.html',
  width: 1240, height: 1430,
  desc: 'Three families with fixed jobs. Display sizes are fluid between a phone and a wide desktop, and tighten their tracking as they grow — by <code>.display-xl</code> the letter-spacing is −0.05em and the leading has dropped below 1. Body text holds a 1.55–1.6 line-height and stays under about 65 characters a line.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Families</h2>
      <div class="ds-row ds-row--top">
        ${[['--font-display', 'Plus Jakarta Sans', 'var(--font-display)', 'Headings and display. 300–800.'], ['--font-body', 'Roboto Flex', 'var(--font-body)', 'Body, UI, form input. 300–700.'], ['--font-mono', 'JetBrains Mono', 'var(--font-mono)', 'Labels, kickers, floated field labels, data. 400–600.']].map(([v, n, f, role]) => `
        <div class="card card-outlined" style="flex: 1; min-width: 240px; padding: 20px; border-radius: var(--shape-lg);">
          <div style="font-family: ${f}; font-size: 30px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.15;">${n}</div>
          <div class="ds-spec" style="margin-top: 10px;">${v}</div>
          <p class="ds-cap" style="margin-top: 6px;">${role}</p>
        </div>`).join('')}
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Scale</h2>
      <div class="ds-stack" style="gap: 22px;">
        ${TYPE.map(([cls, size, w, ls, lh, text]) => `
        <div>
          <div class="ds-spec">${cls} &nbsp;·&nbsp; ${size} &nbsp;·&nbsp; ${w} &nbsp;·&nbsp; ls ${ls} &nbsp;·&nbsp; lh ${lh}</div>
          <div class="${cls.slice(1)}" style="margin-top: 4px;">${text}</div>
        </div>`).join('')}
        <div>
          <div class="ds-spec">.body-lg &nbsp;·&nbsp; 1.125rem &nbsp;·&nbsp; lh 1.55</div>
          <p class="body-lg" style="margin-top: 4px; max-width: 62ch;">I'm a full-stack developer; I've been building for the web since high school. Through my own consultancy, <b>Shy Owl Studios</b>, I've delivered dozens of websites and web applications.</p>
        </div>
        <div>
          <div class="ds-spec">.body &nbsp;·&nbsp; 1rem &nbsp;·&nbsp; lh 1.6</div>
          <p class="body" style="margin-top: 4px; max-width: 65ch; color: var(--on-surface-variant);">I specialise in Laravel and WordPress (and, in practice, whatever else the problem calls for). After all, the right tool is rarely the trendiest one.</p>
        </div>
        <div>
          <div class="ds-spec">.label &nbsp;·&nbsp; 0.75rem &nbsp;·&nbsp; 500 &nbsp;·&nbsp; ls 0.08em &nbsp;·&nbsp; mono, uppercase</div>
          <div class="label" style="margin-top: 4px; color: var(--on-surface-variant);">01 — About</div>
        </div>
      </div>
    </div>`,
};

/* ----------------------------------------------------------------- shape */
const SHAPES = [
  ['--shape-xs', '4px', 'Focus-ring rounding only'],
  ['--shape-sm', '8px', 'Chips'],
  ['--shape-md', '12px', 'Mobile nav links'],
  ['--shape-lg', '16px', 'Form fields, small panels'],
  ['--shape-xl', '28px', 'Cards, project tiles'],
  ['--shape-2xl', '36px', 'Large feature panels'],
  ['--shape-full', '9999px', 'Every button, nav link, skip link'],
];

const shape = {
  group: 'Foundations',
  name: 'Shape scale',
  subtitle: '4 / 8 / 12 / 16 / 28 / 36 / full',
  path: 'foundations/shape.html',
  width: 1240, height: 566,
  desc: 'Radius encodes what a thing is, so a component picks one step and keeps it. The jump from 8px chips to 28px cards to fully round buttons is doing the work that a border or a shadow would otherwise have to do — which is why almost nothing in the system carries a shadow at rest.',
  body: `
    <div class="ds-block">
      <div class="ds-row ds-row--top">
        ${SHAPES.map(([v, px, use]) => `
        <div style="flex: 1; min-width: 150px;">
          <div style="height: 96px; border-radius: ${px}; background: var(--surface-container-high); border: 1px solid var(--outline-variant);"></div>
          <div class="ds-spec" style="margin-top: 8px;">${v}</div>
          <div class="ds-spec" style="color: var(--on-surface);">${px}</div>
          <p class="ds-cap" style="margin-top: 4px; font-size: 11.5px;">${use}</p>
        </div>`).join('')}
      </div>
    </div>
    <div class="ds-block">
      <h2 class="ds-block__name">In practice</h2>
      <div class="ds-row">
        <button class="btn btn-filled">--shape-full</button>
        <span class="chip">--shape-sm</span>
        <div class="card" style="padding: 16px 20px; font-weight: 600; font-size: 14px;">--shape-xl</div>
        <div style="background: var(--surface-container-high); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 16px 20px; font-weight: 600; font-size: 14px;">--shape-lg</div>
      </div>
    </div>`,
};

/* -------------------------------------------------------------- surfaces */
const LADDER = [
  ['--surface-container-lowest', 'surf-lowest', 'oklch(1 0 0)', 'oklch(0.06 0 0)'],
  ['--surface-container-low', 'surf-low', 'oklch(0.975 0 0)', 'oklch(0.13 0 0)'],
  ['--surface-container', 'surf', 'oklch(0.955 0 0)', 'oklch(0.16 0 0)'],
  ['--surface-container-high', 'surf-high', 'oklch(0.93 0 0)', 'oklch(0.20 0 0)'],
  ['--surface-container-highest', 'surf-highest', 'oklch(0.90 0 0)', 'oklch(0.25 0 0)'],
];

const surfaces = {
  group: 'Foundations',
  name: 'Surfaces',
  subtitle: 'Five-step neutral ladder + on-colours, light and dark',
  path: 'foundations/surfaces.html',
  width: 1240, height: 1036,
  desc: 'Depth is carried by tone, not shadow. Five neutral steps run from the page surface up to the highest container; in light they descend from white, in dark they climb from near-black. Because no step is tinted, an accent placed on any of them reads the same.',
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Container ladder</h2>
      <div class="ds-split">
        ${['light', 'dark'].map((theme, i) => `
        <div class="ds-pane" data-theme="${theme}">
          <div class="ds-pane__tag">${theme}</div>
          <div class="ds-stack" style="gap: 8px;">
            ${LADDER.map(([v, cls, l, d]) => `
            <div class="${cls}" style="border-radius: var(--shape-md); padding: 14px 16px; border: 1px solid var(--outline-variant);">
              <div class="ds-spec" style="color: var(--on-surface);">${v}</div>
              <div class="ds-spec">${i === 0 ? l : d}</div>
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">On-surface + outline</h2>
      <div class="ds-split">
        ${['light', 'dark'].map((theme) => `
        <div class="ds-pane" data-theme="${theme}">
          <div class="ds-pane__tag">${theme}</div>
          <p style="font-size: 16px; color: var(--on-surface); margin-bottom: 6px;">--on-surface &nbsp; primary reading colour</p>
          <p style="font-size: 16px; color: var(--on-surface-variant); margin-bottom: 14px;">--on-surface-variant &nbsp; secondary, captions, kickers</p>
          <div style="height: 1px; background: var(--outline); margin-bottom: 6px;"></div>
          <div class="ds-spec">--outline &nbsp; interactive borders</div>
          <div style="height: 1px; background: var(--outline-variant); margin: 14px 0 6px;"></div>
          <div class="ds-spec">--outline-variant &nbsp; dividers, resting card borders</div>
        </div>`).join('')}
      </div>
      <p class="ds-cap">The page background adds two very wide radial washes at 8% and 6% opacity — the only place colour touches a surface.</p>
    </div>`,
};

/* ---------------------------------------------------------------- motion */
const motion = {
  group: 'Foundations',
  name: 'Motion',
  subtitle: 'Four springs, four durations, one multiplier',
  path: 'foundations/motion.html',
  width: 1240, height: 924,
  desc: 'Two M3 springs are expressed as CSS <code>linear()</code> curves so they genuinely overshoot and settle; the other two are conventional beziers for anything that should not bounce. Every duration is a multiple of <code>--motion</code>, so <code>prefers-reduced-motion</code> collapses the whole system by setting one variable to 0.01.',
  css: `
    .ds-track { position: relative; height: 40px; border-radius: var(--shape-full); background: var(--surface-container-high); overflow: hidden; }
    .ds-ball { position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; background: var(--primary); animation: ds-run 2.6s infinite; }
    @keyframes ds-run { 0%, 8% { transform: translateX(0); } 50%, 58% { transform: translateX(calc(100cqw - 40px)); } 100% { transform: translateX(0); } }
    .ds-ease { container-type: inline-size; }
    @media (prefers-reduced-motion: reduce) { .ds-ball { animation: none; } }`,
  body: `
    <div class="ds-block">
      <h2 class="ds-block__name">Easings</h2>
      <div class="ds-stack" style="gap: 18px;">
        ${[['--spring-fast', 'linear(…) — overshoots to 1.163', 'var(--spring-fast)', 'Button press, chip and tooltip entry, card lift'], ['--spring-standard', 'linear(…) — overshoots to 1.162', 'var(--spring-standard)', 'Stagger entry, scroll reveals'], ['--spring-gentle', 'cubic-bezier(0.2, 0, 0, 1)', 'var(--spring-gentle)', 'Colour and opacity — anything that must not bounce'], ['--spring-emphasized', 'cubic-bezier(0.05, 0.7, 0.1, 1)', 'var(--spring-emphasized)', 'View transitions, page-level morphs']].map(([v, expr, ease, use]) => `
        <div class="ds-ease">
          <div class="ds-spec" style="margin-bottom: 6px;">${v} &nbsp;·&nbsp; ${expr}</div>
          <div class="ds-track"><div class="ds-ball" style="animation-timing-function: ${ease};"></div></div>
          <p class="ds-cap" style="margin-top: 6px; font-size: 11.5px;">${use}</p>
        </div>`).join('')}
      </div>
    </div>

    <div class="ds-block">
      <h2 class="ds-block__name">Durations</h2>
      <div class="ds-row">
        ${[['--dur-short', '180ms', 'Hover, focus, press'], ['--dur-med', '360ms', 'Card lift, theme change'], ['--dur-long', '600ms', 'Entry and reveal'], ['--dur-xl', '900ms', 'Hero choreography']].map(([v, ms, use]) => `
        <div class="card card-outlined" style="flex: 1; min-width: 170px; padding: 16px 18px; border-radius: var(--shape-lg);">
          <div style="font-family: var(--font-display); font-size: 26px; font-weight: 700; letter-spacing: -0.03em;">${ms}</div>
          <div class="ds-spec" style="margin-top: 4px;">${v}</div>
          <p class="ds-cap" style="margin-top: 6px; font-size: 11.5px;">${use}</p>
        </div>`).join('')}
      </div>
      <p class="ds-cap">Each is <code>calc(n * var(--motion))</code>. Under reduced motion <code>--motion</code> drops to 0.01 and all four collapse together — no rule needs restating.</p>
    </div>`,
};

export const foundations = [color, gradient, typography, shape, surfaces, motion];
