export const DEFAULT_TRANSITION_DURATION = 750

export const LONG_DELAY_DURATION = 500
export const SHORT_DELAY_DURATION = 75
export const WAVE_DELAY_BASE = 35

export const DEFAULT_FLY_POSITION_DIFFERENCE = 50
export const SMALL_FLY_POSITION_DIFFERENCE = 25

export const TOTAL_TEXT_LINES_TRANSITION_IN_DURATION = 300


export const INITIAL_MENU_ITEMS = [
    {
        id: 1,
        name: "About me",
        color: "blue",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p>I'm Itamar Galili, a software developer.</p>",
            "<p>I work for <a href='https://www.codicate.com/' target='_blank' rel='noopener noreferrer'>Codicate</a>. Before that, I worked for <a href='https://www.tsgitsystems.com/' target='_blank' rel='noopener noreferrer'>TSG</a>.</p>",
            "<p>An autodidact programmer, I initially learned to code with <a href='https://ocw.mit.edu/' target='_blank' rel='noopener noreferrer'>MIT OCW</a> and other resources. Since then I continuously learn anything that there is to be learned. It’s most of what I do in my free time.</p>",
            "<p>Well, either that or climbing.</p>",
            "<p>I’m primarily experienced in full stack web development, but I’m prepared to tackle any challenge. Learning new stuff is my main thing.</p>",
        ],
    },
    {
        id: 2,
        name: "Experience",
        color: "purple",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p style='padding-top: 10px; margin-bottom: -7px;'><strong>I used to be a team lead and a product manager.</strong></p>",
            "<p>from 2016 to 2018, I served as an intelligence team lead and then as a software product manager in a classified army unit. It was amazing, but it also made me realize that I enjoy creating more than I do directing.</p>",
            "<p style='padding-top: 10px; margin-bottom: -7px;'><strong>I created automation scripts for ML training data collection.</strong></p>",
            "<p>from 2019 to 2020, I worked at <a href='https://www.tsgitsystems.com/' target='_blank' rel='noopener noreferrer'>TSG</a>, in my debut as a developer. My team and I conceived, designed and built elegant internal solutions for data collection and curation. I loved every minute of it.</p>",
            "<p style='padding-top: 10px; margin-bottom: -7px;'><strong>I developed intricate, multifaceted web and mobile apps.</strong></p>",
            "<p>Since late 2020, I've been working as a full-stack developer at <a>Control</a>, where we take on revolutionizing the construction industry. I take part in the development of a multiplex product - web and mobile, front to back - used by hundreds of users daily.</p>",
        ],
    },
    {
        id: 3,
        name: "Blog",
        color: "red",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p>My personal blog is at <a href='https://pita.tech/' target='_blank' rel='noopener noreferrer'>Pita.tech</a>.</p>",
            "<p>I occasionally update it with guides, opinions and general thoughts.</p>",
            "<p>I mostly write (or at least intend to write) about web development, Arduino stuff, and the intersection of tech and ethics. Privacy in the digital age is one of my main areas of interest.</p>",
        ],
    },
    {
        id: 4,
        name: "Contact",
        color: "yellow",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p>Let's connect!</p>",
            "<p>The best way to contact me is by email, at <a>itamarga@gmail.com</a>. I usually answer within a day.</p>",
            "<p>You can also try to reach me by my <a>Twitter</a> or <a>LinkedIn</a>.</p>",
            "<p>I promise I'll be friendly :)</p>",
        ],
    },
    {
        id: 5,
        name: "LinkedIn",
        isSelectable: false,
    },
    {
        id: 6,
        name: "Twitter",
        isSelectable: false,
    },
    {
        id: 7,
        name: "StackOverflow",
        isSelectable: false,
    },
    {
        id: 8,
        name: "Github",
        isSelectable: false,
    },
]
