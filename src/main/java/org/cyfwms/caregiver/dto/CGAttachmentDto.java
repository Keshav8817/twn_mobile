package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CGAttachmentDto {
    private long cgImageId;
    private byte[] cgImageFile;
    private String name;
    private long id;
    private String type;
    private String cgImageType;
    private  String cgImageName;
}
