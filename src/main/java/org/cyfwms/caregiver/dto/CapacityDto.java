package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CapacityDto {
    @Getter @Setter
    private Long cgCapacityId=0L;

    @Getter @Setter
    private Long maximumCap;

    @Getter @Setter
    private Long currUtil;

    @Getter @Setter
    private String currUtilDetails;

    @Getter @Setter
    private String preferences;

    @Getter @Setter
    private Long cgProviderId;
}
