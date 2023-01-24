package org.cyfwms.caregiver.dto;
import lombok.*;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CareGiverContactNotesSearchCriteriaDto {
    @Getter
    @Setter
    private Long cgProviderId;

    @Getter @Setter
    private String data;
}
