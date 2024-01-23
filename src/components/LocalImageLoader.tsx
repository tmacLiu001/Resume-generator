import React from "react";

interface LocalImageLoaderProps {
    width?: number;
    height?: number;
    zIndex?: number;
    path?: string;
    handleClick?: () => void;
    className?: string;
    styleOptions?: React.CSSProperties;
    imgStyle?: React.CSSProperties;
}

export function LocalImageLoader(props: LocalImageLoaderProps) {
    const {
        width = 0,
        height = 0,
        zIndex = 0,
        path = "",
        handleClick = () => { },
        className = "",
        styleOptions = {},
        imgStyle = {},
    } = props;
    return <div
        className="flex-double-center"
        onClick={handleClick}
        style={{
            width: width,
            height: height,
            zIndex: zIndex,
            ...styleOptions,
        }}
    >
        {/* 外层div确保image没出来前预留好空间防止抖动 */}
        <img
            alt=""
            style={{
                width: width,
                height: height,
                ...imgStyle,
            }}
            className={className}
            src={path}
        />
    </div>;
}
