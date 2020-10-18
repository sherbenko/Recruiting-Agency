package com.itechart.agency.controller;

import com.itechart.agency.exception.NotFoundException;
import com.itechart.agency.service.impl.ReportService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }


    @GetMapping("/PDF")
    @ResponseBody
    public void reportPDF(HttpServletResponse response,@RequestParam String start,@RequestParam String end) {
        DateTimeFormatter f = DateTimeFormatter.ofPattern( "yyyy-MM-dd" );
        LocalDate startDate = LocalDate.parse( start , f );
        LocalDate endDate = LocalDate.parse( end , f );
        System.out.println(startDate);
        System.out.println(endDate);

        try {
            buildReport(startDate,endDate);
            response.setContentType("application/x-pdf");
            response.setHeader("Content-Disposition", "inline: filename=product.pdf");
            final OutputStream outputStream = response.getOutputStream();
            JasperExportManager.exportReportToPdfStream(buildReport(startDate,endDate), outputStream);


        } catch (JRException | IOException e) {
            throw new NotFoundException("Sorry, we can't create report.\n Try again later");
        }
    }
    @GetMapping("/PDF/all")
    @ResponseBody
    public void reportPDFAll(HttpServletResponse response) {


        try {
            buildReportForAll();
            response.setContentType("application/x-pdf");
            response.setHeader("Content-Disposition", "inline: filename=product.pdf");
            final OutputStream outputStream = response.getOutputStream();
            JasperExportManager.exportReportToPdfStream(buildReportForAll(), outputStream);


        } catch (JRException | IOException e) {
            throw new NotFoundException("Sorry, we can't create report.\n Try again later");
        }
    }



    @GetMapping("/XLS")
    @ResponseBody
    public void reportXLS(HttpServletResponse response) {

        try {
            buildReportForAll();
            response.setContentType("application/x-xls");
            response.setHeader("Content-Disposition", "filename=product.xls");

            final OutputStream outputStream = response.getOutputStream();
            JRXlsExporter exporterXLS = new JRXlsExporter();
            exporterXLS.setParameter(JRXlsExporterParameter.JASPER_PRINT, buildReportForAll());
            exporterXLS.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, outputStream);
            exporterXLS.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
            exporterXLS.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
            exporterXLS.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
            exporterXLS.exportReport();


        } catch (JRException | IOException e) {
            throw new NotFoundException("Sorry, we can't create report.\n Try again later");
        }

    }
    private JasperPrint buildReport(LocalDate start,LocalDate end) throws JRException {
        InputStream jasperStream = this.getClass().getResourceAsStream("/jasper/agencyPaymentReport.jrxml");
        JasperDesign design = JRXmlLoader.load(jasperStream);
        JasperReport report = JasperCompileManager.compileReport(design);
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(reportService.getAllAgencies(start,end));
        Map<String, Object> param = new HashMap<>();
        param.put("profit", reportService.countProfit(reportService.getAllAgencies(start,end)));
        return JasperFillManager.fillReport(report, param, jrDataSource);
    }
    private JasperPrint buildReportForAll() throws JRException {
        InputStream jasperStream = this.getClass().getResourceAsStream("/jasper/agencyPaymentReport.jrxml");
        JasperDesign design = JRXmlLoader.load(jasperStream);
        JasperReport report = JasperCompileManager.compileReport(design);
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(reportService.getAllAgenciesForReport());
        Map<String, Object> param = new HashMap<>();
        param.put("profit", reportService.countProfit(reportService.getAllAgenciesForReport()));
        return JasperFillManager.fillReport(report, param, jrDataSource);
    }

}
