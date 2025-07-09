import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageReadyController } from "../../context/PageReadyContext";
import useNotifyWhenImagesLoaded from "../../hooks/useNotifyWhenImagesLoaded";
import Container from "../../components/Container";
import Panel from "../../components/Panel";

gsap.registerPlugin(ScrollTrigger);

const Skeletor = () => {
  const { notifyPageReady } = usePageReadyController();
  useNotifyWhenImagesLoaded(notifyPageReady);
  const panelsRef = useRef([]);

  useEffect(() => {
    panelsRef.current.forEach((panel) => {
      if (!panel) return;
      gsap.fromTo(
        panel,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <Container>
      <section>
        <header>
          <h1>Skeletor</h1>
          <p className="subheading">
            A modular front-end system I built and maintained at Full Sail University (2013–2023)
          </p>
        </header>

        {[ // Panel data as tuples: [title, content]
          ["What It Was",
            <>
              <p>Skeletor was a SCSS/JS design system I created to replace a bloated Bootstrap fork inside Full Sail's LMS. Over the next decade, it evolved into the shared foundation for:</p>
              <ul className="ul">
                <li className="li">fullsail.edu</li>
                <li className="li">Alumni site</li>
                <li className="li">Full Sail Labs</li>
                <li className="li">Hall of Fame</li>
                <li className="li">Monarch Initiative</li>
                <li className="li">Full Sail Stories</li>
              </ul>
            </>
          ],
          ["Internal Docs for Non-Devs",
            <>
              <svg width="100%" height="150"><rect width="100%" height="150" fill="#ccc" /></svg>
              <p>Fabricator-powered docs with live markup and examples. Producers used this to build pages on their own.</p>
            </>
          ],
          ["Modular UI Slices",
            <>
              <svg width="100%" height="150"><rect width="100%" height="150" fill="#bbb" /></svg>
              <p>30+ components like CTAs, grids, banners, and media blocks. Built once, reused across every project.</p>
            </>
          ],
          ["Code Philosophy",
            <>
              <ul className="ul">
                <li className="li">BEM class naming</li>
                <li className="li">No <code>!important</code></li>
                <li className="li">Accessible by default</li>
                <li className="li">Responsive mixins and utilities</li>
              </ul>
              <p>Kept it clean, readable, and easy to onboard new team members.</p>
            </>
          ],
          ["Navigation Without Duplication",
            <>
              <svg width="100%" height="150"><rect width="100%" height="150" fill="#aaa" /></svg>
              <p>One menu structure. Transformed into mobile using CSS/JS—not duplicated.</p>
            </>
          ],
          ["System Messaging",
            <>
              <svg width="100%" height="150"><rect width="100%" height="150" fill="#999" /></svg>
              <p>Built a localStorage-based alert system for global messages like hurricanes and COVID updates.</p>
            </>
          ],
          ["Icon Font Management",
            <>
              <svg width="100%" height="150"><rect width="100%" height="150" fill="#888" /></svg>
              <p>Managed the IcoMoon icon font. Cleaned up SVGs and trained designers on prep workflows.</p>
            </>
          ],
          ["Craft Field Structure",
            <>
              <svg width="100%" height="150"><rect width="100%" height="150" fill="#777" /></svg>
              <p>Designed generic matrix fields that made new pages easier to build without rework.</p>
            </>
          ],
          ["Feedback That Stuck",
            <>
              <blockquote>“Your stuff just works.” — Former LMS team lead</blockquote>
              <blockquote>“Made it easier to build pages fast.” — Web producer</blockquote>
              <p>Producers prototyped entire layouts solo. Developers trusted the structure.</p>
            </>
          ],
          ["Tools Used",
            <>
              <ul className="ul">
                <li className="li">SCSS</li>
                <li className="li">Vanilla JS</li>
                <li className="li">Craft CMS</li>
                <li className="li">Fabricator</li>
                <li className="li">IcoMoon</li>
                <li className="li">SiteImprove</li>
              </ul>
            </>
          ],
          ["Lasting Impact",
            <>
              <ul className="ul">
                <li className="li">Used across 10+ Full Sail properties</li>
                <li className="li">Survived team changes and redesigns</li>
                <li className="li">Cut page build time from 2 days to hours</li>
                <li className="li">Enabled 15+ non-devs to build layouts</li>
              </ul>
            </>
          ],
          ["See It In Action",
            <>
              <a
                href="https://www.fullsail.edu"
                className="bfg-button"
                target="_blank"
                rel="noopener noreferrer"
              >Visit fullsail.edu</a>
            </>
          ]
        ].map(([title, content], index) => (
          <Panel
            key={index}
            ref={(el) => (panelsRef.current[index] = el)}
          >
            <h2>{title}</h2>
            {content}
          </Panel>
        ))}
      </section>
    </Container>
  );
};

export default Skeletor;
