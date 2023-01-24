package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CaregiverAppointmentDto;

import java.util.List;

public interface CGAppointmentService {


    List<CaregiverAppointmentDto> saveCgAppointment(CaregiverAppointmentDto caregiverAppointmentDto);

    void removeICAppointment(Long cgAppointmentId);


    CaregiverAppointmentDto readOneAppointment(Long cgAppointmentId);
}
