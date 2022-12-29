import { StyleSheet } from "@react-pdf/renderer";

const pdfStyle = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    reportTitle: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 8,
        fontWeight: '700',
        textTransform: "uppercase"
    },
    tableHead: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        fontSize: 8,
        border: '1 solid #000000'
    },
    tableCell: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 3
    }
});

export default pdfStyle;