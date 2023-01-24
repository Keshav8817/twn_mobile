package org.cyfwms.caregiver.dto;
import lombok.*;
@Builder
@Data
@NoArgsConstructor
public class CareProviderSearchResultsDto {
    @Getter @Setter
    private Long cgProviderId;
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

    public CareProviderSearchResultsDto(Long cgProviderId, Long referenceId, String name, String type, String priCaregiver, String secCaregiver, String status) {
        this.cgProviderId = cgProviderId;
        this.referenceId = referenceId;
        this.name = name;
        this.type = type;
        this.priCaregiver = priCaregiver;
        this.secCaregiver = secCaregiver;
        this.status = status;
    }
}
