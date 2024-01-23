import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Style from "./LeftForm.module.css";
import IconClose from "./images/icon_close.svg";
import IconCopy from "./images/icon_copy.svg";
import IconDelete from "./images/icon_delete.svg";
import { LocalImageLoader } from "../LocalImageLoader";
import {
    useStore,
    ResumeSectionName,
    ResumeState,
} from "../../util/resumeStateHandler";
import eventBus, { EventName } from "../../util/eventHandler";

const BasicList = [
    {
        title: "Full Name",
        key: "fullName",
        data: {},
    },
    {
        title: "Email",
        key: "email",
        data: {},
    },
    {
        title: "Phone Number",
        key: "phoneNumber",
        data: {},
    },
    {
        title: "Address",
        key: "address",
        data: {},
    },
];

const EduList = [
    {
        title: "School Name*",
        key: "schoolName",
        data: {},
    },
    {
        title: "Degree*",
        key: "degree",
        data: {},
    },
    {
        title: "Other Info",
        key: "otherInfo",
        data: {},
    },
];

const ExpList = [
    {
        title: "Organization*",
        key: "organization",
        data: {},
    },
    {
        title: "Position*",
        key: "position",
        data: {},
    },
    {
        title: "Start-End*",
        key: "startEndDate",
        data: {},
    },
    {
        title: "Experience",
        key: "experience",
        data: {},
    },
];

const SkillsList = [
    {
        title: "Skills and additional information",
        key: "skills",
        data: {},
    },
];

const TextareaKeys = [ "degree", "otherInfo", "experience", "skills" ];

type FormListItem = {
    title: string;
    key: string;
    data: {
        value: string;
        placeholder: string;
    };
    // Add other properties as needed
};

type InfoWithIndex = {
    [key: string]: {
        value: string;
        placeholder: string;
    };
};

export function LeftForm() {
    const _resumeData = useStore.getState();

    const [ showModal, setShowModal ] = useState(false);
    const [ modalTop, setModalTop ] = useState(42);
    const [ editSectionName, setEditSectionName ] = useState("");
    const [ expIndex, setExpIndex ] = useState(0);
    const [ formList, setFormList ] = useState<FormListItem[]>([]);
    const [ keywordsValue, setKeywordsValue ] = useState("");
    const [ generatedExp, setGeneratedExp ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const resumeDataRef = useRef(_resumeData);
    const isLoadingRef = useRef(isLoading);

    useEffect(() => {
        eventBus.on(EventName.EditForm, editFormProps => {
            setEditSectionName(editFormProps.sectionName);
            let _list = [];
            if (editFormProps.sectionName === ResumeSectionName.Basics) {
                _list = BasicList.map(item => ({
                    ...item,
                    data: (resumeDataRef.current[editFormProps.sectionName as keyof ResumeState] as InfoWithIndex)[item.key],
                }));
            } else if (editFormProps.sectionName === ResumeSectionName.Education) {
                _list = EduList.map(item => ({
                    ...item,
                    data: (resumeDataRef.current[editFormProps.sectionName as keyof ResumeState] as InfoWithIndex)[item.key],
                }));
            } else if (editFormProps.sectionName.includes(ResumeSectionName.Experience)) {
                const _index = Number(editFormProps.sectionName.split("-")[1]);
                const _data = resumeDataRef.current[ResumeSectionName.Experience][_index];
                _list = ExpList.map(item => ({
                    ...item,
                    data: (_data as InfoWithIndex)[item.key],
                }));
                setExpIndex(_index);
            } else if (editFormProps.sectionName.includes(ResumeSectionName.LeadershipExp)) {
                const _index = Number(editFormProps.sectionName.split("-")[1]);
                const _data = resumeDataRef.current[ResumeSectionName.LeadershipExp][_index];
                _list = ExpList.map(item => ({
                    ...item,
                    data: (_data as InfoWithIndex)[item.key],
                }));
                setExpIndex(_index);
            } else if (editFormProps.sectionName === ResumeSectionName.Skills) {
                _list = SkillsList.map(item => ({
                    ...item,
                    data: (resumeDataRef.current[editFormProps.sectionName as keyof ResumeState] as { value: string; placeholder: string; }),
                }));
            } else {
                return;
            }
            setFormList(_list);
            setShowModal(true);
            let _top = 42;
            if (editFormProps.sectionName === ResumeSectionName.Skills) {
                const _section = document.getElementById(editFormProps.sectionName);
                if (_section) {
                    _top = _section.offsetTop - 200;
                }
            } else {
                _top = window.scrollY + 42;
            }
            setModalTop(_top);
            useStore.setState({
                activeSection: editFormProps.sectionName,
            });

            //
            // 获取元素
            const div1 = document.getElementById("form-modal");
            const div2 = document.getElementById(editFormProps.sectionName);
            if (div1 && div2) {
                // 获取元素的位置
                const rect1 = div1.getBoundingClientRect();
                const rect2 = div2.getBoundingClientRect();
                // 计算折线的点
                const x1 = rect1.right;
                const y1 = rect1.top + rect1.height / 2;

                const x2 = rect2.left;
                const y2 = rect2.top + rect2.height / 2;
                const midX = (x1 + x2) / 2;
                // 计算 SVG 的宽度、高度和偏移量
                const svgWidth = x2 - x1;
                const svgHeight = Math.max(y1, y2) - Math.min(y1, y2);
                const offsetX = x1 + window.scrollX;
                const offsetY = Math.min(y1, y2) + window.scrollY;
                // 创建 SVG 元素
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", svgWidth.toString());
                svg.setAttribute("height", svgHeight.toString());
                svg.setAttribute("style", `position:absolute; left:${offsetX}px; top:${offsetY}px`);
                svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
                // 创建折线
                const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                polyline.setAttribute("points", `${x1 - offsetX},${y1 - offsetY} ${midX - offsetX},${y1 - offsetY} ${midX - offsetX},${y2 - offsetY} ${x2 - offsetX},${y2 - offsetY}`);
                polyline.setAttribute("stroke", "#E9E9E9");
                polyline.setAttribute("stroke-width", "2");
                polyline.setAttribute("fill", "none");
                // 添加折线到 SVG
                svg.appendChild(polyline);
                // 添加 SVG 到 body
                document.body.appendChild(svg);
            }
            //
        });

        const unsubscribe = useStore.subscribe(state => {
            resumeDataRef.current = state;
        });

        return () => {
            eventBus.removeAllListeners(EventName.EditForm);
            unsubscribe(); // Cleanup subscription on component unmount
        };
    }, []);

    useEffect(() => {
        updateLine();
        window.addEventListener("resize", updateLine);

        return () => {
            window.removeEventListener("resize", updateLine);
        };
    }, []);

    const updateLine = () => {
        // const box1 = divRef1.current?.getBoundingClientRect();
        // const box2 = divRef2.current?.getBoundingClientRect();

        // if (lineRef.current && box1 && box2) {
        //     const x1 = box1.right + box1.width / 2; // 获取 div1 的中心点 x 坐标
        //     console.log(1111, "x1 =>>>", x1);
        //     const y1 = box1.top + box1.height / 2; // 获取 div1 的中心点 y 坐标
        //     console.log(1111, "y1 =>>>", y1);
        //     const x2 = box2.left + box2.width / 2; // 获取 div2 的中心点 x 坐标
        //     console.log(1111, "x2 =>>>", x2);
        //     const y2 = box2.top + box2.height / 2; // 获取 div2 的中心点 y 坐标
        //     console.log(1111, "y2 =>>>", y2);

        //     lineRef.current.setAttribute("d", `M${x1} ${y1} H${(x1 + x2) / 2} V${y2} H${x2}`);
        // }
    };

    function handleFieldInput(value: string, item: FormListItem) {
        const _list = formList.map(_item => {
            if (_item.key === item.key) {
                return {
                    ..._item,
                    data: {
                        ..._item.data,
                        value,
                    },
                };
            }
            return _item;
        });
        setFormList(_list);
    }

    function handleGenerateExp() {
        if (isLoadingRef.current) {
            return;
        }
        const _org = formList.find(item => item.key === "organization")?.data.value;
        const _list = keywordsValue.split(",").map(item => item.trim());
        if (_org && _list.length > 0) {
            setIsLoading(true);
            isLoadingRef.current = true;
        }
    }

    function handleDelete() {
        if (editSectionName.includes(ResumeSectionName.Experience)) {
            const _expInfo = JSON.parse(JSON.stringify(resumeDataRef.current[ResumeSectionName.Experience]));
            _expInfo.splice(expIndex, 1);
            useStore.setState({
                expInfo: _expInfo,
            });
        } else if (editSectionName.includes(ResumeSectionName.LeadershipExp)) {
            const _expInfo = JSON.parse(JSON.stringify(resumeDataRef.current[ResumeSectionName.LeadershipExp]));
            _expInfo.splice(expIndex, 1);
            useStore.setState({
                leadershipExp: _expInfo,
            });
        } else if (editSectionName === ResumeSectionName.Skills) {
            useStore.setState({
                skillsInfo: null,
            });
        } else {
            return;
        }
        handleCloseModal();
    }

    function handleDuplicate() {
        const orgItem = formList.find(item => item.key === "organization");
        const positionItem = formList.find(item => item.key === "position");
        const dateItem = formList.find(item => item.key === "startEndDate");
        const expItem = formList.find(item => item.key === "experience");
        const _data = {
            organization: orgItem ? orgItem.data : { value: "", placeholder: "" },
            position: positionItem ? positionItem.data : { value: "", placeholder: "" },
            startEndDate: dateItem ? dateItem.data : { value: "", placeholder: "" },
            experience: expItem ? expItem.data : { value: "", placeholder: "" },
        };
        if (editSectionName.includes(ResumeSectionName.Experience)) {
            const _expInfo = JSON.parse(JSON.stringify(resumeDataRef.current[ResumeSectionName.Experience]));
            _expInfo.splice(expIndex, 0, _data);
            useStore.setState({
                expInfo: _expInfo,
            });
        } else if (editSectionName.includes(ResumeSectionName.LeadershipExp)) {
            const _expInfo = JSON.parse(JSON.stringify(resumeDataRef.current[ResumeSectionName.LeadershipExp]));
            _expInfo.splice(expIndex, 0, _data);
            useStore.setState({
                leadershipExp: _expInfo,
            });
        } else {
            return;
        }
        setExpIndex(expIndex + 1);
        useStore.setState({
            activeSection: `${editSectionName.split("-")[0]}-${expIndex + 1}`,
        });
    }

    function handleClickDone() {
        if (editSectionName === ResumeSectionName.Basics) {
            const fullNameItem = formList.find(item => item.key === "fullName");
            const emailItem = formList.find(item => item.key === "email");
            const phoneNumberItem = formList.find(item => item.key === "phoneNumber");
            const addressItem = formList.find(item => item.key === "address");
            useStore.setState({
                basicInfo: {
                    fullName: fullNameItem ? fullNameItem.data : { value: "", placeholder: "" },
                    email: emailItem ? emailItem.data : { value: "", placeholder: "" },
                    phoneNumber: phoneNumberItem ? phoneNumberItem.data : { value: "", placeholder: "" },
                    address: addressItem ? addressItem.data : { value: "", placeholder: "" },
                },
            });
        } else if (editSectionName === ResumeSectionName.Education) {
            const schoolItem = formList.find(item => item.key === "schoolName");
            const degreeItem = formList.find(item => item.key === "degree");
            const otherInfoItem = formList.find(item => item.key === "otherInfo");
            useStore.setState({
                educationInfo: {
                    schoolName: schoolItem ? schoolItem.data : { value: "", placeholder: "" },
                    degree: degreeItem ? degreeItem.data : { value: "", placeholder: "" },
                    otherInfo: otherInfoItem ? otherInfoItem.data : { value: "", placeholder: "" },
                },
            });
        } else if (editSectionName.includes(ResumeSectionName.Experience) || editSectionName.includes(ResumeSectionName.LeadershipExp)) {
            const orgItem = formList.find(item => item.key === "organization");
            const positionItem = formList.find(item => item.key === "position");
            const dateItem = formList.find(item => item.key === "startEndDate");
            const expItem = formList.find(item => item.key === "experience");
            const _data = {
                organization: orgItem ? orgItem.data : { value: "", placeholder: "" },
                position: positionItem ? positionItem.data : { value: "", placeholder: "" },
                startEndDate: dateItem ? dateItem.data : { value: "", placeholder: "" },
                experience: expItem ? expItem.data : { value: "", placeholder: "" },
            };
            if (editSectionName.includes(ResumeSectionName.Experience)) {
                const _expInfo = JSON.parse(JSON.stringify(resumeDataRef.current[ResumeSectionName.Experience]));
                _expInfo[expIndex] = _data;
                useStore.setState({
                    expInfo: _expInfo,
                });
            } else {
                const _expInfo = JSON.parse(JSON.stringify(resumeDataRef.current[ResumeSectionName.LeadershipExp]));
                _expInfo[expIndex] = _data;
                useStore.setState({
                    leadershipExp: _expInfo,
                });
            }
        } else if (editSectionName === ResumeSectionName.Skills) {
            const skillsItem = formList.find(item => item.key === "skills");
            useStore.setState({
                skillsInfo: skillsItem ? skillsItem.data : { value: "", placeholder: "" },
            });
        } else {
            return;
        }
        handleCloseModal();
    }

    function handleCloseModal() {
        setShowModal(false);
        useStore.setState({
            activeSection: "",
        });
    }

    return (
        <div
            id={"form-modal"}
            className={Style.container}
            style={{
                // display: showModal ? "block" : "none",
                top: modalTop,
            }}
        >
            <div className={Style.modal}>
                <div className={Style.header}>
                    <div
                        className={Style.close}
                        onClick={handleCloseModal}
                    >
                        <LocalImageLoader
                            width={16}
                            height={16}
                            path={IconClose}
                        />
                    </div>
                </div>
                <div className={Style.listWrap}>
                    {formList.map(item => (
                        <div
                            key={item.title + editSectionName}
                            className={Style.listItem}
                        >
                            {!TextareaKeys.includes(item.key) && (
                                <CustomInput
                                    fieldData={item}
                                    handleInput={value => {
                                        handleFieldInput(value, item);
                                    }}
                                />
                            )}
                            {TextareaKeys.includes(item.key) && <>
                                <CustomTextarea
                                    fieldData={item}
                                    handleInput={value => {
                                        handleFieldInput(value, item);
                                    }}
                                />
                                {item.key === "experience" && <>
                                    <div className={Style.gnrLine} />
                                    <div className={Style.gnrModal}>
                                        <div className={Style.gnrTitle}>
                                            {"Generate Experience"}
                                        </div>
                                        <div style={{ marginTop: 42 }}>
                                            <CustomTextarea
                                                isGnr={true}
                                                fieldData={{
                                                    title: "Input Keywords",
                                                    data: {
                                                        value: keywordsValue,
                                                        placeholder: "Research and write policy articles,Assess challenges of adhering",
                                                    },
                                                }}
                                                handleInput={value => {
                                                    setKeywordsValue(value);
                                                }}
                                            />
                                        </div>
                                        <div style={{ marginTop: 42 }}>
                                            <CustomTextarea
                                                isGnr={true}
                                                fieldData={{
                                                    title: "Experience",
                                                    data: {
                                                        value: generatedExp,
                                                        placeholder: "",
                                                    },
                                                }}
                                                handleInput={value => {
                                                    setGeneratedExp(value);
                                                }}
                                            />
                                        </div>
                                        <div
                                            className={`${Style.footerBtn} ${Style.gnrBtn} flex-double-center cursor-pointer`}
                                            onClick={() => {
                                                handleGenerateExp();
                                            }}
                                        >
                                            {isLoading ? <Loading /> : "Generate"}
                                        </div>
                                    </div>
                                </>}
                            </>}
                        </div>
                    ))}
                </div>
                <div className={`${Style.footer} flex-row-center space-between`}>
                    <div className={`${Style.gnrIconWrap} flex-row`}>
                        {(editSectionName.includes(ResumeSectionName.Experience) ||
                            editSectionName.includes(ResumeSectionName.LeadershipExp) ||
                            editSectionName === ResumeSectionName.Skills) && (
                            <div
                                className={`${Style.gnrIcon} flex-double-center cursor-pointer`}
                                style={{ marginRight: 12 }}
                                onClick={() => {
                                    handleDelete();
                                }}
                            >
                                <LocalImageLoader
                                    width={20}
                                    height={21}
                                    path={IconDelete}
                                />
                            </div>
                        )}
                        {(editSectionName.includes(ResumeSectionName.Experience) ||
                            editSectionName.includes(ResumeSectionName.LeadershipExp)) && (
                            <div
                                className={`${Style.gnrIcon} flex-double-center cursor-pointer`}
                                onClick={() => {
                                    handleDuplicate();
                                }}
                            >
                                <LocalImageLoader
                                    width={20}
                                    height={20}
                                    path={IconCopy}
                                />
                            </div>
                        )}
                    </div>
                    <div className={"flex-row-center"}>
                        {!(editSectionName.includes(ResumeSectionName.Experience) ||
                            editSectionName.includes(ResumeSectionName.LeadershipExp)) && (
                            <div
                                className={`${Style.footerBtn} flex-double-center`}
                                style={{ opacity: 0.4, marginRight: 16 }}
                            >
                                {"Generate"}
                            </div>
                        )}
                        <div
                            className={`${Style.footerBtn} flex-double-center cursor-pointer`}
                            onClick={handleClickDone}
                        >
                            {"Done"}
                        </div>
                    </div>
                </div>
                {/* <div>
                    <div className={Style.svg}>
                        <div ref={divRef1} style={{ position: "absolute", top: "10%", left: "10%", width: "80px", height: "80px", backgroundColor: "red" }} />
                        <div ref={divRef2} style={{ position: "absolute", top: "50%", left: "70%", width: "80px", height: "80px", backgroundColor: "blue" }} />
                        <svg style={{ overflow: "visible", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                            <path ref={lineRef} stroke="black" fill="transparent" />
                        </svg>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

interface CustomInputProps {
    fieldData: {
        title: string;
        data: {
            value: string;
            placeholder: string;
        };
    };
    handleInput: (value: string) => void;
}

function CustomInput(props: CustomInputProps) {
    const {
        fieldData,
        handleInput,
    } = props;
    const {
        title,
        data,
    } = fieldData;
    const {
        value,
        placeholder,
    } = data;

    return (
        <div className={Style.CIWrap}>
            <label className={Style.CILabel}>
                {title}
            </label>
            <input
                className={Style.CIInput}
                placeholder={placeholder}
                value={value}
                onInput={event => {
                    const _value = (event.target as HTMLInputElement).value;
                    handleInput(_value);
                }}
            />
        </div>
    );
}

interface CustomTextareaProps {
    isGnr?: boolean;
    textareaHeight?: number;
    initialTextareaData?: string;
    fieldData: {
        title: string;
        data: {
            value: string;
            placeholder: string;
        };
    };
    handleInput?: (html: string) => void;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
    isGnr = false,
    textareaHeight = 100,
    initialTextareaData = "",
    fieldData,
    handleInput = () => { },
}) => {
    const {
        title,
        data,
    } = fieldData;
    const {
        value,
        placeholder,
    } = data;
    const divRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const _div = divRef.current;
        if (_div) {
            _div.innerHTML = initialTextareaData;
        }
    }, [ initialTextareaData ]);

    useEffect(() => {
        const _div = divRef.current;
        if (_div) {
            if (value) {
                _div.innerHTML = processText(value);
            } else if (placeholder) {
                _div.innerHTML = processText(placeholder);
            }
            // moveCursorToEnd(_div);
        }
    }, []);

    useEffect(() => {
        const _div = divRef.current;
        if (_div) {
            if (value) {
                _div.innerHTML = processText(value);
                moveCursorToEnd(_div);
            } else if (placeholder) {
                // _div.innerHTML = processText(placeholder);
            }
        }
    }, [ value ]);

    function processText(text: string) {
        // 先替换文本中的行首的 `- ` 为 `• `
        const lines = text.split("\n");
        const formattedLines = lines.map(line => line.startsWith("- ") ? line.replace("- ", "• ") : line);
        // 然后再把 `\n` 替换为 `<br />`
        let formattedText = formattedLines.join("<br />");
        // 替换 '<div>- ' 为 '<div>• '
        formattedText = formattedText.replace(/<div>- /g, "<div>• ");
        // 替换 '<div>\n- ' 为 '<div>\n• '
        formattedText = formattedText.replace(/<div>\n- /g, "<div>\n• ");
        return formattedText;
    }

    function moveCursorToEnd(el: HTMLElement) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    return (
        <div className={Style.CTWrap}>
            <label className={clsx(Style.CTLabel, { [Style.gnr]: isGnr })}>
                {title}
            </label>
            <textarea
                ref={textareaRef}
                className={Style.CTEl}
                style={{ height: textareaHeight }}
                disabled
            />
            <div
                ref={divRef}
                className={clsx(Style.CTDiv, { [Style.placeholder]: !value })}
                contentEditable={true}
                onInput={event => {
                    const {
                        innerHTML,
                        // clientHeight,
                        // scrollHeight,
                    } = event.target as HTMLDivElement;
                    handleInput(innerHTML);
                    // if (scrollHeight > clientHeight && textareaRef.current) {
                    //     textareaRef.current.style.height = `${scrollHeight + 50}px`;
                    // }
                }}
                onPaste={event => {
                    let data = event.clipboardData.getData("text/html") || event.clipboardData.getData("text/plain");
                    const regex = /background-color/g;
                    data = data.replace(regex, "backgroundcolor");
                    document.execCommand("insertHTML", false, data);
                    event.preventDefault();
                }}
                onFocus={event => {
                    if (!value) {
                        (event.target as HTMLDivElement).innerHTML = "";
                    }
                }}
            // onClick={event => {
            //     if (!value) {
            //         (event.target as HTMLDivElement).innerHTML = "";
            //     }
            // }}
            >
            </div>
        </div>
    );
};

const Loading = () => (
    <div className={Style.loader}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
