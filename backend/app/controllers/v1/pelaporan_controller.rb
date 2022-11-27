class V1::PelaporanController < ActionController::Base
    def barang_kiba
        @barang_kiba = Barang::Kiba.find(params[:id])
        respond_to do |format|
            format.html
            format.pdf do
                render pdf: "Invoice No. #{@barang_kiba.id}",
                page_size: 'A5',
                template: "v1/pelaporan/barang_kiba.html.erb",
                layout: "pdf.html",
                orientation: "Landscape",
                lowquality: true,
                zoom: 1,
                dpi: 75
            end
        end
    end
end