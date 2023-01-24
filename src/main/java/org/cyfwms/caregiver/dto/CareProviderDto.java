package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareProviderDto {
    private Long Id=0L;
    private Long referenceId;
    private String name;
    private String status;
    private String type;
    private String otherType;
    private String address;
    private String city;
    private String postalCode;
    private String province;
    private String phoneNumber;
    private String email;
    private String primaryCaregiver;
    private String secondaryCaregiver;
    private Long priParticipantId;
    private Long secParticipantId;
}
