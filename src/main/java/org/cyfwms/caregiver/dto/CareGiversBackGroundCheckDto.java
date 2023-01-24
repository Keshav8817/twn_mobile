package org.cyfwms.caregiver.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.time.LocalDate;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CareGiversBackGroundCheckDto {
    @Getter
    @Setter
    private Long cgBackGroundCheckId;

    @Getter @Setter
    private String priBGCheckStatus;
    @Getter @Setter
    private LocalDate priDate;
    @Getter @Setter
    private String priDetails;
    @Getter @Setter
    private String priTrainingCompleted;
    @Getter @Setter
    private String secBGCheckStatus;
    @Getter @Setter
    private LocalDate secDate;
    @Getter @Setter
    private String secDetails;
    @Getter @Setter
    private String secTrainingCompleted;
    @Getter @Setter
    private Long cgProviderId;
}
