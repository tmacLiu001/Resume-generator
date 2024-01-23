import { createStore } from "zustand";

export type BasicInfo = {
    fullName: {
        value: string;
        placeholder: string;
    };
    email: {
        value: string;
        placeholder: string;
    };
    phoneNumber: {
        value: string;
        placeholder: string;
    };
    address: {
        value: string;
        placeholder: string;
    };
}

export type EducationInfo = {
    schoolName: {
        value: string;
        placeholder: string;
    };
    degree: {
        value: string;
        placeholder: string;
    };
    otherInfo: {
        value: string;
        placeholder: string;
    };
}

type ExperienceInfo = {
    organization: {
        value: string;
        placeholder: string;
    };
    position: {
        value: string;
        placeholder: string;
    };
    startEndDate: {
        value: string;
        placeholder: string;
    };
    experience: {
        value: string;
        placeholder: string;
    };
}

// type ResumeSectionData = BasicInfo | EducationInfo | ExperienceInfo[] | string;

export enum ResumeSectionName {
    Basics = "basicInfo",
    Education = "educationInfo",
    Experience = "expInfo",
    LeadershipExp = "leadershipExp",
    Skills = "skillsInfo",
}

export interface ResumeState {
    type: string;
    activeSection: string;
    basicInfo: BasicInfo;
    educationInfo: EducationInfo;
    expInfo: ExperienceInfo[];
    leadershipExp: ExperienceInfo[];
    skillsInfo: {
        value: string;
        placeholder: string;
    } | null;
    // updateResumeSection: (section: ResumeSectionName, data: ResumeSectionData) => void;
}

export const useStore = createStore<ResumeState>(() => ({ // set, get
    type: "",
    activeSection: "",
    basicInfo: {
        fullName: {
            value: "",
            placeholder: "STEPHEN OLSTED",
        },
        email: {
            value: "",
            placeholder: "solsted88@stanford.edu",
        },
        phoneNumber: {
            value: "",
            placeholder: "415-121-3444",
        },
        address: {
            value: "",
            placeholder: "P.O.Box 888888 Stanford, CA 94309",
        },
    },
    educationInfo: {
        schoolName: {
            value: "",
            placeholder: "Stanford University, Stanford, CA | Class of 2018",
        },
        degree: {
            value: "",
            placeholder: "B.A.Candidate in Biology | Minor inMathematics | GPA 3.82/4.00",
        },
        otherInfo: {
            value: "",
            placeholder: "Relevant Coursework: Theory of Probability, Computer Science, Demography, Environmental and Health Policy Analysis, Biomedical Ethics, Modeling Infectious Diseases",
        },
    },
    expInfo: [
        {
            organization: {
                value: "",
                placeholder: "The World Bank, DC",
            },
            position: {
                value: "",
                placeholder: "Health Policy Intern",
            },
            startEndDate: {
                value: "",
                placeholder: "09/2014 - 06/2018",
            },
            experience: {
                value: "",
                placeholder: "- Developed and implemented a new pricing model for Uber's services, resulting in increased revenue and improved customer satisfaction.\n- Worked on the backend infrastructure of the Uber platform, ensuring its stability and scalability to handle millions of requests daily.\n- Utilized Golang programming language to build and optimize various components of Uber's backend systems, enhancing performance and efficiency.",
            },
        },
        {
            organization: {
                value: "",
                placeholder: "The World Bank, DC",
            },
            position: {
                value: "",
                placeholder: "Health Policy Intern",
            },
            startEndDate: {
                value: "",
                placeholder: "09/2014 - 06/2018",
            },
            experience: {
                value: "",
                placeholder: "• Marketed and directed multiple HIV education events, taught in high school outreach, facilitated HIV research seminars with faculty, organized 500+-person campus speaker event with Paul Farmer, and led multiple fundraising events.• Managed organization webpage faceaids.wix.com/Stanford",
            },
        },
    ],
    leadershipExp: [
        {
            organization: {
                value: "",
                placeholder: "The World Bank, DC",
            },
            position: {
                value: "",
                placeholder: "Health Policy Intern",
            },
            startEndDate: {
                value: "",
                placeholder: "09/2014 - 06/2018",
            },
            experience: {
                value: "",
                placeholder: "- Developed and implemented a new pricing model for Uber's services, resulting in increased revenue and improved customer satisfaction.\n- Worked on the backend infrastructure of the Uber platform, ensuring its stability and scalability to handle millions of requests daily.\n- Utilized Golang programming language to build and optimize various components of Uber's backend systems, enhancing performance and efficiency.",
            },
        },
        {
            organization: {
                value: "",
                placeholder: "The World Bank, DC",
            },
            position: {
                value: "",
                placeholder: "Health Policy Intern",
            },
            startEndDate: {
                value: "",
                placeholder: "09/2014 - 06/2018",
            },
            experience: {
                value: "",
                placeholder: "• Marketed and directed multiple HIV education events, taught in high school outreach, facilitated HIV research seminars with faculty, organized 500+-person campus speaker event with Paul Farmer, and led multiple fundraising events.• Managed organization webpage faceaids.wix.com/Stanford",
            },
        },
    ],
    skillsInfo: {
        value: "",
        placeholder: "Computer/Technical: R, Java, Microsoft Word, Excel, and PowerPoint, SPSS\n Honors: Levison Fellow 20xx, Stanford leadership and service program through a Jewish lens\n Interests: Technology Education Connecting Cultures (Stanford, 09/20xx - 6/20xx)",
    },
    // updateResumeSection: (section, data) => set(state => ({ ...state, [section]: data })),
}));
