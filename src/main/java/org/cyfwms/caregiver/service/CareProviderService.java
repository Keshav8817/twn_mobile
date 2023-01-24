package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareProviderDto;

public interface CareProviderService {
    CareProviderDto save(CareProviderDto cpDto);
    CareProviderDto read(Long id);
    void remove(Long referenceId);
}
