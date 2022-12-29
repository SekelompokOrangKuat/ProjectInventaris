import React, { Component } from "react";
import { Text, View } from '@react-pdf/renderer';
import PDF from "../../components/pdf";
import pdfStyle from "../../assets/js/pdf-style";
import PDFTitle from "../../components/PDFTitle";
import { getAllKIBB } from "../../services/kibb";
import Loading from "../../components/loading";
import { PDFAuthoritySignature } from "../../components/PDFAuthoritySignature";


class kibbPDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            data: [],
        }
    }

    componentDidMount() {
        getAllKIBB().then((response) => {
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
                    <PDFTitle title="B. Peralatan dan mesin" />
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
                        <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Kode barang</Text></View>
                        <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Jenis Barang/ Nama Barang</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Register</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Merk/ Type</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Ukuran/ CC</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Bahan</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Tahun Pembelian</Text></View>
                        <View style={{ width: '35%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <Text style={{ padding: 3, textAlign: 'center' }}>Nomor</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '15%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Pabrik</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '25%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Rangka</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '25%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Mesin</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '15%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>Polisi</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '20%', borderTop: '1 solid #000000' }]}><Text>BPKB</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Asal Usul Cara Perolehan</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>Harga &#40;Rp&#41;</Text></View>
                        <View style={[{ width: "2%" }, pdfStyle.tableCell]}><Text>Ket</Text></View>
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
                        <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>3</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>4</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>5</Text></View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>6</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>7</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>8</Text></View>
                        <View style={{ width: '35%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                <View style={[pdfStyle.tableCell, { width: '15%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>9</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '25%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>10</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '25%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>11</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '15%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>12</Text></View>
                                <View style={[pdfStyle.tableCell, { width: '20%', borderTop: '1 solid #000000' }]}><Text>13</Text></View>
                            </View>
                        </View>
                        <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>14</Text></View>
                        <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>15</Text></View>
                        <View style={[{ width: "2%" }, pdfStyle.tableCell]}><Text>16</Text></View>
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
                                    maxHeight: 17
                                }}
                            >
                                <View style={[{ width: '3%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{index + 1}</Text></View>
                                <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'left', width: '100%'}}>{data.kode_barang}</Text></View>
                                <View style={[{ width: '10%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'left', width: '100%'}}>{data.nama_barang}</Text></View>
                                <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.nomor_register}</Text></View>
                                <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'left', width: '100%'}}>{data.tipe_barang}</Text></View>
                                <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.ukuran_barang}</Text></View>
                                <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.bahan_barang}</Text></View>
                                <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.tahun_pembelian}</Text></View>
                                <View style={{ width: '35%', display: "flex", flexDirection: 'column', alignItems: 'center', borderRight: '1 solid #000000' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                                        <View style={[pdfStyle.tableCell, { width: '15%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.nomor_pabrik}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '25%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.nomor_rangka}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '25%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text style={{ textAlign: 'left', width: '100%'}}>{data.nomor_mesin}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '15%', borderRight: '1 solid #000000', borderTop: '1 solid #000000' }]}><Text>{data.nomor_polisi}</Text></View>
                                        <View style={[pdfStyle.tableCell, { width: '20%', borderTop: '1 solid #000000' }]}><Text>{data.nomor_bpkb}</Text></View>
                                    </View>
                                </View>
                                <View style={[{ width: '5%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text>{data.asal_usul}</Text></View>
                                <View style={[{ width: '6%', borderRight: '1 solid #000000' }, pdfStyle.tableCell]}><Text style={{ textAlign: 'right', width: '100%'}}>{data.harga_barang}</Text></View>
                                <View style={[{ width: "2%" }, pdfStyle.tableCell]}><Text>{data.keterangan}</Text></View>
                            </View>
                        )
                    }
                    )}
                    <PDFAuthoritySignature />
                </PDF>
        )
    }
}

export default kibbPDF;