package org.cyfwms.caregiver.dto;
import lombok.*;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CareProviderSearchCriteriaDto {
    @Getter @Setter
    private Long referenceId;
    @Getter @Setter
    private String name;
    @Getter @Setter
    private String type;
    @Getter @Setter
    private String priCaregiver;
    @Getter @Setter
    private String secCaregiver;
    @Getter @Setter
    private String status;
}
