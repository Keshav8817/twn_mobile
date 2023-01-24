package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareGiverSearchAppointmentDto {
    @Getter
    @Setter
    private Long id;
    @Getter @Setter
    private String data;
    @Getter@Setter
    private Long cgappointmentId;
}
