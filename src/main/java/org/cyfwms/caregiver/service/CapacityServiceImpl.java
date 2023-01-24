package org.cyfwms.caregiver.service;
import javax.persistence.EntityNotFoundException;

import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CapacityDto;
import org.cyfwms.caregiver.entity.Capacity;
import org.cyfwms.caregiver.repository.CapacityRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@Slf4j
public class CapacityServiceImpl implements CapacityService {
    @Autowired
    CapacityRepository cGCapacityRepository;
    @Override
    public CapacityDto saveCapacity(CapacityDto cGCapacityDto) {
        log.info("Inside CareGiver SaveCapacity");
        Capacity cGCapacity = null;
        if (cGCapacityDto.getCgCapacityId() == 0) {
            cGCapacity = new Capacity();
            BeanUtils.copyProperties(cGCapacityDto, cGCapacity);
            cGCapacity.setStatus("ACTIVE");
        } else {
            cGCapacity = cGCapacityRepository.findById(cGCapacityDto.getCgCapacityId()).get();
            BeanUtils.copyProperties(cGCapacityDto, cGCapacity);
        }
        cGCapacity = cGCapacityRepository.save(cGCapacity);
        cGCapacityDto.setCgCapacityId(cGCapacity.getCgCapacityId());
        log.info("Exit CareGiver SaveCapacity");
        return cGCapacityDto;
    }

    @Override
    public CapacityDto readCapacity(Long cgProviderId) {
        log.info("Inside CareGiver ReadCapacity");
      CapacityDto cGCapacityDto = new CapacityDto();
        if (cgProviderId != 0) {
            Capacity CGCapacity = cGCapacityRepository.findByCgProviderId(cgProviderId);
            if (CGCapacity!=null)
            {
                BeanUtils.copyProperties(CGCapacity, cGCapacityDto);
            }
            else{
                throw new EntityNotFoundException();
            }
        }
        else{
            throw new EntityNotFoundException();
        }
        log.info("Exit CareGiver ReadCapacity");
        return cGCapacityDto;
    }
}
