package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.cyfwms.caregiver.entity.CGAttachmentEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CGAttachmentService {
    CGAttachmentDto saveCGAttachment(MultipartFile file, String  cgAttachmentDto) throws IOException;
    CGAttachmentDto getOneFile(Long id);
    void removeCGImage(Long cgImageId);
    List<CGAttachmentDto> getAllFiles(Long caregiverProviderId);

    CGAttachmentEntity downloadOne(Long cgImageId);
}
