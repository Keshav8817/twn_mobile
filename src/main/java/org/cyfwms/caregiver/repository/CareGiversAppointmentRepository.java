package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.dto.CaregiverAppointmentDto;
import org.cyfwms.caregiver.entity.CaregiverAppointment;
import org.cyfwms.participant.entity.ParticipantAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareGiversAppointmentRepository extends JpaRepository<CaregiverAppointment, Long> {
    @Query(value = "select * from cg_appointment where appointmentid=? AND status='active'",nativeQuery = true)
    CaregiverAppointment findByAppointmentId(long AppointmentId);

    @Query(value = "select * from cg_appointment where  id=? AND status='active'",nativeQuery = true)
    List<CaregiverAppointment> findByCGId(long participantId);
}
