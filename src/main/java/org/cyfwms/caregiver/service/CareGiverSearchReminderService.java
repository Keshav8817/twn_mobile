package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiverSearchReminderDto;
import org.cyfwms.caregiver.dto.CareGiverSearchReminderResultDto;
import org.cyfwms.caregiver.repository.CareGiverSearchReminderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareGiverSearchReminderService {
    @Autowired
    private CareGiverSearchReminderRepo careGiverSearchReminderRepo;
    public List<CareGiverSearchReminderResultDto> searchCGReminder(CareGiverSearchReminderDto cgSearchReminderDto) {
        return careGiverSearchReminderRepo.searchCGReminder(cgSearchReminderDto);
    }
}
