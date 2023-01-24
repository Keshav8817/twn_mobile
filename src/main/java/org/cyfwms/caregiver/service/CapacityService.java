package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.CapacityDto;
public interface CapacityService {
    CapacityDto saveCapacity(CapacityDto careGiverProviderCapacityDto);
    CapacityDto readCapacity(Long cgProviderId);
}
