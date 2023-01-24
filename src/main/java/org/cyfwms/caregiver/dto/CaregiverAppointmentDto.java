package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.cyfwms.common.dto.AppointmentDto;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CaregiverAppointmentDto {
    private Long cgappointmentId;
    private Long id;
    private AppointmentDto appointmentDto;



}
