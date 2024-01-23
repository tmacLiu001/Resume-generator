import { useEffect, useState } from "react";
import { StanfordResume } from "../../components/templates/stanfordResume/StanfordResume";
import Style from "./Dashboard.module.css";
import { LeftForm } from "../../components/leftForm/LeftForm";
// eslint-disable-next-line
// @ts-ignore
import html2pdf from "html2pdf.js";
import { useStore } from "../../util/resumeStateHandler";
import IconExport from "./images/icon_export.svg";
import { LocalImageLoader } from "../../components/LocalImageLoader";

export function Dashboard() {
    const _resumeData = useStore.getState();
    const [ resumeData, setResumeData ] = useState(_resumeData);

    useEffect(() => {
        const unsubscribe = useStore.subscribe(state => {
            setResumeData(state);
        });

        return () => {
            unsubscribe(); // Cleanup subscription on component unmount
        };
    }, []); // Empty dependency array means this runs on mount and cleanup on unmount

    return <div className={`${Style.page} flex-row position-relative`}>
        <div className={Style.leftSection}>
            <LeftForm />
        </div>
        <div className={`${Style.mainSection} flex-row`}>
            {/* <TransformWrapper
                centerOnInit
                minScale={0.25}
                initialScale={0.95}
                limitToBounds={false}
                centerZoomedOut={false}
                pinch={{ step: 1 }}
                wheel={{ step: 0.1 }}
            > */}
            {/* {controllerProps => ( */}
            <>
                {/* <TransformComponent wrapperClass={Style.wrapper}> */}
                <StanfordResume resumeData={resumeData} />
                {/* </TransformComponent> */}
            </>
            {/* )} */}
            {/* </TransformWrapper> */}
        </div>
        <div className={`${Style.rightSection} flex-row`}>
            {/* <div>
                <LocalImageLoader
                    width={42}
                    height={42}
                    path={IconEmail}
                />
            </div> */}
            <div
                className="cursor-pointer"
                // style={{ marginLeft: 12 }}
                onClick={() => {
                    const _name = resumeData.basicInfo.fullName.value || resumeData.basicInfo.fullName.placeholder;
                    const element = document.getElementById("resumePreview"); // 替换为你的div的id
                    html2pdf().set({
                        margin: [ 23, 26, 20, 26 ],
                        filename: `${_name}_resume.pdf`, // 设置生成的PDF文件名
                        image: { type: "jpeg", quality: 1.0 },
                        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
                        pagebreak: {
                            mode: [ "css", "avoid-all" ],
                        },
                    }).from(element).save();
                }}
            >
                <LocalImageLoader
                    width={42}
                    height={42}
                    path={IconExport}
                />
            </div>
        </div>
    </div>;
}
