export const DEFAULT_TRANSITION_DURATION: number = 750

export const LONG_DELAY_DURATION: number = 500
export const SHORT_DELAY_DURATION: number = 75
export const WAVE_DELAY_BASE: number = 35

export const DEFAULT_FLY_POSITION_DIFFERENCE: number = 50
export const SMALL_FLY_POSITION_DIFFERENCE: number = 25

export const TOTAL_TEXT_LINES_TRANSITION_DURATION: number = 300


interface ItemBase {
    readonly id: number
    readonly name: string
    readonly icon: string
    readonly isSelectable: boolean
}

interface SelectableItem extends ItemBase {
    readonly isSelectable: true
    isSelected: boolean
    isLastSelected: boolean
    readonly color: string
    readonly textLines: string[]
}

interface NonSelectableItem extends ItemBase {
    readonly isSelectable: false
    readonly link: string
}

type Item = SelectableItem | NonSelectableItem


export const INITIAL_MENU_ITEMS: Item[] = [
    {
        id: 1,
        name: "About me",
        icon: "fas fa-info-circle",
        color: "blue",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p>I'm Itamar Galili, a software developer.</p>",
            "<p>I work for <a href='https://www.lightricks.com/' target='_blank' rel='noopener noreferrer'>Lightricks</a>.",
            "<p>An autodidact programmer, I initially learned to code with <a href='https://ocw.mit.edu/' target='_blank' rel='noopener noreferrer'>MIT OCW</a> and other online resources. Ever since then, learning and applying tech-related stuff is most of what I do in my free time.</p>",
            "<p>Well, either that or climbing.</p>",
            "<p>I'm primarily experienced in front-end, back-end and mobile development, but I'm prepared to tackle any challenge. Learning is my main thing.</p>",
        ],
    },
    {
        id: 2,
        name: "Experience",
        icon: "fas fa-code",
        color: "purple",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p style='padding-top: 9px; margin-bottom: -7px;'><strong>I used to be a team lead and a product manager.</strong></p>",
            "<p>from 2014 to 2018, I served as an intelligence analyst turned team lead and then as a software product manager in <a href='https://en.wikipedia.org/wiki/Unit_8200' target='_blank' rel='noopener noreferrer'>unit 8200</a>. It was amazing.</p>",
            "<p style='padding-top: 9px; margin-bottom: -7px;'><strong>I created automation scripts and UI tools for ML training data collection.</strong></p>",
            "<p>from 2019 to 2020, I worked at <a href='https://www.tsgitsystems.com/' target='_blank' rel='noopener noreferrer'>TSG</a>, in my debut as a developer. My team and I initiated, designed and built elegant internal solutions for data collection and curation. I loved every minute of it.</p>",
            "<p style='padding-top: 9px; margin-bottom: -7px;'><strong>I developed intricate, multifaceted web and mobile apps.</strong></p>",
            "<p>Since late 2020, I've been working at <s>Codicate</s> (now part of <a href='https://www.lightricks.com/' target='_blank' rel='noopener noreferrer'>Lightricks</a>), where I take part in the development of a multiplex product - web and mobile, front to back - used by thousands of users daily.</p>",
        ],
    },
    {
        id: 3,
        name: "Blog",
        icon: "fas fa-book",
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
        icon: "fas fa-envelope",
        color: "yellow",
        isSelectable: true,
        isSelected: false,
        isLastSelected: false,
        textLines: [
            "<p>The best way to contact me is by email, at <a href=mailto:itamarga@gmail.com>itamarga@gmail.com</a>. I usually answer within a day.</p>",
            "<p>You can also reach me via <a href='https://www.linkedin.com/in/itamarga/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>.</p>",
            "<p>I promise I'll be friendly :)</p>",
        ],
    },
    {
        id: 5,
        name: "LinkedIn",
        icon: "fab fa-linkedin",
        isSelectable: false,
        link: "https://www.linkedin.com/in/itamarga/",
    },
    {
        id: 7,
        name: "StackOverflow",
        icon: "fab fa-stack-overflow",
        isSelectable: false,
        link: "https://stackoverflow.com/users/14070872/pitamer",
    },
    {
        id: 8,
        name: "Github",
        icon: "fab fa-github",
        isSelectable: false,
        link: "https://github.com/pitamer",
    },
]
