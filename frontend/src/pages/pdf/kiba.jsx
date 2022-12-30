import React, { Component } from "react";
import { Text, View } from '@react-pdf/renderer';
import PDF from "../../components/pdf";
import pdfStyle from "../../assets/js/pdf-style";
import PDFTitle from "../../components/PDFTitle";
import { getAllKIBA } from "../../services/kiba";
import Loading from "../../components/loading";
import { PDFAuthoritySignature } from "../../components/PDFAuthoritySignature";


class kibaPDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            data: [],
            ok: false
        }
    }

    componentDidMount() {
        getAllKIBA().then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({ isFetching: false, data: data.data, ok: true });
                })
            }
            else if (response.status === 401) {
                this.setState({ isFetching: false, ok: false });
            }
        });
    }

    render() {
        return (
            this.state.isFetching ?
                <div style={{ height: '100vh' }}><Loading /></div> :
                this.state.ok ?
                    <PDF>
                        <PDFTitle title="Kartu Inventarsi Barang (KIB)" sx={{ marginBottom: 10 }} />
                        <PDFTitle title="A. TANAH" />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', flexDirection: 'column', marginRight: 12 }}>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>NO.KODE LOKASI</Text>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>PROVINSI</Text>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>UNIT</Text>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>SATUAN KERJA</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>: 11.01.32.05.000001.00020.2022</Text>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>: JAWA BARAT</Text>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>: DINAS PENDIDIKAN</Text>
                                    <Text style={[pdfStyle.description, { marginBottom: 3 }]}>: SEKRETARIAT</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[pdfStyle.tableHead, { maxHeight: 50 }]}>
                            <View style={[{ width: '3%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>No</Text></View>
                            <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Jenis barang/ Nama barang</Text></View>
                            <View style={{ width: '15%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                <Text style={{ padding: 3, textAlign: 'center' }}>Nomor</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                    <View style={[pdfStyle.tableCell, { width: '65%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Kode Barang</Text></View>
                                    <View style={[pdfStyle.tableCell, { width: '35%', borderTop: '1 solid #000000' }]}><Text>Register</Text></View>
                                </View>
                            </View>
                            <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Luas &#40;M2&#41;</Text></View>
                            <View style={[{ width: '12%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Tahun Pengadaan</Text></View>
                            <View style={[{ width: '12%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Letak/Alamat</Text></View>
                            <View style={{ width: '15%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                <Text style={{ padding: 3, textAlign: 'center' }}>Status Tanah</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                    <View style={[pdfStyle.tableCell, { width: '30%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Hak</Text></View>
                                    <View style={{ width: '70%', display: "flex", flexDirection: 'column', alignItems: 'center', borderTop: '1 solid #000000' }}>
                                        <Text style={{ padding: 3, textAlign: 'center' }}>Sertifikat</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                            <View style={[pdfStyle.tableCell, { width: '55%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Tanggal</Text></View>
                                            <View style={[pdfStyle.tableCell, { width: '45%', borderTop: '1 solid #000000' }]}><Text>Nomor</Text></View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Penggunaan</Text></View>
                            <View style={[{ width: '8%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Asal Usul</Text></View>
                            <View style={[{ width: '9%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Harga &#40;Ribuan Rp&#41;</Text></View>
                            <View style={[{ width: "7%" }, pdfStyle.tableCell]}><Text>Keterangan</Text></View>
                        </View >
                        <View
                            style={{
                                marginTop: -1,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: 8,
                                borderRight: '1 solid #000000',
                                borderLeft: '1 solid #000000',
                                borderBottom: '1 solid #000000',
                                maxHeight: 20,
                            }}
                        >
                            <View style={[{ width: '3%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>1</Text></View>
                            <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>2</Text></View>
                            <View style={{ width: '15%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                    <View style={[pdfStyle.tableCell, { width: '65%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>3</Text></View>
                                    <View style={[pdfStyle.tableCell, { width: '35%', borderTop: '1 solid #000000' }]}><Text>4</Text></View>
                                </View>
                            </View>
                            <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>5</Text></View>
                            <View style={[{ width: '12%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>6</Text></View>
                            <View style={[{ width: '12%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>7</Text></View>
                            <View style={{ width: '15%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                    <View style={[pdfStyle.tableCell, { width: '30%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>8</Text></View>
                                    <View style={{ width: '70%', display: "flex", flexDirection: 'column', alignItems: 'center', borderTop: '1 solid #000000' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                            <View style={[pdfStyle.tableCell, { width: '55%', borderRight: '1 solid #000000' }]}><Text>9</Text></View>
                                            <View style={[pdfStyle.tableCell, { width: '45%' }]}><Text>10</Text></View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>11</Text></View>
                            <View style={[{ width: '8%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>12</Text></View>
                            <View style={[{ width: '9%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>13</Text></View>
                            <View style={[{ width: "7%" }, pdfStyle.tableCell]}><Text>14</Text></View>
                        </View >
                        {this.state.data.map((data, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        marginTop: -1,
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        fontSize: 8,
                                        borderRight: '1 solid #000000',
                                        borderLeft: '1 solid #000000',
                                        borderBottom: '1 solid #000000',
                                        maxHeight: 50
                                    }}
                                >
                                    <View style={[{ width: '3%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{index + 1}</Text></View>
                                    <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'left', width: '100%' }}>{data.nama_barang}</Text></View>
                                    <View style={{ width: '15%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                            <View style={[pdfStyle.tableCell, { width: '65%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.kode_barang}</Text></View>
                                            <View style={[pdfStyle.tableCell, { width: '35%', borderTop: '1 solid #000000' }]}><Text>{data.nomor_register}</Text></View>
                                        </View>
                                    </View>
                                    <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'right', width: '100%' }}>{data.luas}</Text></View>
                                    <View style={[{ width: '12%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.tahun_pengadaan}</Text></View>
                                    <View style={[{ width: '12%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'left', width: '100%' }}>{data.alamat}</Text></View>
                                    <View style={{ width: '15%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                            <View style={[pdfStyle.tableCell, { width: '30%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.status_tanah}</Text></View>
                                            <View style={{ width: '70%', display: "flex", flexDirection: 'column', alignItems: 'center', borderTop: '1 solid #000000' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                                    <View style={[pdfStyle.tableCell, { width: '55%', borderRight: '1 solid #000000' }]}><Text>{data.tanggal_sertifikat}</Text></View>
                                                    <View style={[pdfStyle.tableCell, { width: '45%' }]}><Text>{data.nomor_sertifikat}</Text></View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.penggunaan}</Text></View>
                                    <View style={[{ width: '8%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.asal_usul}</Text></View>
                                    <View style={[{ width: '9%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'right', width: '100%' }}>{data.nilai_perolehan}</Text></View>
                                    <View style={[{ width: "7%" }, pdfStyle.tableCell]}><Text>{data.keterangan}</Text></View>
                                </View>
                            )
                        }
                        )}
                        <PDFAuthoritySignature />
                    </PDF> :
                    <div>Error occured while opening pdf</div>
        )
    }
}

export default kibaPDF;