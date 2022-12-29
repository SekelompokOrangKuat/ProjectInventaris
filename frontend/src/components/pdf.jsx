import React from "react";
import { Box, Button } from "@mui/material";
import { Page, Document, Image, StyleSheet, Text, View, PDFViewer } from '@react-pdf/renderer';
import { useLocation } from "react-router-dom";

const PDF = (props) => {
    // let { state } = useLocation();
    // if (state.type === null) { return <h1>LOADING</h1> }
    // const type = state.type;
    // const data = state.data;
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <PDFViewer style={{ p: 0, m: 0, border: 0 }} showToolbar={true} width="100%" height="100%">
                <Document>
                    <Page size="legal" orientation="landscape" style=
                        {{
                            display: 'flex',
                            flexDirection: 'column',
                            paddingVertical: 30,
                            paddingHorizontal:20
                        }}>
                        {/* <View style={{ display: 'flex', flexDirection: 'column' }}>
                            {type === "kir" ? <KIR data={data} /> : type === "kib" ?
                                <KIB data={data} /> : type === "mutasi" ?
                                    <Mutasi data={data} /> : type === "bib" ?
                                        <BukuInventarisBarang data={data} /> : type === "bam" ?
                                            <BeritaAcaraMutasi data={data} /> : <LabelPDF data={data} />
                            }
                        </View> */}
                        {props.children}
                    </Page>
                </Document >
            </PDFViewer>
        </Box>
    )
}

export default PDF;