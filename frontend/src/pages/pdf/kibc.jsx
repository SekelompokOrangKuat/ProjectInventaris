import React, { Component } from "react";
import { Text, View } from '@react-pdf/renderer';
import PDF from "../../components/pdf";
import pdfStyle from "../../assets/js/pdf-style";
import PDFTitle from "../../components/PDFTitle";
import { getAllKIBC } from "../../services/kibc";
import Loading from "../../components/loading";
import { PDFAuthoritySignature } from "../../components/PDFAuthoritySignature";


class kibcPDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            data: [],
        }
    }

    componentDidMount() {
        getAllKIBC().then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({ isFetching: false, data: data.data });
                })
            }
        });
    }

    render() {
        return (
            this.state.isFetching ?
                <div style={{ height: '100vh' }}><Loading /></div> :
                <PDF>
                    <PDFTitle title="Kartu Inventarsi Barang &#40;KIB&#41;" sx={{ marginBottom: 10 }} />
                    <PDFTitle title="C. gedung dan bangunan" />
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
                        <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Jenis Barang/ Nama Barang</Text></View>
                        <View style={{ width: '13%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <Text style={{ padding: 3, textAlign: 'center' }}>Nomor</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '60%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Kode Barang</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '40%', borderTop: '1 solid #000000' }]}><Text>Register</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Kondisi bangunan &#40;B, KB, RB&#41;</Text></View>
                        <View style={{ width: '11%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <Text style={{ padding: 3, textAlign: 'center' }}>Konstruksi Bangunan</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '55%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Bertingkat/tidak</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '45%', borderTop: '1 solid #000000' }]}><Text>Beton/tidak</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '4%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Luas Lantai &#40;M2&#41;</Text></View>
                        <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Letak/Lokasi Alamat</Text></View>
                        <View style={{ width: '16%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <Text style={{ padding: 3, textAlign: 'center' }}>Dokumen Gedung</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '45%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Tanggal</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '55%', borderTop: '1 solid #000000' }]}><Text>Nomor</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '4%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Luas &#40;M2&#41;</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Status Tanah</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Nomor Kode Tanah</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Asal Usul</Text></View>
                        <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Harga &#40;Rp&#41;</Text></View>
                        <View style={[{ width: '4%' }, pdfStyle.tableCell]}><Text>Ket</Text></View>
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
                        <View style={{ width: '13%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '60%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>3</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '40%', borderTop: '1 solid #000000' }]}><Text>4</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>5</Text></View>
                        <View style={{ width: '11%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '55%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>6</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '45%', borderTop: '1 solid #000000' }]}><Text>7</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '4%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>8</Text></View>
                        <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>9</Text></View>
                        <View style={{ width: '16%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '45%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>10</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '55%', borderTop: '1 solid #000000' }]}><Text>11</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '4%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>12</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>13</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>14</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>15</Text></View>
                        <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>16</Text></View>
                        <View style={[{ width: '4%' }, pdfStyle.tableCell]}><Text>17</Text></View>
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
                                    maxHeight: 30
                                }}
                            >
                                <View style={[{ width: '3%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{index + 1}</Text></View>
                                <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ width: '100%', textAlign: 'left' }}>{data.nama_barang}</Text></View>
                                <View style={{ width: '13%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                        <View style={[pdfStyle.tableCell, { width: '60%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text style={{ width: '100%', textAlign: 'left' }}>{data.kode_barang}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '40%', borderTop: '1 solid #000000' }]}><Text>{data.nomor_register}</Text></View>
                                    </View>
                                </View>
                                <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.kondisi_bangunan}</Text></View>
                                <View style={{ width: '11%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                        <View style={[pdfStyle.tableCell, { width: '55%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.tingkat_bangunan}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '45%', borderTop: '1 solid #000000' }]}><Text>{data.beton_bangunan}</Text></View>
                                    </View>
                                </View>
                                <View style={[{ width: '4%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.luas_lantai}</Text></View>
                                <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.alamat}</Text></View>
                                <View style={{ width: '16%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                        <View style={[pdfStyle.tableCell, { width: '45%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.tanggal_dokumen}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '55%', borderTop: '1 solid #000000' }]}><Text style={{ width: '100%', textAlign: 'left' }}>{data.nomor_dokumen}</Text></View>
                                    </View>
                                </View>
                                <View style={[{ width: '4%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.luas}</Text></View>
                                <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.status}</Text></View>
                                <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.nomor_tanah}</Text></View>
                                <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.asal_usul}</Text></View>
                                <View style={[{ width: '7%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ width: '100%', textAlign: 'right' }}>{data.harga}</Text></View>
                                <View style={[{ width: '4%' }, pdfStyle.tableCell]}><Text>{data.keterangan}</Text></View>
                            </View>
                        )
                    }
                    )}
                    <PDFAuthoritySignature />
                </PDF>
        )
    }
}

export default kibcPDF;