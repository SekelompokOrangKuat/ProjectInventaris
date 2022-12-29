import { Text } from "@react-pdf/renderer";
import pdfStyle from "../assets/js/pdf-style";

const PDFTitle = ({ title, sx }) => {
    return (<Text style={[pdfStyle.reportTitle, { marginBottom: 20 }, sx]}>{title}</Text>);

}

export default PDFTitle;