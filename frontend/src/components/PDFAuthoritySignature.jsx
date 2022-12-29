import React from "react";
import { Text, View } from '@react-pdf/renderer';


const PDFAuthoritySignature = () => {
    return (
        <View style={{ paddingHorizontal: 48, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:10}}>
            <View wrap={false} style={{ fontSize: 8, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text>Mengetahui,</Text>
                <Text>Kepala Dinas Pendidikan</Text>
                <Text style={{ marginBottom: 50 }}>Provinsi Jawa Barat</Text>
                <Text>H. Dede Supandi, S.STP., M.si</Text>
                <Text>NIP. 197103132009011001</Text>
            </View>
            <View wrap={false} style={{ fontSize: 8, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ marginBottom: 20 }}>Bandung,   Desember 2022</Text>
                <Text style={{ marginBottom: 50 }}>Pengurus Barang</Text>
                <Text>Jajang Munawar, S.ST.</Text>
                <Text>NIP. 198409072002121001</Text>
            </View>
        </View >
    );
}

export { PDFAuthoritySignature }