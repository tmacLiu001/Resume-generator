import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { ResumeSectionName, ResumeState } from "../../../util/resumeStateHandler";
import Style from "./StanfordResume.module.css";
import EditIcon from "../../../assets/images/edit_icon.png";
import eventBus, { EventName } from "../../../util/eventHandler";

interface ResumeProps {
    resumeData: ResumeState;
}

export function StanfordResume(props: ResumeProps) {
    const {
        resumeData: propsResume,
    } = props;

    const [ resumeData, setResumeData ] = useState(propsResume);

    useEffect(() => {
        setResumeData(propsResume);
    }, [ propsResume ]);

    return <div className={Style.page}>
        <div id="resumePreview" className={`${Style.cvPreviewContainer}`} >
            <SectionWrapper
                activeSection={resumeData.activeSection}
                sectionName={ResumeSectionName.Basics}
                child={(() => <>
                    <div className={Style.userName}>
                        {resumeData.basicInfo.fullName.value || resumeData.basicInfo.fullName.placeholder}
                    </div>
                    <div className={Style.basicInfo}>
                        {resumeData.basicInfo.address.value || resumeData.basicInfo.address.placeholder}{" "}
                        {resumeData.basicInfo.phoneNumber.value || resumeData.basicInfo.phoneNumber.placeholder}{" "}
                        {resumeData.basicInfo.email.value || resumeData.basicInfo.email.placeholder}
                    </div>
                    <div className={Style.horizontalDivider}></div>
                </>)()}
            />

            {/** EDUCATION */}
            <div className={Style.sectionTitle} style={{ marginTop: 22 }}>EDUCATION</div>
            <SectionWrapper
                activeSection={resumeData.activeSection}
                sectionName={ResumeSectionName.Education}
                child={(() => <>
                    <div className={Style.sectionContent}>
                        {resumeData.educationInfo.schoolName.value || resumeData.educationInfo.schoolName.placeholder}
                    </div>
                    <div className={Style.sectionContent}>
                        {resumeData.educationInfo.degree.value || resumeData.educationInfo.degree.placeholder}
                    </div>
                    <div className={Style.sectionContent} style={{ marginTop: 22 }}>
                        {resumeData.educationInfo.otherInfo.value || resumeData.educationInfo.otherInfo.placeholder}
                    </div>
                </>)()}
            />

            {/** WORK AND RESEARCH EXPERIENCE */}
            <div className={Style.sectionTitle} style={{ marginTop: 22 }}>WORK AND RESEARCH EXPERIENCE</div>
            {resumeData.expInfo.map((exp, index) => (
                <div key={exp.organization.placeholder + index}>
                    <SectionWrapper
                        activeSection={resumeData.activeSection}
                        sectionName={`${ResumeSectionName.Experience}-${index}`}
                        child={(() => <>
                            <div className="flex-row space-between">
                                <div className={Style.subtitle}>
                                    {exp.organization.value || exp.organization.placeholder}{", "}
                                    <span>{exp.position.value || exp.position.placeholder}</span>
                                </div>
                                <div className={Style.date}>
                                    {exp.startEndDate.value || exp.startEndDate.placeholder}
                                </div>
                            </div>
                            <CustomDiv contentValue={exp.experience.value || exp.experience.placeholder} />
                            {/* <ul>
                                <li className={Style.sectionContent}>
                                    {exp.experience.value || exp.experience.placeholder}
                                </li>
                            </ul> */}
                        </>)()}
                    />
                </div>
            ))}
            {/* <SectionWrapper
                sectionName={ResumeSectionName.Experience}
                child={(()=><> */}
            {/* {resumeData.expInfo.map((exp, index) => (
                        <div key={exp.organization.placeholder + index}>
                            <div className="flex-row space-between">
                                <div className={Style.subtitle}>
                                    {exp.organization.value || exp.organization.placeholder}{", "}
                                    <span>{exp.position.value || exp.position.placeholder}</span>
                                </div>
                                <div className={Style.date}>
                                    {exp.startEndDate.value || exp.startEndDate.placeholder}
                                </div>
                            </div>
                            <ul>
                                <li className={Style.sectionContent}>
                                    {exp.experience.value || exp.experience.placeholder}
                                </li>
                            </ul>
                        </div>
                    ))} */}
            {/* <div className="flex-row space-between">
                        <div className={Style.subtitle}>Health Policy Intern, <span>The World Bank, DC</span></div>
                        <div className={Style.date}>09/2022 - present</div>
                    </div>
                    <ul>
                        <li className={Style.sectionContent}>Research and write global pharmaceutical policy articles for publication</li>
                        <li className={Style.sectionContent}>Assess challenges of adhering to international standards when conducting clinical trials in developing countries</li>
                    </ul>
                    <div className="flex-row space-between" style={{ marginTop: 22 }}>
                        <div className={Style.subtitle}>Research Assistant, Demography,  <span>Economics and Health of Aging</span></div>
                        <div className={Style.date}>09/2022 - present</div>
                    </div>
                    <ul>
                        <li className={Style.sectionContent}>Research and write global pharmaceutical policy articles for publication</li>
                        <li className={Style.sectionContent}>Assess challenges of adhering to international standards when conducting clinical trials in developing countries</li>
                    </ul>
                    <div className="flex-row space-between" style={{ marginTop: 22 }}>
                        <div className={Style.subtitle}>Research Assistant, Demography,  <span>Economics and Health of Aging</span></div>
                        <div className={Style.date}>09/2022 - present</div>
                    </div>
                    <ul>
                        <li className={Style.sectionContent}>Research and write global pharmaceutical policy articles for publication</li>
                        <li className={Style.sectionContent}>Assess challenges of adhering to international standards when conducting clinical trials in developing countries</li>
                    </ul> */}
            {/* </>)()}
            /> */}

            {/** LEADERSHIP EXPERIENCE */}
            <div className={Style.sectionTitle} style={{ marginTop: 22 }}>LEADERSHIP EXPERIENCE</div>

            {resumeData.leadershipExp.map((exp, index) => (
                <div key={exp.organization.placeholder + index}>
                    <SectionWrapper
                        activeSection={resumeData.activeSection}
                        sectionName={`${ResumeSectionName.LeadershipExp}-${index}`}
                        child={(() => <>
                            <div className="flex-row space-between">
                                <div className={Style.subtitle}>
                                    {exp.organization.value || exp.organization.placeholder}{", "}
                                    <span>{exp.position.value || exp.position.placeholder}</span>
                                </div>
                                <div className={Style.date}>
                                    {exp.startEndDate.value || exp.startEndDate.placeholder}
                                </div>
                            </div>
                            <CustomDiv contentValue={exp.experience.value || exp.experience.placeholder} />
                            {/* <ul>
                                <li className={Style.sectionContent}>
                                    {exp.experience.value || exp.experience.placeholder}
                                </li>
                            </ul> */}
                        </>)()}
                    />
                </div>
            ))}

            {/* <SectionWrapper
                sectionName={ResumeSectionName.LeadershipExp}
                child={(()=><>
                    <div className="flex-row space-between">
                        <div className={Style.subtitle}>Health Policy Intern, <span>The World Bank, DC</span></div>
                        <div className={Style.date}>09/2022 - present</div>
                    </div>
                    <ul>
                        <li className={Style.sectionContent}>Research and write global pharmaceutical policy articles for publication</li>
                        <li className={Style.sectionContent}>Assess challenges of adhering to international standards when conducting clinical trials in developing countries</li>
                    </ul>
                    <div className="flex-row space-between" style={{ marginTop: 22 }}>
                        <div className={Style.subtitle} >Research Assistant, Demography,  <span>Economics and Health of Aging, Stanford, CA</span></div>
                        <div className={Style.date}>09/2022 - present</div>
                    </div>
                    <ul>
                        <li className={Style.sectionContent}>Research and write global pharmaceutical policy articles for publication</li>
                        <li className={Style.sectionContent}>Assess challenges of adhering to international standards when conducting clinical trials in developing countries</li>
                    </ul>
                    <div className="flex-row space-between" style={{ marginTop: 22 }}>
                        <div className={Style.subtitle} >Research Assistant, Demography,  <span>Economics and Health of Aging, Stanford, CA</span></div>
                        <div className={Style.date}>09/2022 - present</div>
                    </div>
                    <ul>
                        <li className={Style.sectionContent}>Research and write global pharmaceutical policy articles for publication</li>
                        <li className={Style.sectionContent}>Assess challenges of adhering to international standards when conducting clinical trials in developing countries</li>
                    </ul>
                </>)()}
            /> */}

            {/** SKILLS AND ADDITIONAL INFORMATION */}
            {resumeData.skillsInfo && (
                <SectionWrapper
                    activeSection={resumeData.activeSection}
                    sectionName={ResumeSectionName.Skills}
                    child={(() => <>
                        <div className={Style.sectionTitle} style={{ marginTop: 22 }}>SKILLS AND ADDITIONAL INFORMATION</div>
                        <CustomDiv contentValue={resumeData.skillsInfo.value || resumeData.skillsInfo.placeholder} />
                        {/* <div className={`${Style.subtitle} flex-row`}>Computer/Technical: <div>R, Java, Microsoft Word, Excel, and PowerPoint, SPSS</div></div>
                  <div className={`${Style.subtitle} flex-row`}>Honors: <div>Levison Fellow 20xx, Stanford leadership and service program through a Jewish lens</div></div>
                  <div className={`${Style.subtitle} flex-row`}>Interests: <div>Technology Education Connecting Cultures (Stanford, 09/20xx - 6/20xx)</div></div> */}
                    </>)()}
                />
            )}
        </div>
    </div>;
}

interface SectionWrapperProps {
    child: JSX.Element;
    sectionName: string,
    activeSection?: string;
}

const SectionWrapper = (props: SectionWrapperProps) => {
    const {
        child,
        sectionName,
        activeSection,
    } = props;
    return (
        <div
            id={sectionName}
            className={`${clsx(Style.sectionWrapper, { [Style.active]: sectionName === activeSection })} position-relative`}
            onClick={() => {
                eventBus.emit(EventName.EditForm, { sectionName });
            }}
        >
            {child}
            <div className={`${Style.editIcon} flex-double-center`}>
                <img alt="" src={EditIcon} />
            </div>
        </div>
    );
};

interface CustomDivProps {
    contentValue: string;
}
const CustomDiv: React.FC<CustomDivProps> = ({ contentValue }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const _div = divRef.current;
        if (_div) {
            if (contentValue) {
                // 先替换文本中的行首的 `- ` 为 `• `
                const lines = contentValue.split("\n");
                const formattedLines = lines.map(line => line.startsWith("- ") ? line.replace("- ", "• ") : line);
                // 然后再把 `\n` 替换为 `<br />`
                let formattedText = formattedLines.join("<br />");
                // 替换 '<div>- ' 为 '<div>• '
                formattedText = formattedText.replace(/<div>- /g, "<div>• ");
                // 替换 '<div>\n- ' 为 '<div>\n• '
                formattedText = formattedText.replace(/<div>\n- /g, "<div>\n• ");

                _div.innerHTML = formattedText;
            }
        }
    }, [ contentValue ]);

    return (
        <div
            ref={divRef}
            className={Style.sectionContent}
        />
    );
};
