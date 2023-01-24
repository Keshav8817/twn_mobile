package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareGiverSearchReminderResultDto {
    @Getter
    @Setter
    private Long reminderId;

    @Getter
    @Setter
    private Long cgProviderId;

    @Getter
    @Setter
    private String assignedTo;

    @Getter
    @Setter
    private String regarding;

    @Getter
    @Setter
    private String subject;
    @Getter
    @Setter
    private String frequency;
    @Getter
    @Setter
    private String status;
    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private LocalDate reminderDate;
    @Getter
    @Setter
    private LocalDate endDate;

    @Getter
    @Setter
    private Long cgReminderId;

    @Getter
    @Setter
    private Long participantId;
    public CareGiverSearchReminderResultDto(Long reminderId, Long cgProviderId, String assignedTo, String regarding, String subject, String frequency, String status, String description, LocalDate reminderDate, LocalDate endDate,Long cgReminderId,Long participantId) {
        this.reminderId = reminderId;
        this.cgProviderId = cgProviderId;
        this.assignedTo = assignedTo;
        this.regarding = regarding;
        this.subject = subject;
        this.frequency = frequency;
        this.status = status;
        this.description = description;
        this.reminderDate = reminderDate;
        this.endDate = endDate;
        this.cgReminderId=cgReminderId;
        this.participantId=participantId;
    }
}
