package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiverContactNotesSearchCriteriaDto;
import org.cyfwms.caregiver.dto.CareGiverContactNotesSearchResultsDto;
import org.cyfwms.caregiver.repository.CareGiverContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CareGiverContactNotesSearchService {
    @Autowired
    CareGiverContactNotesSearchRepository careGiverContactNotesSearchRepository;
    public List<CareGiverContactNotesSearchResultsDto> searchContactNotes(CareGiverContactNotesSearchCriteriaDto cgContactNotesSearchCriteriaDto) {
        return careGiverContactNotesSearchRepository.searchCareGiverContactNotes(cgContactNotesSearchCriteriaDto);
    }
}
