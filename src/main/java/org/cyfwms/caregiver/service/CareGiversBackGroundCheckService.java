package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiversBackGroundCheckDto;

public interface CareGiversBackGroundCheckService {
    CareGiversBackGroundCheckDto readCareGiversBackGroundCheck(Long cgProviderId);
    CareGiversBackGroundCheckDto saveCareGiversBackGroundCheck(CareGiversBackGroundCheckDto careGiverTabDto);
}
