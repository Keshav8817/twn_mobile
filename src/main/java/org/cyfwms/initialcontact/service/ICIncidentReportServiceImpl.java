package org.cyfwms.initialcontact.service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.initialcontact.dto.ICIncidentReportDto;
import org.cyfwms.initialcontact.entity.ICtIncidentReport;
import org.cyfwms.initialcontact.repository.ICIncidentReportRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
@Service
@AllArgsConstructor
@Slf4j
public class ICIncidentReportServiceImpl implements ICIncidentReportService {
    @Autowired
    ICIncidentReportRepository iCIncidentReportRepository;

    @Override
    public ICIncidentReportDto readAllIncidentReports(Long fileDetailsID) {
        log.info("Inside InitialContact ReadAllIncidentReports");
        ICIncidentReportDto iCIncidentReportDto = new ICIncidentReportDto();
        if (fileDetailsID != 0) {

            ICtIncidentReport iCtIncidentReport = iCIncidentReportRepository.findByFileDetailsId(fileDetailsID);
            if (iCtIncidentReport != null) {
                BeanUtils.copyProperties(iCtIncidentReport, iCIncidentReportDto);
//                if (iCIncidentReportDto.getDateOfReport() == null) {
//                    iCIncidentReportDto.setDateOfReport(LocalDate.of(1, 1, 1));
//                }
//                if (iCIncidentReportDto.getIncidentDate() == null) {
//                    iCIncidentReportDto.setIncidentDate(LocalDate.of(1, 1, 1));
//                }
//                if (iCIncidentReportDto.getIncidentTime() == null) {
//                    iCIncidentReportDto.setIncidentTime(LocalTime.of(1, 1, 1));
//                }
            }

        }
        log.info("Exit InitialContact ReadAllIncidentReports");
            return iCIncidentReportDto;


    }

    @Override
    public ICIncidentReportDto saveAllIncidentReports(ICIncidentReportDto iCIncidentReportDto) {
        log.info("Inside InitialContact SaveAllIncidentReports");
        ICtIncidentReport iCtIncidentReport = null;
        if (iCIncidentReportDto.getIncidentReportId() == 0) {
            iCtIncidentReport = new ICtIncidentReport();
            BeanUtils.copyProperties(iCIncidentReportDto, iCtIncidentReport);
        } else {
            iCtIncidentReport = iCIncidentReportRepository.findById(iCIncidentReportDto.getIncidentReportId()).get();
            BeanUtils.copyProperties(iCIncidentReportDto, iCtIncidentReport);
        }
        iCtIncidentReport = iCIncidentReportRepository.save(iCtIncidentReport);
        iCIncidentReportDto.setFileDetailsId(iCtIncidentReport.getFileDetailsId());
        iCIncidentReportDto.setIncidentReportId(iCtIncidentReport.getIncidentReportId());
        log.info("Exit InitialContact SaveAllIncidentReports");
        return iCIncidentReportDto;
    }
}
