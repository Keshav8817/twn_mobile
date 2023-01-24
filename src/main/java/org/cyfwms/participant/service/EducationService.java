package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.EducationDto;

public interface EducationService {
    EducationDto readEducation(Long participantId);

    EducationDto saveEducation(EducationDto educationDto);
}
