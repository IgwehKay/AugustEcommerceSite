const AppButton = ({
    text,
    textColor,
    bgColor,
    useBorder,
    handleClick,
    type,
    disabled,
}) => {
    return (
        <button
            type={type ? type : "button"}
            onClick={handleClick}
            style={{
                color: textColor ? textColor : "black",
                backgroundColor: bgColor ? bgColor : "white",
                borderRadius: useBorder ? useBorder : "6px",
                ...style.button,
            }}
            disabled={disabled}
        >
        {text}
        </button>
    );
};

const style = {
    button: {
        // padding: "14px 20px",
        fontSize: "15px",
        fontWeight: 500,
        border: "none",
        padding: "12px",
        // borderRadius: "6px",
        cursor: "pointer",
        transition: "background 0.3s ease"
    },
};


    // margin: "0 20px",
    // width: "80px",
    // padding: "12px",
    // border: "none",
    // borderRadius: "6px",
    // background: "#111",
    // color: "white",
    // fontSize: "15px",
    // cursor: "pointer",
    // transition: "background 0.3s ease"
export default AppButton