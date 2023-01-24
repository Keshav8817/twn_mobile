package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.cyfwms.common.dto.ReminderDto;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CareGiverReminderDto {

    @Getter
    @Setter
    private Long cgReminderId;


    @Getter
    @Setter
    private ReminderDto reminderDto;

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private Long referenceId;


}
