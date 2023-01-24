package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareProviderSearchCriteriaDto;
import org.cyfwms.caregiver.dto.CareProviderSearchResultsDto;
import org.cyfwms.caregiver.repository.CareProviderSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareProviderSearchService {
    @Autowired
    CareProviderSearchRepository careGiverSearchRepository;
    public List<CareProviderSearchResultsDto> searchCareGiver(CareProviderSearchCriteriaDto careGiverSearchCriteriaDto) {
        return careGiverSearchRepository.searchCareGiver(careGiverSearchCriteriaDto);

    }
}
