"use strict";

const Typography = require("material-ui/lib/styles/typography");

exports.form = {
    container: {
        marginTop: "1em"
    },
    ListItem: {
        padding: "0px"
    },
    parents: {
        fontSize: "20px",
        lineHeight: "56px",
        paddingLeft: "24px"
    },
    parentsIcon: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "bottom",
        fontSize: "inherit",
        lineHeight: "inherit",
        color: "inherit",
        opacity: 0.4,
        marginRight: "0.4em"
    },
    content: {
        padding: "1em"
    },
    footer: {
        textAlign: "right",
        marginTop: "1em"
    },
    TextField: {
        width: "100%"
    }
};

exports.panel = {
    container: {
        marginTop: "1em"
    },
    List: {
        paddingTop: "0px"
    },
    ListItem: {
        padding: "0px"
    },
    ListDivider: {
        width: "100%"
    },
    context: {
        fontSize: "20px",
        lineHeight: "44px",
        paddingLeft: "24px",
        paddingTop: "5px",
        paddingBottom: "5px"
    }
};

exports.model = {
    image: {
        inline: {
            display: "block",
            maxWidth: "150px",
            maxHeight: "150px",
            marginTop: "0.5em"
        },

        panel: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%"
        }
    }
};

exports.app = {
    menu: {
        marginTop: "1em",
        backgroundColor: "transparent"
    },

    menuItem: {
        paddingLeft: "56px"
    },

    container: {
        padding: "1em 2em"
    }
};

exports.context = {
    ref: {
        marginRight: "1em"
    },

    none: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "bottom",
        fontSize: "inherit",
        lineHeight: "inherit",
        color: "inherit",
        marginRight: "1em"
    },

    icon: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "bottom",
        fontSize: "inherit",
        lineHeight: "inherit",
        color: "inherit",
        opacity: 0.4,
        marginRight: "0.4em"
    }
};

exports.ref = {
    container: {
        display:"inline-block"
    },
    icon: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "bottom",
        fontSize: "inherit",
        lineHeight: "inherit",
        color: "inherit"
    }
};

exports.login = {
    container: {
        margin:"10em auto",
        padding:"3em",
        width: "450px"
    },
    header: {
        fontSize: "22px",
        lineHeight: "36px",
        marginBottom:"1em"
    },
    logo: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "middle",
        float: "left",
        paddingRight: "6px",
        lineHeight: "32px"
    },
    footer: {
        marginTop: "1em",
        textAlign: "right"
    }
};

exports.nav = {
    bar: {
        backgroundColor: "#4285f4"
    },
    logo: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "middle",
        paddingLeft: "12px",
        lineHeight: "46px",
        color: Typography.textFullWhite
    },
    AutoComplete: {
        marginTop: "4px"
    }
};

exports.search = {
    filter: {
        padding: "0px"
    },
    expand: {
        marginLeft: "3em"
    },
    model: {
        inline: {
            fontSize: "16px",
            paddingBottom: "6px"
        },
        context: {
            fontSize: "14px",
            lineHeight:"16px",
            opacity: "0.4"
        }
    },
    toolbar: {
        marginBottom: "1em"
    },
    list: {
        paddingTop: "0px",
        paddingBottom: "0px"
    }
};

exports.tooltip = {
    container: {
        position: "relative",
        display: "inline-block"
    },
    content: {
        boxSizing: "border-box",
        top: "24px" // I do not know how to fix this ???
    }
};

exports.drop = {
    catchall: {

    },
    normal: {
        boxShadow: "none",
        transition: "box-shadow 0.3s ease-in-out 0s"

    },
    active: {
        boxShadow: "inset 0 0 0 6px " + exports.nav.bar.backgroundColor
    },
    reject: {
        boxShadow: "none"
    }
};